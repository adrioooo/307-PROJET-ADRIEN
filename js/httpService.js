class HttpService {
  static searchClansByName() {
    $.ajax({
      url: 'https://turberga.emf-informatique.ch/307/clans.json',
      dataType: 'json',
      success: function(data) {
        var clansListDiv = $('#clans-list');
        clansListDiv.empty();

        data.items.forEach(function(clan) {
          var clanElement = $('<div>').addClass('clan');
          clanElement.append('<p><span>Tag du clan:</span> ' + clan.tag + '</p>');
          clanElement.append('<p><span>Nom:</span> ' + clan.name + '</p>');
          clanElement.append('<p><span>Type:</span> ' + clan.type + '</p>');

          if (clan.type === 'open') {
            clanElement.append('<p><span>Statut:</span> <span class="green-text">Ouvert</span></p>');
          } else {
            clanElement.append('<p><span>Statut:</span> <span class="red-text">Fermé</span></p>');
          }

          clanElement.append('<p><span>Score du clan:</span> ' + clan.clanScore + '</p>');
          clanElement.append('<p><span>Trophées du clan en guerre:</span> ' + clan.clanWarTrophies + '</p>');

          if (clan.location.name.toLowerCase() === 'international') {
            var globeImage = $('<img>').addClass('world-image');
            globeImage.attr('src', 'images/globe.png');
            clanElement.append('<p><span>Localisation:</span> </p>').append(globeImage);
          } else {
            var locationLink = $('<a>').attr('href', '#').addClass('location-link').data('country', clan.location.name).text(clan.location.name);
            clanElement.append('<p><span>Localisation:</span> </p>').append(locationLink);
          }

          clanElement.append('<p><span>Trophées requis:</span> ' + clan.requiredTrophies + '</p>');
          clanElement.append('<p><span>Donations par semaine:</span> ' + clan.donationsPerWeek + '</p>');
          clanElement.append('<p><span>Niveau du coffre du clan:</span> ' + clan.clanChestLevel + '</p>');
          clanElement.append('<p><span>Niveau maximum du coffre du clan:</span> ' + clan.clanChestMaxLevel + '</p>');
          clanElement.append('<p><span>Nombre de membres:</span> ' + clan.members + '</p>' + '<br>');

          clansListDiv.append(clanElement);
        });

        // Ajout d'un gestionnaire d'événements pour les liens de localisation
        $('.location-link').on('click', function(event) {
          event.preventDefault();
          var country = $(this).data('country');
          HttpService.openMapForCountry(country);
        });
      },
      error: function() {
        console.log('Erreur lors de la requête des clans');
      }
    });
  }

  static openMapForCountry(country) {
    $.ajax({
      url: 'https://nominatim.openstreetmap.org/search',
      data: {
        q: country,
        format: 'json',
        limit: 1
      },
      success: function(data) {
        if (data.length > 0) {
          var latitude = data[0].lat;
          var longitude = data[0].lon;
          var mapUrl = 'https://www.openstreetmap.org/?mlat=' + latitude + '&mlon=' + longitude + '#map=15/' + latitude + '/' + longitude;
          window.open(mapUrl, '_blank');
        } else {
          console.log('Coordonnées introuvables pour le pays : ' + country);
        }
      },
      error: function() {
        console.log('Erreur lors de la récupération des coordonnées pour le pays : ' + country);
      }
    });
  }

  static searchPlayer() {
    // Récupérer la valeur de l'identifiant du joueur à partir de la zone de texte avec l'id "idJoueur"
    var playerId = $('#idJoueur').val();

    // Construire l'URL du fichier JSON en utilisant l'identifiant du joueur
    var url = 'https://turberga.emf-informatique.ch/307/' + playerId + '.json';

    // Effectuer une requête AJAX pour récupérer le fichier JSON correspondant à l'identifiant du joueur
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        // Vérifier si le joueur a été trouvé
        if (data) {
          const playerElement = HttpService.createPlayerElement(data);
          const playersListDiv = $('#players-list');
          playersListDiv.empty();
          playersListDiv.append(playerElement);
        } else {
          const playersListDiv = $('#players-list');
          playersListDiv.empty();
          playersListDiv.append('<p>Joueur non trouvé</p>');
        }
      },
      error: function() {
        const playersListDiv = $('#players-list');
        playersListDiv.empty();
        playersListDiv.append('<p>Erreur lors de la recherche du joueur</p>');
      }
    });
  }

  static createPlayerElement(playerData) {
    const playerElement = $('<div>').addClass('player');

    // Ajouter les informations du joueur à l'élément HTML
    playerElement.append('<p><span>Tag du joueur:</span> ' + playerData.tag + '</p>');
    playerElement.append('<p><span>Nom:</span> ' + playerData.name + '</p>');
    playerElement.append('<p><span>Niveau d\'expérience:</span> ' + playerData.expLevel + '</p>');
    playerElement.append('<p><span>Trophées:</span> ' + playerData.trophies + '</p>');
    playerElement.append('<p><span>Meilleurs trophées:</span> ' + playerData.bestTrophies + '</p>');
    playerElement.append('<p><span>Victoires:</span> ' + playerData.wins + '</p>');
    playerElement.append('<p><span>Défaites:</span> ' + playerData.losses + '</p>');
    
    // Ajouter d'autres informations du joueur ici...

    return playerElement;
  }


  static displayAllCards() {
    $.ajax({
      url: 'https://turberga.emf-informatique.ch/307/Cartes.json',
      dataType: 'json',
      success: function(data) {
        const cardsListDiv = $('#cards-list');
        cardsListDiv.empty();

        data.items.forEach(function(card) {
          const cardElement = HttpService.createCardElement(card);
          cardsListDiv.append(cardElement);
        });
      },
      error: function() {
        const cardsListDiv = $('#cards-list');
        cardsListDiv.empty();
        cardsListDiv.append('<p>Erreur lors du chargement des cartes</p>');
      }
    });
  }

  static createCardElement(cardData) {
    const cardElement = $('<div>').addClass('card');
  
    const cardName = $('<p>').addClass('card-name').text('Nom: ' + cardData.name);
    const cardId = $('<p>').addClass('card-id').text('ID: ' + cardData.id);
    const cardMaxLevel = $('<p>').addClass('card-max-level').text('Niveau maximum: ' + cardData.maxLevel);
    const cardImage = $('<img>').attr('src', cardData.iconUrls.medium).attr('alt', cardData.name);
  
    cardElement.append(cardName, cardId, cardMaxLevel, cardImage);
  
    return cardElement;
  }
  


  

  /*
  **  $.ajaxSetup permet de définir une fois un élément sans le refaire par la suite. Ici cela se fait pour l'erreur
  */
  centraliserErreurHttp(httpErrorCallbackFn) {
    $.ajaxSetup({
      error: function (xhr, exception) {
        let msg;
        if (xhr.status === 0) {
          msg = "Pas d'accès à la ressource serveur demandée !";
        } else if (xhr.status === 404) {
          msg = "Page demandée non trouvée [404] !";
        } else if (xhr.status === 500) {
          msg = "Erreur interne sur le serveur [500] !";
        } else if (exception === "parsererror") {
          msg = "Erreur de parcours dans le JSON !";
        } else if (exception === "timeout") {
          msg = "Erreur de délai dépassé [Time out] !";
        } else if (exception === "abort") {
          msg = "Requête Ajax stoppée !";
        } else {
          msg = "Erreur inconnue : \n" + xhr.responseText;
        }
        httpErrorCallbackFn(msg);
      },
    });
  }
}
