
console.log("loaded");

$(document).ready(function() {
  anime({
    targets: '#animatedText',
    translateY: [-50, 0], // Déplacer de -50px à 0px sur l'axe Y
    opacity: [0, 1], // Passer de l'opacité 0 à l'opacité 1
    duration: 3000, // Durée de l'animation en millisecondes
    easing: 'easeOutQuad' // Type d'interpolation
});
});
