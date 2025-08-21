const fs = require("fs");
const path = require("path");
const rootPath = require("../utils/path");

const filePath = path.join(rootPath, "data", "favourite.json");

module.exports = class Favourite {
  static addToFavourite(id, callback) {
    Favourite.getFavourites((favourites) => {
      if (favourites.includes(id)) {
        callback("Already in favourites");
      } else {
        favourites.push(id);
        fs.writeFile(filePath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(filePath, (error, data) => {
      callback(!error ? JSON.parse(data) : []);
    });
  }
};
