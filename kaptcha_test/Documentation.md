##Documentation du CAPTCHA ludique : 

#Description du principe de fonctionnement : 
Le principe de base utilisé pour notre CAPTCHA consiste à déplacer un objet 
à l'aide de la souris dans une zone bien précise afin de valider la présence humaine.

#Description de la mise en oeuvre du CAPTCHA : 
Pour cela l'utilisateur se retrouve sure une page comprenant 2 zones : 
-Une contenant les divers objets (ceux à placer dans la zone de déverouillage et les leurs)
-L'autre étant vide et servant de zone de validation

Le but pour valider ce CAPTCHA est donc de placer tous les objets ayant une forme de poisson 
dans la zone de validation.
Si tous les objets poissons sont dans la zone alors le CAPTCHA peut être validé.
Sinon il faut continuer de placer les poisssons suivants.
A noter que si un objet leurs est placé dans la zone de validation, la page doit être 
rechargée pour passer le CAPTCHA.
Nous avons fait ce choix afin d'empêcher un bot d'apprendre les patterns de disposition des objets.
Après remplissage de la zone par les poissons, le bouton validé est donc clicable et il est
possible d'acceder à la page principale de notre site.

#Ajustements des paramètres du CAPTCHA :
Le nombre de poissons est ajoustable en modifiant le nombre lors de la création de nombre aléatoire.
Le nombre de bulles est aussi ajustable au début du code via modification de la variable NB_BULLES.  