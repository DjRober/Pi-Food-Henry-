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
router.get("/recipes/name", async (req, res) => {
  const { name } = req.query;
  console.log(name);
  try {
    const recipes = await getRecipesByName(name);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await getRecipeById(id);
    console.log(recipe);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/recipes", async (req, res) => {
  const { name, image, resume, healthScore, steps } = req.body;

  try {
    const newRecipe = await postRecipe(name, image, resume, healthScore, steps);
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
