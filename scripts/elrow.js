/******************************************************************************/
   /* menu openen bron: docent link: https://codepen.io/shooft/pen/GRxXboQ*/
/****************************************************************************/
var openButton = document.querySelector("header > button");

openButton.addEventListener("click", menuOpenen);

function menuOpenen() {
	var deNav = document.querySelector("header > nav");
	
	deNav.classList.add("open"); /* na het klikken wordt de class aan de HTML toegevoegd */
}

/*******************************************************************************/
   /* menu sluiten bron: docent link: https://codepen.io/shooft/pen/GRxXboQ*/
/*****************************************************************************/
var sluitButton = document.querySelector("header nav button");

sluitButton.addEventListener("click", menuSluiten);

function menuSluiten() {
	var deNav = document.querySelector("header > nav");
	
	deNav.classList.remove("open"); /* na het klikken wordt de class in de HTML verwijderd */
}





/***************************************************************************************/
   /* filters bron: docent link:https://codepen.io/shooft/pen/gOzGoww?editors=1010 */
/*************************************************************************************/
var eersteButton = document.querySelector("div nav button");
var eersteSubmenu = document.querySelector("div nav ul ul");

eersteButton.addEventListener("click", toggleEersteMenu);

function toggleEersteMenu() {
	eersteSubmenu.classList.toggle("open"); 
}




/*******************************************************************************/
  /* de carrousel bron: docent link: https://codepen.io/shooft/pen/oNzGJMM */
/*****************************************************************************/
function createCaroCarrousel(carrouselID) {
	let carrousel = document.querySelector("#"+carrouselID);
	let carrouselElementsContainer = carrousel.querySelector(":scope > ul");
	let carrouselElements = carrouselElementsContainer.querySelectorAll("li");
    let bolletjes = carrousel.querySelectorAll(":scope > nav a");
    let linkButtons = carrousel.querySelectorAll(":scope > a");
  
    let autoScrollInterval = 4000;
    let autoScrollTimer;
  
// de bolletjes activeren
  function iniBolletjes() {
    for (bolletje of bolletjes) {
			bolletje.addEventListener("click", function(e){ // elk bolletje laten luisteren naar kliks

				e.preventDefault(); // als er geklikt wordt - de default-actie (de link volgen) niet uitvoeren

				let newElement = carrousel.querySelector(this.hash); // het nieuwe element opzoeken
        
        scrollToElement(newElement); // dan naar het element met ID scrollen
      });
    }
}

// auto scroll starten
	function startAutoScroll() {
    
    carrousel.classList.add("autoScrolling"); // de class "autoScrolling" toevoegen aan de carrousel
    
    autoScrollTimer = setInterval(function(){ // een timer aanzetten
    
      goToElement("next"); // als de timer afgaat naar het volgende element gaan
    }, autoScrollInterval);
}

// auto scroll stoppen
  function stopAutoScroll() {
    
    carrousel.classList.remove("autoScrolling"); // de class "autoScrolling" verwijderen van de carrousel
    
    clearInterval(autoScrollTimer); // de timer stopzetten
}

// auto scroll initieren en activeren
  function iniAutoScroll() {
    
    let playButton = carrousel.querySelector(":scope > button"); // de play button naar kliks laten luisteren
    playButton.addEventListener("click", function() {
      
      if(carrousel.classList.contains("autoScrolling")) { // als de carrousel de class "autoScrolling" heeft dan stoppen
        stopAutoScroll();
      }
     
      else {  // anders starten
        startAutoScroll();
      }
    });
		
// auto scroll initieel starten
		startAutoScroll();
}
  
// het eerste element en bolletje actief maaken
  function iniStartPosition() {
    
    carrouselElements[0].classList.add("current"); // eerste element current maken
		bolletjes[0].classList.add("current"); // eerste bolletje current maken
	
    carrouselElementsContainer.scrollLeft = 0; // aan het begin van de container starten
}

// naar volgende/vorige element //
  function goToElement(direction) {
		
		let currentElement = carrousel.querySelector(":scope > ul > .current"); // het huidige current element opzoeken

		let newElement;
		if (direction == "previous") { 
			newElement = currentElement.previousElementSibling; // het nieuwe element is het vorige broertje/zusje

			if (!newElement) { // checken of nieuwe element bestaat - anders naar laatste
				newElement = carrousel.querySelector(":scope > ul > li:last-of-type");
			}
		} else {

			newElement = currentElement.nextElementSibling; // het nieuwe element is het volgende broertje/zusje
			
			if (!newElement) { // checken of nieuwe element bestaat - anders naar eerste
				newElement = carrousel.querySelector(":scope > ul > li:first-of-type");
			}
		}

		scrollToElement(newElement); // naar het nieuwe element scrollen
}

// scroll to new element //
  function scrollToElement(newElement) { // de carrousel naar het nieuwe element scrollen
    newElement.scrollIntoView({
      behavior: "smooth",
      inline: "center"
    });

    updateCurrentElement(newElement); // nieuwe element current element maken
    
    updateBolletjes(newElement);  // de bolletjes updaten
}
  
// update current element //
	function updateCurrentElement(newElement) {
		let currentElement = carrousel.querySelector(":scope > ul > .current"); // het huidige current element opzoeken
		
		currentElement.classList.remove("current"); // de class current verwijderen

		newElement.classList.add("current"); // aan nieuwe element de class current toevoegen
}

// update bolletjes //
  function updateBolletjes(newElement){
		let currentBolletje = carrousel.querySelector(":scope > nav .current"); // het huidige current bolletje opzoeken
		
		currentBolletje.classList.remove("current"); // de class current verwijderen
		
		let newBolletje = carrousel.querySelector("a[href='#"+newElement.id+"']"); // het nieuwe bolletje opzoeken
		
		newBolletje.classList.add("current"); // de class current toevoegen
}

// de bolletjes activeren
  iniBolletjes(); // de carrousel bij het begin starten

  iniStartPosition(); 

  //iniAutoScroll(); // auto scroll activeren 
}

// nadat de pagina geladen is, de carrousels activeren
   (function() {
	    createCaroCarrousel("bolletjesAndAutoScroll"); // hier de id gebruiken van de section in de html
})();