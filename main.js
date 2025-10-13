const appli = Vue.createApp({ // crée une app Vue
  data() { // Déclare les données de l'app
    return {
      message: "Chargement...", // texte initial
      projects: [] // liste vide pour projets
    };
  },
  mounted() {  // Code quand DOM est prêt
    console.log("L'app Vue a été créée et montée au DOM (mounted) !"); // log info
    this.message = "Vue a été chargée et montée au DOM !"; // change message

    fetch('./projects.json') // Charge les données de projects.json
      .then(response => response.json()) // met la réponse en JSON
      .then(data => {
        this.projects = data; // stocke les projets dans la donnée Vue
        this.$nextTick(() => { // attend que Vue mette à jour le DOM
          this.initSwipers(); // Initialise les Swiper
        });
      })
      .catch(error => {
        console.error('Erreur lors du fetch :', error); // affiche une erreur si fetch n'a pas marché
      });
  },
  methods: {
    initSwipers() { // initialise les Swiper
      document.querySelectorAll('.swiper').forEach((el) => { // pour chaque swiper
        new Swiper(el, { // crée un nouveau Swiper
          loop: true, // active boucle infinie
          pagination: {
            el: el.querySelector('.swiper-pagination'), // pagination
            clickable: true // pagination cliquable
          },
          navigation: {
            nextEl: el.querySelector('.swiper-button-next'), // flèche suivante
            prevEl: el.querySelector('.swiper-button-prev') // flèche précédente
          }
        });
      });
    }
  }
});

const vm = appli.mount('#app'); // monte l'app Vue sur l'élément id app de mon html
