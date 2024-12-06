// Ouvrir et fermer les popups
document.querySelectorAll('.open-popup').forEach((img) => {
  img.addEventListener('click', () => {
    const popupId = img.getAttribute('data-popup');
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.style.display = 'flex'; // Afficher le popup
    }
  });
});

document.querySelectorAll('.popup .close').forEach((closeButton) => {
  closeButton.addEventListener('click', () => {
    const popup = closeButton.closest('.popup');
    popup.style.display = 'none'; // Cacher le popup
  });
});

// Fermer le popup en cliquant à l'extérieur du contenu
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      popup.style.display = 'none';
    }
  });
});

