// Récupérer les éléments
const boat = document.getElementById("boat");
<<<<<<< HEAD
=======
const plankton = document.getElementById("plankton");
>>>>>>> 4b575b87719dbbadd54f19f16d7e4377d8631025
const gameArea = document.getElementById("game-area");
const sea = document.getElementById("sea"); // La mer (arrière-plan)

<<<<<<< HEAD
// Charger les images cycliques du bateau
const boatImages = [
  "images/boat/boat1.png",
  "images/boat/boat2.png",
  "images/boat/boat3.png",
  "images/boat/boat4.png",
  "images/boat/boat5.png",
];
let currentImageIndex = 0; // Index de l'image actuelle

// Charger les images de coraux
const coralImages = [
  "images/coral/coral1.png",
  "images/coral/coral2.png",
  "images/coral/coral3.png",
  "images/coral/coral4.png",
];
const coralCount = 40; // Nombre total de coraux
const coralZoneWidth = 200; // Largeur de la zone de placement
const coralZoneHeight = 200; // Hauteur de la zone de placement

// Mettre à jour les dimensions dynamiques de la zone de jeu
function resizeGameArea() {
  gameArea.style.width = `${window.innerWidth}px`;
  gameArea.style.height = `${window.innerHeight}px`;
  sea.style.width = `${window.innerWidth}px`;
  sea.style.height = `${window.innerHeight}px`;
}

// Initialiser la taille de la zone de jeu
resizeGameArea();

// Ajouter un écouteur pour redimensionner dynamiquement
window.addEventListener("resize", resizeGameArea);

// Initialiser les positions du bateau
let boatX = window.innerWidth / 2 - boat.offsetWidth / 2;
let boatY = window.innerHeight / 2 - boat.offsetHeight / 2;
let rotationAngle = 0;

// Appliquer les positions initiales du bateau
boat.style.left = `${boatX}px`;
boat.style.top = `${boatY}px`;

// Fonction pour changer l'image du bateau
function updateBoatImage() {
  currentImageIndex = (currentImageIndex + 1) % boatImages.length; // Passer à l'image suivante
  boat.src = boatImages[currentImageIndex]; // Mettre à jour la source de l'image
}

// Fonction pour générer des positions aléatoires dans le coin inférieur gauche
function getRandomPositionInBottomLeftZone() {
  const x = Math.random() * coralZoneWidth; // Générer un x entre 0 et la largeur de la zone
  const y = window.innerHeight - Math.random() * coralZoneHeight - 32; // Générer un y dans la zone inférieure
  return { x, y };
}

// Fonction pour créer les coraux derrière le bateau et devant la mer
function createCorals() {
  for (let i = 0; i < coralCount; i++) {
    const coral = document.createElement("img");
    coral.src = coralImages[Math.floor(Math.random() * coralImages.length)]; // Sélectionner une image aléatoire
    coral.style.position = "absolute";
    coral.style.width = "32px";
    coral.style.height = "32px";
    coral.style.zIndex = "1"; // Plan derrière le bateau mais devant la mer

    // Positionner l'image
    const { x, y } = getRandomPositionInBottomLeftZone();
    coral.style.left = `${x}px`;
    coral.style.top = `${y}px`;

    // Ajouter l'image au jeu
    gameArea.appendChild(coral);
  }
}

// Créer les coraux au chargement
createCorals();

// Gérer les touches pressées pour déplacer le bateau
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key === "ArrowUp" && boatY > 0) {
    boatY -= 10; // Le bateau monte
    boat.style.top = `${boatY}px`;
    rotationAngle = 0; // Direction : haut
  } else if (key === "ArrowDown" && boatY < window.innerHeight - boat.offsetHeight) {
    boatY += 10; // Le bateau descend
    boat.style.top = `${boatY}px`;
    rotationAngle = 180; // Direction : bas
  } else if (key === "ArrowLeft" && boatX > 0) {
    boatX -= 10; // Le bateau va à gauche
    boat.style.left = `${boatX}px`;
    rotationAngle = -90; // Direction : gauche
  } else if (key === "ArrowRight" && boatX < window.innerWidth - boat.offsetWidth) {
    boatX += 10; // Le bateau va à droite
    boat.style.left = `${boatX}px`;
    rotationAngle = 90; // Direction : droite
  }

  // Changer l'image du bateau
  updateBoatImage();

  // Mettre à jour la rotation du bateau
=======
// Dimensions
const gameAreaHeight = gameArea.offsetHeight; // Hauteur de la zone visible
const gameAreaWidth = gameArea.offsetWidth; // Largeur de la zone visible

// Initialiser les positions
let boatX = (gameAreaWidth / 2) - (boat.offsetWidth / 2); // Position horizontale initiale (centré)
let boatY = gameAreaHeight - 60; // Position verticale initiale (en bas)
let rotationAngle = 0; // Angle initial (face vers le haut)

// Appliquer les positions initiales
boat.style.left = `${boatX}px`;
boat.style.top = `${boatY}px`;

// Positionner le plancton
function placePlankton() {
  const planktonX = Math.random() * (gameAreaWidth - plankton.offsetWidth);
  const planktonY = Math.random() * (gameAreaHeight - plankton.offsetHeight);
  plankton.style.left = `${planktonX}px`;
  plankton.style.top = `${planktonY}px`;
  plankton.style.display = "block";
}

// Vérifier la collision entre le bateau et le plancton
function checkCollision() {
  const boatRect = boat.getBoundingClientRect();
  const planktonRect = plankton.getBoundingClientRect();

  if (
    boatRect.left < planktonRect.right &&
    boatRect.right > planktonRect.left &&
    boatRect.top < planktonRect.bottom &&
    boatRect.bottom > planktonRect.top
  ) {
    alert("Vous avez attrapé le plancton !");
    plankton.style.display = "none";
    placePlankton(); // Replacer le plancton à un nouvel endroit
  }
}

// Gestion des touches pressées
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key === "ArrowUp") {
    boatY -= 10;
    rotationAngle = 0;
  } else if (key === "ArrowDown") {
    boatY += 10;
    rotationAngle = 180;
  } else if (key === "ArrowLeft" && boatX > 0) {
    boatX -= 10;
    rotationAngle = -90;
  } else if (key === "ArrowRight" && boatX < gameAreaWidth - boat.offsetWidth) {
    boatX += 10;
    rotationAngle = 90;
  }

  // Empêcher le bateau de sortir des limites
  boatY = Math.min(Math.max(boatY, 0), gameAreaHeight - boat.offsetHeight);
  boatX = Math.min(Math.max(boatX, 0), gameAreaWidth - boat.offsetWidth);

  // Mettre à jour les positions et la rotation
  boat.style.left = `${boatX}px`;
  boat.style.top = `${boatY}px`;
>>>>>>> 4b575b87719dbbadd54f19f16d7e4377d8631025
  boat.style.transform = `rotate(${rotationAngle}deg)`;

  checkCollision();
});

// Initialisation
window.onload = () => {
  placePlankton();
};
