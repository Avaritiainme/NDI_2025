const boat = document.getElementById("boat");
const gameArea = document.getElementById("game-area");
const sea = document.getElementById("sea"); // La mer
const popupOs = document.getElementById("popup-os");
const closeBtn = popupOs.querySelector(".close");

// Charger les images du bateau
const boatImages = [
  "images/boat/boat1.png",
  "images/boat/boat2.png",
  "images/boat/boat3.png",
  "images/boat/boat4.png",
  "images/boat/boat5.png",
];
let currentImageIndex = 0;

// Variables dynamiques
let boatX, boatY, rotationAngle;

// Zone de coraux
const coralImages = [
  "images/coral/coral1.png",
  "images/coral/coral2.png",
  "images/coral/coral3.png",
  "images/coral/coral4.png",
];
const coralCount = 40;
const coralZoneWidth = 200;
const coralZoneHeight = 200;

// Matrice codée en dur pour la zone coldsea
const coldSeaMatrix = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

document.addEventListener("keydown", (event) => {
  event.preventDefault(); // Empêche le comportement par défaut des flèches

  const key = event.key;
  const step = 10;

  if (key === "ArrowUp") {
    boatY -= step;
    rotationAngle = 0;
  } else if (key === "ArrowDown") {
    boatY += step;
    rotationAngle = 180;
  } else if (key === "ArrowLeft") {
    boatX -= step;
    rotationAngle = -90;
  } else if (key === "ArrowRight") {
    boatX += step;
    rotationAngle = 90;
  }

  // Empêcher le bateau de sortir des limites
  boatX = Math.max(0, Math.min(window.innerWidth - boat.offsetWidth, boatX));
  boatY = Math.max(0, Math.min(window.innerHeight - boat.offsetHeight, boatY));

  // Appliquer les nouvelles positions et la rotation
  boat.style.left = `${boatX}px`;
  boat.style.top = `${boatY}px`;
  boat.style.transform = `rotate(${rotationAngle}deg)`;

  // Changer l'image du bateau
  currentImageIndex = (currentImageIndex + 1) % boatImages.length;
  boat.src = boatImages[currentImageIndex];
});

// Initialiser le jeu
function initializeGame() {
  boatX = window.innerWidth / 2 - boat.offsetWidth / 2;
  boatY = window.innerHeight / 2 - boat.offsetHeight / 2;
  rotationAngle = 0;

  boat.style.left = `${boatX}px`;
  boat.style.top = `${boatY}px`;
  boat.style.transform = `rotate(${rotationAngle}deg)`;

  createSeaPattern(); // Créer la mer avec la matrice codée en dur
  createCorals();
  createPlankton(); // Ajouter plankton et plankton2
  createWhale(); // Ajouter la baleineSel
}

// Ajouter la baleineSel dans le coin supérieur gauche
function createWhale() {
  const whale = document.createElement("img");
  whale.src = "images/baleineSel.png";
  whale.style.position = "absolute";
  whale.style.width = "150px";
  whale.style.height = "auto";
  whale.style.zIndex = "1"; // Plan devant la mer
  whale.style.left = `${window.innerWidth - 200}px`; // Espacé de 50px du bord gauche
  whale.style.top = "50px"; // Espacé de 50px du bord supérieur

  gameArea.appendChild(whale);
}

// Générer des positions aléatoires pour les coraux
function getRandomPositionInBottomLeftZone() {
  const x = Math.random() * coralZoneWidth;
  const y = window.innerHeight - Math.random() * coralZoneHeight - 32;
  return { x, y };
}

// Créer les coraux dans une zone définie
function createCorals() {
  for (let i = 0; i < coralCount; i++) {
    const coral = document.createElement("img");
    coral.src = coralImages[Math.floor(Math.random() * coralImages.length)];
    coral.style.position = "absolute";
    coral.style.width = "32px";
    coral.style.height = "32px";
    coral.style.zIndex = "1";

    const { x, y } = getRandomPositionInBottomLeftZone();
    coral.style.left = `${x}px`;
    coral.style.top = `${y}px`;

    gameArea.appendChild(coral);
  }
}

// Ajouter plankton et plankton2 au bas de la mer
function createPlankton() {
  const plankton1 = document.createElement("img");
  const plankton2 = document.createElement("img");

  // Définir les images
  plankton1.src = "images/plankton.png";
  plankton2.src = "images/plankton2.png";

  // Position et style pour plankton1
  plankton1.style.position = "absolute";
  plankton1.style.width = "50px";
  plankton1.style.height = "50px";
  plankton1.style.zIndex = "1";
  plankton1.style.left = `${window.innerWidth / 2 - 60}px`; // 60px à gauche du centre
  plankton1.style.top = `${window.innerHeight - 60}px`; // Aligné en bas

  // Position et style pour plankton2
  plankton2.style.position = "absolute";
  plankton2.style.width = "50px";
  plankton2.style.height = "50px";
  plankton2.style.zIndex = "1";
  plankton2.style.left = `${window.innerWidth / 2 + 10}px`; // 10px à droite du centre
  plankton2.style.top = `${window.innerHeight - 60}px`; // Aligné en bas

  // Ajouter les deux planctons au jeu
  gameArea.appendChild(plankton1);
  gameArea.appendChild(plankton2);
}

// Dessiner la mer avec la matrice codée en dur
function createSeaPattern() {
  const tileSize = 32; // Taille d'un motif
  const cols = Math.ceil(window.innerWidth / tileSize);
  const rows = Math.ceil(window.innerHeight / tileSize);

  // Effacer la mer précédente
  sea.innerHTML = "";

  // Dessiner les motifs
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const tile = document.createElement("div");
      tile.style.width = `${tileSize}px`;
      tile.style.height = `${tileSize}px`;
      tile.style.position = "absolute";
      tile.style.left = `${col * tileSize}px`;
      tile.style.top = `${row * tileSize}px`;

      // Appliquer le motif coldsea ou sea
      if (
        row < coldSeaMatrix.length &&
        col < coldSeaMatrix[0].length &&
        coldSeaMatrix[row][col] === 1
      ) {
        tile.style.backgroundImage = "url('images/coldsea.png')";
      } else {
        tile.style.backgroundImage = "url('images/sea.png')";
      }
      tile.style.backgroundSize = "cover";

      // Ajouter la tuile à la mer
      sea.appendChild(tile);
    }
  }
}

// Gérer les déplacements et autres événements (inchangé)
// Initialisation au chargement
initializeGame();
