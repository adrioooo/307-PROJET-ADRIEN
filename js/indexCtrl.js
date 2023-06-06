/*
  But :     
  Auteur : prénom + nom
  Date :   jj.mm.aaaa / V1.0
*/

$().ready(function () {
  // service et indexCtrl sont des variables globales qui doivent être accessible depuis partout => pas de mot clé devant ou window.xxx
  http = new HttpService();
  indexCtrl = new IndexCtrl();  // ctrl principal
  http.centraliserErreurHttp(indexCtrl.afficherErreurHttp);
});


class IndexCtrl {
  constructor() {
    this.vue = new VueService();
    this.loadMenu();
  }

  afficherErreurHttp(msg) {
    alert(msg);
  }

  // avec arrow function
  loadJoueurs() {
    this.vue.chargerVue("Joueurs", () =>  new JoueursCtrl());
  }

  // avec function classique
  loadMenu() {
    this.vue.chargerVue("Menu", new MenuCtrl());
  }

  loadCompte() {
    this.vue.chargerVue("Cartes", () =>  new CartesCtrl());
  }

}

