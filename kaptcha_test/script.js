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
            const x = e.clientX - zoneRect.left - BULLE_DIAMETRE / 2;
            const y = e.clientY - zoneRect.top - BULLE_DIAMETRE / 2;

            // Si la bulle a un poisson et n'est pas déjà dans la zone
            if (bulle.classList.contains('poisson')) {
                bulle.style.left = `${x}px`;
                bulle.style.top = `${y}px`;
                poissonsRestants--; // Décrémenter les poissons restants
                verifierCompletion();
            }
        });

        container.appendChild(bulle);
    }
}

// Vérifier si toutes les bulles avec poisson ont été cliquées et placées
function verifierCompletion() {
    if (poissonsRestants === 0) {
        validerButton.disabled = false; // Si toutes les bulles avec poisson sont dans la zone, débloquer le bouton
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
