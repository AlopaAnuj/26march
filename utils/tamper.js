let config = require("config");
module.exports = function (accept) {
  return function (req, res, next) {
    let headersSet = false;
    let reason = null;
    let tamper = false;
    let buffers = [];

    function mustCapture() {
      if (!headersSet) res.writeHead(res.statusCode);
      return !!tamper;
    }

    const original = patch(res, {
      writeHead(statusCode, reasonPhrase, headers) {
        if (typeof reasonPhrase == "object") {
          headers = reasonPhrase;
          reasonPhrase = undefined;
        }

        this.statusCode = statusCode;
        reason = reasonPhrase;

        for (let name in headers) {
          if (headers.hasOwnProperty(name)) {
            this.setHeader(name, headers[name]);
          }
        }
        headersSet = true;

        this.writeHead = original.writeHead;
        tamper = accept(req, this);
        if (!tamper) {
          // Bypassed. Un-patch response and continue as usual ...
          this.write = original.write;
          this.end = original.end;
          this.writeHead(statusCode, reason);
        }
      },

      write(chunk) {
        if (mustCapture()) {
          if (chunk) buffers.push(Buffer.from(chunk));
        } else this.write(chunk);
      },

      end(chunk) {
        if (mustCapture()) {
          if (chunk) buffers.push(Buffer.from(chunk));
          const body = Buffer.concat(buffers).toString();
          const tampered = tamper(
            body || "",
            this.statusCode,
            req,
            this.headers
          );
          Promise.resolve(tampered)
            .then((body) => {
              this.write = original.write;
              this.end = original.end;
              this.setHeader("Content-Length", Buffer.byteLength(body));
              this.writeHead(this.statusCode, reason);
              this.end(body);
            })
            .catch((error) => {
              this.write = original.write;
              this.end = original.end;
              this.status(500).send(
                config.verboseError
                  ? error.message
                  : "Something went wrong, please try again later"
              );
            });
        } else {
          this.end(chunk);
        }
      },
    });
    next();
  };
};

// Overwrites properties of the given object and returns the old values
function patch(obj, properties) {
  let old = {};
  for (let name in properties) {
    old[name] = obj[name];
    obj[name] = properties[name];
  }
  return old;
}
