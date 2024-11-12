import express from "express";

const router = express.Router();
import mongoose from "mongoose";

import User from "../models/User.model.js";
import YourRecipe from "../models/YourRecipe.model.js";
import Recipe from "../models/Recipe.model.js";
import isAuthenticated from "../middleware/jwt.middleware.js";
const yourRecipesRouter = express.Router({ mergeParams: true });

router.get("/:id", (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each Project document has `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  User.findById(id)
    //.populate("tasks")
    .then((user) => res.status(200).json(user))
    .catch((error) => res.json(error));
});

router.use("/:userid/items", yourRecipesRouter);

router.route("/").get(function (req, res) {
  res.status(200).send("hello users");
});

router.route("/:userid").get(function (req, res) {
  res.status(200).send("hello user " + req.params.userid);
});

yourRecipesRouter.route("/").get(function (req, res) {
  res.status(200).send("hello items from user" + req.params.userid);
});

yourRecipesRouter.route("/:recipeid").get(function (req, res) {
  res
    .status(200)
    .send(
      "hello item " + req.params.recipeid + "from user " + req.params.userid
    );
});

export default router;
