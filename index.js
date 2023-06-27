// ----------------
// Fonctions / variables globales (utilisées dans tous les composants)
// ----------------

// permet de cibler la div avec l'id root créée en HTML
const divRoot = document.querySelector("#root");

// fonction générique permettant de créer un tag HTML (un node du DOM)
// en précisant son type (div, p, h2 etc), ses attributs et son texte
const createNodeElement = (tagType, attributes, text = "") => {
  const nodeElement = document.createElement(tagType);

  for (const property in attributes) {
    nodeElement.setAttribute(property, attributes[property]);
  }

  nodeElement.textContent = text;

  return nodeElement;
};

// ----------------
// Composants permettant de créer le contenu de notre site
// ----------------

// fonction qui permet de créer le formulaire de contact
// et de gérer sa logique (envoie des données au submit si besoin etc)
const contactFormComponent = () => {
  const formElement = createNodeElement("form");

  const inputTextElement = createNodeElement("input", {
    type: "text",
    class: "contact-text",
  });
  formElement.appendChild(inputTextElement);

  const submitBtnElement = createNodeElement(
    "button",
    {
      type: "submit",
      class: "contact-submit",
    },
    "Valider"
  );
  formElement.appendChild(submitBtnElement);

  divRoot.appendChild(formElement);
};

// appel de la fonction permettant de créer le formulaire de contact
contactFormComponent();

// création de la fonction pour afficher la liste de recettes
// fait un appel vers l'api pour récupérer les données
// créer le HTML pour afficher les données (recettes de cuisines)
const mealsListComponent = async () => {
  const responseJson = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s");
  const responseJavascript = await responseJson.json();

  responseJavascript.meals.forEach((meal) => {
    const mealTitleElement = createNodeElement(
      "h2",
      {
        class: "meal-title",
      },
      meal.strMeal
    );
    divRoot.appendChild(mealTitleElement);

    const mealImgElement = createNodeElement("img", {
      src: meal.strMealThumb,
    });
    divRoot.appendChild(mealImgElement);
  });
};

// appel de la fonction qui permet de créer la liste des recettes de cuisine
mealsListComponent();



// // récupérer mon js / html dans vos projets
// // afficher sur votre page la liste des catégories de recettes de cuisines
// // -- créer un composant mealCategoriesListComponent (avec la même structure que mealsListComponent) : 
// // --- ce composant doit faire un appel fetch vers https://www.themealdb.com/api/json/v1/1/categories.php)
// // --- avec les données récupérées : faire un boucle et pour chaque catégorie, créer une balise h2 avec le nom de la catégorie
// // --- une fois le composant (la fonction) créé, exécutez le pour afficher la liste des catégories dans votre page (en dessous de la liste des recettes)



// Fonction pour afficher la liste des catégories de repas
const mealCategoriesListComponent = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  try {
    const response = await fetch(url);
    const data = await response.json();
    const categories = data.categories;

    // Création d'un conteneur pour les catégories
    const categoriesContainer = createNodeElement("div", { class: "categories-container" });

    categories.forEach((category) => {
      // Création d'un élément h2 pour afficher le nom de la catégorie
      const categoryTitleElement = createNodeElement("h2", { class: "category-title" }, category.strCategory);
      categoriesContainer.appendChild(categoryTitleElement);
    });

    // Ajout du conteneur des catégories à l'élément racine (divRoot)
    divRoot.appendChild(categoriesContainer);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des catégories de repas.', error);
  }
};

// Appel du composant mealCategoriesListComponent pour afficher la liste des catégories
mealCategoriesListComponent();


