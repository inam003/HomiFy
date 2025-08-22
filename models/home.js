const fs = require("fs");
const path = require("path");
const rootPath = require("../utils/path");

const filePath = path.join(rootPath, "data", "homes.json");

module.exports = class Home {
  constructor(houseName, price, location, rating, photo) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photo = photo;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      if (this.id) {
        registeredHomes = registeredHomes.map((home) =>
          home.id.toString() === this.id.toString() ? this : home
        );
      } else {
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }

      fs.writeFile(filePath, JSON.stringify(registeredHomes), (err) => {
        if (err) {
          console.error("Error writing file:", err);
        }
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (error, data) => {
      callback(!error ? JSON.parse(data) : []);
    });
  }

  static findById(id, callback) {
    this.fetchAll((homes) => {
      const home = homes.find((home) => home.id == id);
      callback(home);
    });
  }
};
