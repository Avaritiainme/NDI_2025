const container = document.getElementById('bulleContainer');
const validerButton = document.getElementById('valider');
const NB_BULLES = 15; // Nombre total de bulles
let poissonsRestants = 0;
let bullesAvecPoisson = 0; // Compteur des bulles avec poisson qui doivent être déplacées dans la zone
let erreursCliquees = 0; // Variable pour suivre les erreurs
const BULLE_DIAMETRE = 50; // Diamètre des bulles en pixels
const bullesPositions = []; // Tableau pour stocker les positions des bulles
const zone = document.getElementById('zoneDeplacement');
const zoneRect = zone.getBoundingClientRect(); // Délimitation de la zone où les bulles doivent être placées

// Fonction pour générer une position aléatoire non chevauchante
function genererPositionNonChevauchante() {
    const containerRect = container.getBoundingClientRect();
    let positionValide = false;
    let x, y;

    while (!positionValide) {
        // Générer des coordonnées aléatoires
        x = Math.random() * (containerRect.width - BULLE_DIAMETRE);
        y = Math.random() * (containerRect.height - BULLE_DIAMETRE);

        // Vérifier si cette position chevauche une bulle existante
        positionValide = bullesPositions.every(pos => {
            const distance = Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2);
            return distance > BULLE_DIAMETRE;
        });
    }

    // Enregistrer la position valide
    bullesPositions.push({ x, y });
    return { x, y };
}

// Fonction pour générer des bulles
function genererBulles() {
    for (let i = 0; i < NB_BULLES; i++) {
        const bulle = document.createElement('div');
        bulle.classList.add('bulle');
        bulle.id = `bulle_${i}`;  // ID unique pour chaque bulle
        
        // Ajouter un poisson aléatoirement (50% des cas)
        if (Math.random() > 0.8) {
            bulle.classList.add('poisson');
            poissonsRestants++;
            bullesAvecPoisson++;
            const img = document.createElement('img');
            img.src = 'Pixel-Art-Fish-4.webp'; // URL de l'image d'un poisson
            img.alt = 'Poisson';
            bulle.appendChild(img);
        }

        // Générer une position non chevauchante
        const position = genererPositionNonChevauchante();
        bulle.style.left = `${position.x}px`;
        bulle.style.top = `${position.y}px`;

        // Ajout des événements de drag-and-drop
        bulle.setAttribute('draggable', true); // Rendre la bulle déplaçable
        
        bulle.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', bulle.id); // Sauvegarder l'ID de la bulle pour le drop
        });

        // Zone de dépôt
        zone.addEventListener('dragover', (e) => {
            e.preventDefault(); // Permet le dépôt
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            const idBulle = e.dataTransfer.getData('text');
            const bulle = document.getElementById(idBulle);

            // Calculer la position du dépôt basé sur les coordonnées du curseur
            const x = e.clientX - BULLE_DIAMETRE / 2; // Position horizontale ajustée pour centrer la bulle
            const y = e.clientY - BULLE_DIAMETRE / 2 - 480; // Ajuster la position verticale pour déplacer vers le haut

            // Vérification si la bulle a un poisson et si elle est dans la zone correcte
            if (bulle.classList.contains('poisson') && !bulle.dataset.depose) {
                // Appliquer la nouvelle position
                bulle.style.left = `${x}px`;
                bulle.style.top = `${y}px`;

                // Marquer la bulle comme déposée pour éviter de décrémenter plusieurs fois
                bulle.dataset.depose = 'true';

                // Décrémenter les poissons restants
                poissonsRestants--;

                verifierCompletion();
            }
        });

        container.appendChild(bulle);
    }
}

// Vérifier si toutes les bulles avec poisson ont été placées
function verifierCompletion() {
    console.log(poissonsRestants);  // Vérification des poissons restants
    if (poissonsRestants === 0) {
        validerButton.disabled = false; // Si tous les poissons ont été déplacés dans la zone, débloquer le bouton
    } else {
        validerButton.disabled = true; // Garder le bouton désactivé tant qu'il reste des poissons à déplacer
    }
}

// Fonction de redirection vers une page d'erreur si nécessaire
function redirigerVersErreur() {
    window.location.href = 'page_erreur.html'; // URL de la page d'erreur
}

// Redirection après validation
validerButton.addEventListener('click', () => {
    // Si il reste des poissons à déplacer, afficher la page d'erreur
    if (poissonsRestants > 0) {
        redirigerVersErreur(); // Redirection vers une page d'erreur
    } else {
        window.location.href = 'page_debloquee.html'; // URL cible de la page à débloquer
    }
});

// Générer les bulles au chargement
genererBulles();
