/*
  But :     ctrl de l'acceuil
  Auteur : adrien turberg
  Date :   05.06.2023 / V1.0
*/
class MenuCtrl {
  constructor() {
    this.appliquerImageFond();
  }

  appliquerImageFond() {
    // Sélectionner l'élément avec l'identifiant 'backgroundImages'
    var backgroundElement = document.getElementById('backgroundImages');

    if (backgroundElement) {
      // Tableau contenant les chemins des images de fond
      var backgroundImages = ['images/voleuse.png', 'images/feu.png', 'images/garde.png','images/dragon.png','images/prince.png'];

      // Fonction pour générer un index aléatoire
      function getRandomIndex(max) {
        return Math.floor(Math.random() * max);
      }

      // Sélectionner une image de fond aléatoire
      var randomImage = backgroundImages[getRandomIndex(backgroundImages.length)];

      // Appliquer le style CSS avec l'image de fond aléatoire
      backgroundElement.style.backgroundImage = 'url(' + randomImage + ')';
      backgroundElement.style.backgroundRepeat = 'no-repeat';
      backgroundElement.style.backgroundPosition = 'center';
      backgroundElement.style.backgroundSize = '1000px';
    }
  }
}
