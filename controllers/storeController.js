const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      title: "Index - Airbnb",
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res) => {
  Home.fetchAll((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      title: "Homes List",
      currentPage: "homes",
    });
  });
};

exports.getHomeDetails = (req, res) => {
  const id = req.params.id;
  Home.findById(id, (home) => {
    if (!home) {
      res.redirect("/homes");
      console.log("Home not found");
      return;
    } else {
      res.render("store/home-detail", {
        home: home,
        title: "Home Details",
        currentPage: "home-detail",
      });
    }
  });
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", {
    title: "Bookings - Airbnb",
    currentPage: "bookings",
  });
};

exports.getFavouritesList = (req, res) => {
  Favourite.getFavourites((favourites) => {
    Home.fetchAll((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home.id.toString())
      );
      console.log(favouriteHomes);

      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        title: "Favourites - Airbnb",
        currentPage: "favourites",
      });
    });
  });
};

exports.postAddToFavourites = (req, res) => {
  const id = req.body.id;
  Favourite.addToFavourite(id, (err) => {
    if (err) {
      console.error("Error adding to favourites:", err);
    }
    res.redirect("/favourites");
  });
};
