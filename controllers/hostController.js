const Home = require("../models/home");

exports.getHostHomes = (req, res) => {
  Home.fetchAll((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      title: "Host Homes List",
      currentPage: "host-homes",
    });
  });
};

exports.getAddHome = (req, res) => {
  res.render("host/add-home", {
    title: "Add Home - Airbnb",
    currentPage: "add-home",
  });
};

exports.postAddHome = (req, res) => {
  const { houseName, price, location, rating, photo } = req.body;
  const homes = new Home(houseName, price, location, rating, photo);
  homes.save();
  res.render("host/home-added", {
    title: "Home Added - Airbnb",
    currentPage: "home-added",
  });
};
