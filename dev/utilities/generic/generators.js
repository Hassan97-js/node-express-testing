function generateUniqueId(idLength) {
  let generatedId = "";

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let index = 0; index < idLength; index++) {
    generatedId += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return generatedId;
}

module.exports = { generateUniqueId };
