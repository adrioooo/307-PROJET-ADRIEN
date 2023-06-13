class ClansCtrl {
    constructor() {
      
      }





      static performSearch() {
        //cela ne sert plus a rien... car je ne peux pas filtrer
       //const filter = document.getElementById('filter').value;
        //const clanName = document.getElementById('nomClan').value;
      
        //if (filter === 'name') {
          // Effectuer une action spécifique pour le tri par nom du clan
          HttpService.searchClansByName();
        //} else if (filter === 'members') {
          // Effectuer une action spécifique pour le tri par nombre de membres
          // Appeler la fonction correspondante de HttpService
        //} else if (filter === 'score') {
          // Effectuer une action spécifique pour le tri par score minimum
          // Appeler la fonction correspondante de HttpService
        //} else {
          // Aucune option de tri sélectionnée
          // Afficher un message d'erreur ou effectuer une action par défaut
        }
      
      











    static handleFilterChange(value) {
      const filterSection = document.querySelector('.filter-input-section');
  
      // Supprimer les anciens éléments de filtrage
      filterSection.innerHTML = '';
  
      // Créer les nouveaux éléments de filtrage en fonction du critère sélectionné
      if (value === 'name') {
        filterSection.appendChild(input);
      } 
    }
  
    searchClans() {
      const filter = document.querySelector('#filter').value;
      let query = '';
  
      if (filter === 'name') {
        const nameInput = document.querySelector('#nomClan');
        const name = nameInput.value;
        query = `name=${name}`;
      } else if (filter === 'members' || filter === 'score') {
        const numberInput = document.querySelector('.filter-input');
        const number = numberInput.value;
        query = `${filter}=${number}`;
      }
  
      // Effectuer la recherche des clans en utilisant la requête
      // query pour interagir avec l'API appropriée
      // ...
    }
  }
  