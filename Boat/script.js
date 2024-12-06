const boat = document.getElementById("boat");
const gameArea = document.getElementById("game-area");
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

// Initialiser le jeu
function initializeGame() {
  boatX = window.innerWidth / 2 - boat.offsetWidth / 2;
  boatY = window.innerHeight / 2 - boat.offsetHeight / 2;
  rotationAngle = 0;

  boat.style.left = `${boatX}px`;
  boat.style.top = `${boatY}px`;
  boat.style.transform = `rotate(${rotationAngle}deg)`;

  createCorals();
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

// Vérifier si le bateau est dans le carré englobant tous les coraux
function isInCoralZone() {
  const coralZone = {
    left: 50,
    top: window.innerHeight - coralZoneHeight - 50,
    right: 50 + coralZoneWidth,
    bottom: window.innerHeight - 50,
  };

  const boatRect = boat.getBoundingClientRect();

  return (
    boatRect.left < coralZone.right &&
    boatRect.right > coralZone.left &&
    boatRect.top < coralZone.bottom &&
    boatRect.bottom > coralZone.top
  );
}

// Gérer les déplacements du bateau
document.addEventListener("keydown", (event) => {
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

  // Détecter la collision avec la zone de coraux
  if (isInCoralZone()) {
    popupOs.style.display = "flex";
  }
});

// Fermer le popup et réinitialiser la partie
closeBtn.addEventListener("click", () => {
  popupOs.style.display = "none";
  initializeGame();
});

// Initialisation au chargement
initializeGame();
