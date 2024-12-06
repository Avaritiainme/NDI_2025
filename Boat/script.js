// Récupérer les éléments
const boat = document.getElementById("boat");
const plankton = document.getElementById("plankton");
const gameArea = document.getElementById("game-area");

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
  boat.style.transform = `rotate(${rotationAngle}deg)`;

  checkCollision();
});

// Initialisation
window.onload = () => {
  placePlankton();
};
