class ClansCtrl {
    constructor() {
      
      }

    static handleFilterChange(value) {
      const filterSection = document.querySelector('.filter-input-section');
  
      // Supprimer les anciens éléments de filtrage
      filterSection.innerHTML = '';
  
      // Créer les nouveaux éléments de filtrage en fonction du critère sélectionné
      if (value === 'name') {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'nomClan';
        input.placeholder = 'Entrez un nom de clan';
        filterSection.appendChild(input);
      } else if (value === 'members' || value === 'score') {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = 'Entrez un nombre';
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
  