const container = document.getElementById('bulleContainer');
const validerButton = document.getElementById('valider');
const NB_BULLES = 15; // Nombre total de bulles
let poissonsRestants = 0;
let bullesClassiquesDansZone = 0; // Nombre de bulles classiques dans la zone
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
        bulle.id = `bulle_${i}`; // ID unique pour chaque bulle

        // Ajouter une image classique pour chaque bulle au départ
        const imgClassique = document.createElement('img');
        imgClassique.src = '/static/captcha/images/bateau.png'; // URL de l'image classique
        imgClassique.alt = 'Bulle classique'; // Texte alternatif pour l'accessibilité
        bulle.appendChild(imgClassique);

        // Marquer la bulle comme étant une bulle classique au départ
        bulle.dataset.type = 'classique';

        // Ajouter un poisson aléatoirement (20% des bulles)
        if (Math.random() > 0.8) {
            const imgPoisson = document.createElement('img');
            imgPoisson.src = '/static/captcha/images/Pixel-Art-Fish-4.webp'; // URL de l'image poisson
            imgPoisson.alt = 'Poisson';

            // Remplacer l'image classique par l'image du poisson
            const imageExistante = bulle.querySelector('img');
            if (imageExistante) {
                imageExistante.src = imgPoisson.src;
                imageExistante.alt = imgPoisson.alt;
            }

            // Marquer la bulle comme contenant un poisson
            bulle.dataset.type = 'poisson';
            poissonsRestants++;
        }

        // Générer une position non chevauchante
        const position = genererPositionNonChevauchante();
        bulle.style.left = `${position.x}px`;
        bulle.style.top = `${position.y}px`;

        // Ajout des événements de drag-and-drop
        bulle.setAttribute('draggable', true);

        bulle.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', bulle.id); // Sauvegarder l'ID de la bulle
        });

        container.appendChild(bulle);
    }

    // Ajout des événements pour la zone de dépôt
    zone.addEventListener('dragover', (e) => {
        e.preventDefault(); // Permettre le dépôt
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        const idBulle = e.dataTransfer.getData('text');
        const bulle = document.getElementById(idBulle);

        // Calculer la position du dépôt
        const x = e.clientX - BULLE_DIAMETRE / 2;
        const y = e.clientY - BULLE_DIAMETRE / 2 -480;

        // Appliquer la nouvelle position
        bulle.style.left = `${x}px`;
        bulle.style.top = `${y}px`;

        // Vérifier si la bulle est dans la zone
        const bulleRect = bulle.getBoundingClientRect();
        const estDansZone =
            bulleRect.left >= zoneRect.left &&
            bulleRect.right <= zoneRect.right &&
            bulleRect.top >= zoneRect.top &&
            bulleRect.bottom <= zoneRect.bottom;

        if (bulle.dataset.type === 'poisson') {
            if (estDansZone && !bulle.dataset.depose) {
                bulle.dataset.depose = 'true';
                poissonsRestants--;
            } else if (!estDansZone && bulle.dataset.depose) {
                bulle.dataset.depose = 'false';
                poissonsRestants++;
            }
        } else if (bulle.dataset.type === 'classique') {
            if (estDansZone && bulle.dataset.dansZone !== 'true') {
                bullesClassiquesDansZone++;
            } else if (!estDansZone && bulle.dataset.dansZone === 'true') {
                bullesClassiquesDansZone--;
            }
            bulle.dataset.dansZone = estDansZone.toString();
        }

        verifierCompletion();
    });
}

// Vérifier si toutes les conditions de validation sont remplies
function verifierCompletion() {
    validerButton.disabled = poissonsRestants > 0 || bullesClassiquesDansZone > 0;
}

// Redirection après validation
validerButton.addEventListener('click', () => {
    if (poissonsRestants === 0 && bullesClassiquesDansZone === 0) {
        window.location.href = 'boat/';
    }
});

// Générer les bulles au chargement
genererBulles();
