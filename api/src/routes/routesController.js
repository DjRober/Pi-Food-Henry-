const { Recipe } = require("../db");

function* infiniteGenerator() {
  let id = 0;
  while (true) {
    yield "U" + id;
    id++;
  }
}

const idGenerator = infiniteGenerator();

const getRecipeById = async (id) => {
  if (id[0] == "U") {
    const recipe = await Recipe.findByPk(id);
    return recipe;
  }

  const api = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.APIKEY}`
  );
  const data = await api.json();

  return data;
};

const getRecipesByName = async (name) => {
  name ? name.toLowerCase() : (name = "");

  const api = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.APIKEY}&number=100`
  );
  const data = await api.json();

  let recipes = await Recipe.findAll();
  if (recipes) {
    recipes = recipes.map((recipe) => {
      data.results.push(recipe.dataValues);
    });
  }

  const dataFiltered = data.results.filter((data) =>
    data.title
      ? data.title.toLowerCase().includes(name)
      : data.name.toLowerCase().includes(name)
  );

  return dataFiltered;
};

const postRecipe = async (name, image, resume, healthScore, steps) => {
  const newRecipe = await Recipe.create({
    id: idGenerator.next().value,
    name,
    image,
    resume,
    healthScore,
    steps,
  });
  return newRecipe;
};

const getDiets = () => {};

module.exports = {
  getRecipeById,
  getRecipesByName,
  postRecipe,
  getDiets,
};
