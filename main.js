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
  // Initialise tous les carousels Swiper
  initSwipers() {
    document.querySelectorAll('.swiper').forEach((el) => {
      new Swiper(el, {
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
  },

  // Ouvre une image en plein écran avec lightbox
  openFullscreen(imgUrl) {
    const img = new Image();
    img.src = imgUrl;
    img.style.position = 'fixed';
    img.style.top = 0;
    img.style.left = 0;
    img.style.width = '100vw';
    img.style.height = '100vh';
    img.style.objectFit = 'contain';
    img.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    img.style.zIndex = 9999;
    img.style.cursor = 'zoom-out';

    // au clique de l’image, on ferme le plein écran
    img.addEventListener('click', () => {
      document.body.removeChild(img);
    });

    document.body.appendChild(img);
  }
}
});

const vm = appli.mount('#app'); // monte l'app Vue sur l'élément id app de mon html


gsap.registerPlugin(ScrollTrigger); // appeller le scrolltrigger

document.querySelectorAll('.ligne').forEach((el) => { // pour chaque élément .ligne 
  gsap.from(el, {
    scrollTrigger: { 
      trigger: el, // quand appel cet élément
      start: "top 90%", // début
      end: "top 50%", // fin
      scrub: 0.5,
      markers: false
    },
    scaleX: 0,
    transformOrigin: "left",
    ease: "power2.out"
  });
});

//Animation de l'image de mon logo
gsap.from(".logo", {
  scale: 0,
  opacity: 0,
  duration: 1.5,
  ease: "power3.out",
  delay: 1.5 
});

