function checkKeys(object, keys) {
  try {
    for (const key in keys) {
      if (!(key in object)) return key;
    }
    return null;
  } catch (e) {
    console.log("checking keys in object failed with : ", e);
  }
}

module.exports = { checkKeys };
