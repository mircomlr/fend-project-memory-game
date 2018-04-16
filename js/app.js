/* Variables*/
let newList = [];
let openCardsList = [];
let jsmoves = [];
let matchedGameFields = [];

/*
 * Create a list that holds all of your cards
 */
let list = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
newList = shuffle(list); /* shuffle the list... */

let deck = document.getElementsByClassName("deck")[0]
deck.innerHTML = "";

for (let j = 0; j <16 ; j++) {                                                  /* loop */
    let para = document.createElement("li");                                    /* create HTML */
    para.classList.add("card");
    let para2 = document.createElement("i");
    para2.classList.add("fa");
    para2.classList.add(newList[j]);
    para.appendChild(para2);                                                    /* add HTML to page */
    deck.appendChild(para);
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
for (let k =0; k < 16; k++){                                                    /* event listener for all cards */
let card = document.getElementsByClassName("card")[k]
card.addEventListener('click', listing);
card.addEventListener('click', showCard);
card.addEventListener('click', moveCounter);
};

function listing(event) {                                                       /* open cards */
    openCardsList.push(event.target.firstChild);
    event.target.classList.add('open');
    openCardsList[0].parentNode.removeEventListener('click', listing);
};

function showCard(event) {                                                      /* show cards */
    event.target.classList.add('show');
    openCardsList[0].parentNode.removeEventListener('click', showCard)
};

function moveCounter(event) {                                                   /* count moves */
    jsmoves.push(event.target.firstChild);
    let moves = document.getElementsByClassName("moves")[0]
    moves.innerHTML = jsmoves.length
    if (jsmoves.length == 25){                                                  /* reduce 1 star after 25 moves*/
      let stars1 = document.getElementsByClassName("star1")[0];
      stars1.remove();
    }
    else if (jsmoves.length == 50){                                             /* reduce second star after 50 moves*/
      let stars2 = document.getElementsByClassName("star2")[0];
      stars2.remove();
    };
    openCardsList[0].parentNode.removeEventListener('click', moveCounter);
    matchFunction();
};

function matchFunction() {                                                      /* the logic happens from here on (-: */
    if (openCardsList.length == 2)
    { for (let l =0; l < 16; l++){
        let card = document.getElementsByClassName("card")[l]
        card.removeEventListener('click', showCard)                             /* interrupt listening*/
        card.removeEventListener('click', listing)
        card.removeEventListener('click', moveCounter)
      };
      if (openCardsList[0].classList.value == openCardsList[1].classList.value)
      {
      openCardsList[0].parentNode.classList.remove("open");                     /* if two cards match they will get the class "match"*/
      openCardsList[0].parentNode.classList.remove("show");
      openCardsList[0].parentNode.classList.add("match");
      openCardsList[1].parentNode.classList.remove("open");
      openCardsList[1].parentNode.classList.remove("show");
      openCardsList[1].parentNode.classList.add("match");

      matchedGameFields = document.getElementsByClassName("match");
      if (matchedGameFields.length == 16) {                                     /* if all cards match game ends */
          clearInterval(myTimer);
          alert("Congratulations! Do you want to play again (Press reload button.)? The time for you winning the game is " + sec + " sec..Your star-rating is: " + document.getElementsByClassName("fa-star").length);
      }

      openCardsList = [];
      for (let m =0; m < 16; m++){
      let card = document.getElementsByClassName("card")[m]

        if (card.classList != "card match") {
        card.addEventListener('click', listing);                                /* back to listening*/
        card.addEventListener('click', showCard);
        card.addEventListener('click', moveCounter);

        };
      };
      } else if (openCardsList[0].classList.value != openCardsList[1].classList.value)
      {
          setTimeout(function()
          {
          openCardsList[0].parentNode.classList.remove("open");                 /* if two cards do not match they will be turned back again... */
          openCardsList[0].parentNode.classList.remove("show");
          openCardsList[1].parentNode.classList.remove("open");
          openCardsList[1].parentNode.classList.remove("show");
          openCardsList = [];
          for (let m =0; m < 16; m++){
          let card = document.getElementsByClassName("card")[m]

            if (card.classList != "card match") {
            card.addEventListener('click', listing);                            /* back to listening*/
            card.addEventListener('click', showCard);
            card.addEventListener('click', moveCounter);

            };
          };
        }, 1000);                                                               /*...after 1 second */
      }

    }
};                                                                              /* end of most relevant logic */

function time() {                                                               /* time logic and restart logic from here till end of code */
sec++;
document.getElementById("seconds").innerHTML=sec+" sec.";
};
let sec = 0;
let myTimer = setInterval('time()',1000);

let restarter = document.getElementsByClassName("restart")[0]
restarter.addEventListener('click', restart)

function restart(event) {
  location.reload();
};
