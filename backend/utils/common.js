const crypto = require("crypto");

const checkKeys = (object, keys) => {
  try {
    for (const key in keys) {
      if (!(key in object)) return key;
    }
    return null;
  } catch (e) {
    console.log("checking keys in object failed with : ", e);
  }
};

const createHash = (data) => {
  return crypto.createHash("sha512").update(data).digest("base64");
};

module.exports = { checkKeys, createHash };
