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

exports.getEditHome = (req, res) => {
  const homeId = req.params.id;
  const editing = req.query.editing === "true";

  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      title: "Edit Home - Airbnb",
      currentPage: "host-homes",
      editing: editing,
    });
  });
};

exports.postAddHome = (req, res) => {
  const { houseName, price, location, rating, photo } = req.body;
  const homes = new Home(houseName, price, location, rating, photo);
  homes.save();
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res) => {
  const { id, houseName, price, location, rating, photo } = req.body;
  const home = new Home(houseName, price, location, rating, photo);
  home.id = id;
  console.log(home);
  home.save();
  console.log(home);

  res.redirect("/host/host-home-list");
};
