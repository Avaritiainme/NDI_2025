// Récupérer les éléments
const boat = document.getElementById("boat");
const sea = document.getElementById("sea");
const gameArea = document.getElementById("game-area");

// Dimensions
const gameAreaHeight = gameArea.offsetHeight; // Hauteur du carré visible (zone de jeu)
const gameAreaWidth = gameArea.offsetWidth; // Largeur du carré visible (zone de jeu)
const seaHeight = parseInt(window.getComputedStyle(sea).height); // Hauteur totale de la mer

// Limites de la mer
const seaSixth = seaHeight / 6; // 1/6 de la hauteur totale de la mer
const seaFiveSixths = (5 * seaHeight) / 6; // 5/6 de la hauteur totale de la mer
const seaTopLimit = -(seaHeight - gameAreaHeight); // Limite supérieure pour le défilement

// Initialiser les positions
let boatX = 375; // Position horizontale initiale
let boatY = gameAreaHeight  - 50; // Le bateau commence en bas du cadre visible
let theoreticalY = seaSixth; // Position théorique initiale du bateau (1/6 inférieur)
let seaOffsetY = 0; // Décalage initial de la mer
let rotationAngle = 0; // Angle initial (facing up)

// Gérer les touches pressées
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key === "ArrowUp") {
    // Mettre à jour la position théorique
    theoreticalY -= 10;

    // Si le bateau est dans la zone centrale (entre 1/6 et 5/6)
    if (theoreticalY > seaSixth && theoreticalY <= seaFiveSixths && seaOffsetY < 0) {
      seaOffsetY += 10; // La mer descend
      sea.style.transform = `translateY(${seaOffsetY}px)`;
    }
    // Mouvement libre dans les 5/6 supérieurs
    else if (theoreticalY > seaFiveSixths && boatY > 0) {
      boatY -= 10; // Le bateau monte librement
      boat.style.top = `${boatY}px`;
    }
    // Mouvement libre dans le 1/6 inférieur
    else if (theoreticalY <= seaSixth && boatY > 0) {
      boatY -= 10; // Le bateau monte
      boat.style.top = `${boatY}px`;
    }
    rotationAngle = 0; // Direction : haut
  } else if (key === "ArrowDown") {
    // Mettre à jour la position théorique
    theoreticalY += 10;

    // Si le bateau est dans la zone centrale (entre 1/6 et 5/6)
    if (theoreticalY > seaSixth && theoreticalY <= seaFiveSixths && seaOffsetY > seaTopLimit) {
      seaOffsetY -= 10; // La mer remonte
      sea.style.transform = `translateY(${seaOffsetY}px)`;
    }
    // Mouvement libre dans le 1/6 inférieur
    else if (theoreticalY <= seaSixth && boatY < gameAreaHeight - boat.offsetHeight) {
      boatY += 10; // Le bateau descend librement
      boat.style.top = `${boatY}px`;
    }
    // Mouvement libre dans les 5/6 supérieurs
    else if (theoreticalY > seaFiveSixths && boatY < gameAreaHeight - boat.offsetHeight) {
      boatY += 10; // Le bateau descend
      boat.style.top = `${boatY}px`;
    }
    rotationAngle = 180; // Direction : bas
  } else if (key === "ArrowLeft" && boatX > 0) {
    boatX -= 10; // Déplacement gauche
    boat.style.left = `${boatX}px`;
    rotationAngle = -90; // Rotation : gauche
  } else if (key === "ArrowRight" && boatX < gameAreaWidth - boat.offsetWidth) {
    boatX += 10; // Déplacement droite
    boat.style.left = `${boatX}px`;
    rotationAngle = 90; // Rotation : droite
  }

  // Mettre à jour la rotation du bateau
  boat.style.transform = `rotate(${rotationAngle}deg)`;
});
