const { Router } = require("express");
const {
  getRecipeById,
  getRecipesByName,
  postRecipe,
  getDiets,
} = require("./routesController");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/recipes/:idRecipe", (req, res) => {
  const { id } = req.params;
  try {
    const recipe = getRecipeById(id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/recipes/name", (req, res) => {
  const { name } = req.query;

  try {
    const recipes = getRecipesByName(name);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.send(name);
});

router.post("/recipes", (req, res) => {
  const { name, image, resume, healthScore, steps } = req.body;

  try {
    const newRecipe = postRecipe(name, image, resume, healthScore, steps);
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/diets", (req, res) => {
  try {
    const diets = getDiets();
    res.status(200).json(diets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
