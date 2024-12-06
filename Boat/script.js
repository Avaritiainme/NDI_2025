// Récupérer les éléments
const boat = document.getElementById("boat");
const gameArea = document.getElementById("game-area");
const sea = document.getElementById("sea"); // La mer (arrière-plan)

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

// Matrice codée en dur pour le coin supérieur gauche (12x19)
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
  [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// Mettre à jour les dimensions dynamiques de la zone de jeu
function resizeGameArea() {
  gameArea.style.width = `${window.innerWidth}px`;
  gameArea.style.height = `${window.innerHeight}px`;
  sea.style.width = `${window.innerWidth}px`;
  sea.style.height = `${window.innerHeight}px`;
  createSeaPattern(); // Redessiner la mer sur redimensionnement
}

// Fonction pour dessiner la mer avec les deux motifs
function createSeaPattern() {
  const tileSize = 32; // Taille d'un motif
  const cols = Math.ceil(window.innerWidth / tileSize);
  const rows = Math.ceil(window.innerHeight / tileSize);

  // Effacer le contenu précédent
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

      // Ajouter le motif à la mer
      sea.appendChild(tile);
    }
  }
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
  boat.style.transform = `rotate(${rotationAngle}deg)`;
});
