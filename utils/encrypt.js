/*eslint-env node*/
const crypto = require("crypto");
const config = require("config");
const bcrypt = require("bcryptjs");
const passwordHash = require("password-hash");
const saltRounds = 5;
let algorithm = "aes256";
let key;
let privatekey;

function loadKey() {
  if (!privatekey) {
    privatekey = config.privatekey;
  }
  if (!key) {
    key = crypto.createHash("sha256").update(privatekey).digest("hex");
  }
}

function encrypt(plainString) {
  loadKey();
  const iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv
  );
  let encodedCipher =
    cipher.update(plainString, "utf8", "hex") + cipher.final("hex");
  return `v1${iv.toString("hex")}${encodedCipher}`;
}

function decrypt(encryptedString) {
  loadKey();
  if (encryptedString) {
    if (encryptedString.substring(0, 2) === "v1") {
      let iv = encryptedString.substring(2, 34);
      let encryptedValue = encryptedString.substring(34);
      let cipher = crypto.createDecipheriv(
        "aes-256-cbc",
        Buffer.from(key, "hex"),
        Buffer.from(iv, "hex")
      );
      return (
        cipher.update(encryptedValue, "hex", "utf8") + cipher.final("utf8")
      );
    } else {
      loadKey();
      let decipher = crypto.createDecipher(algorithm, privatekey);
      let decodedCipher =
        decipher.update(encryptedString, "hex", "utf8") +
        decipher.final("utf8");
      return decodedCipher;
    }
  } else {
    return;
  }
}

function computeHash(text) {
  let hash = crypto.createHash("md5").update(text).digest("hex");
  return hash;
}

function getHashedPassword(password) {
  return new Promise(function (resolve, reject) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, function (error, hash) {
        if (error) {
          reject(error);
        }
        resolve(hash);
      });
    });
  });
}

async function compare(password, hashedpassword) {
  if (hashedpassword.substring(0, 5) === "sha1$") {
    return passwordHash.verify(password, hashedpassword);
  } else {
    let result = await bcrypt.compare(password, hashedpassword);
    return result;
  }
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.computeHash = computeHash;
exports.getHashedPassword = getHashedPassword;
exports.compare = compare;
