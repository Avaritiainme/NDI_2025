## Documentation du CAPTCHA Ludique

### Description du principe de fonctionnement

Le CAPTCHA repose sur un principe ludique : l'utilisateur doit déplacer un objet à l'aide de la souris dans une zone définie pour valider la présence humaine.

### Description de la mise en œuvre du CAPTCHA

La page est divisée en deux zones distinctes :  
1. Une première zone contenant divers objets, parmi lesquels des poissons (à déplacer dans la zone de validation) et des objets non pertinents.  
2. Une seconde zone, vide au départ, servant de zone de validation.

Pour valider ce CAPTCHA, l'utilisateur doit déplacer tous les objets représentant des poissons dans la zone de validation. Si tous les poissons sont correctement placés, le CAPTCHA est validé. Si un objet non pertinent est placé dans la zone de validation, la page est rechargée, empêchant un bot de prédire ou d'apprendre les motifs de disposition des objets. 

Lorsque la zone est correctement remplie de poissons, le bouton **Valider** devient cliquable, permettant l'accès à la page principale du site.

### Ajustements des paramètres du CAPTCHA

- **Nombre de poissons** : Modifiable en ajustant la génération aléatoire des objets contenant des poissons.  
- **Nombre total de bulles** : Ajustable en modifiant la variable `NB_BULLES` définie au début du code.  
