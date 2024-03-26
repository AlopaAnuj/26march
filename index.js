const express = require('express');
const app = express();
const port = 4000;
const path = require("path");

let http = require("http");
let server = http.createServer(app);


app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "./my-app/build");
app.use(express.static(buildPath))


app.get("/", function(req, res){
  res.sendFile(
      path.join(__dirname, "./my-app/build/index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );

})

server.listen(4001, function (err) {
   console.log(`Example app listening at http://localhost:${4001}`);

  if (err) {
    logger.error(err);
    throw err;
  }
  });
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

