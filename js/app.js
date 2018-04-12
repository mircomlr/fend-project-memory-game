/* Variables*/
let newList = [];
let openCardsList = [];
let jsmoves = [];
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
newList = shuffle(list);

let deck = document.getElementsByClassName("deck")[0]
deck.innerHTML = "";

for (let j = 0; j <16 ; j++) {
    let para = document.createElement("li");
    para.classList.add("card");
    let para2 = document.createElement("i");
    para2.classList.add("fa");
    para2.classList.add(newList[j]);
    para.appendChild(para2);
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
for (let k =0; k < 16; k++){
let card = document.getElementsByClassName("card")[k]
card.addEventListener('click', showCard)
card.addEventListener('click', listing)
card.addEventListener('click', moveCounter)
card.addEventListener('click', gameCounter)
};

function showCard(event) {
    event.target.classList.add('show');
};

function listing(event) {
    openCardsList.push(event.target.firstChild);
    event.target.classList.add('open');
    clickTime = new Date().getTime();
    matchFunction();
};

function matchFunction() {
    if (openCardsList.length == 2)
    { if (openCardsList[0].classList.value == openCardsList[1].classList.value)
      {
      openCardsList[0].parentNode.classList.remove("open");
      openCardsList[0].parentNode.classList.remove("show");
      openCardsList[0].parentNode.classList.add("match");
      openCardsList[1].parentNode.classList.remove("open");
      openCardsList[1].parentNode.classList.remove("show");
      openCardsList[1].parentNode.classList.add("match");
      openCardsList[0].parentNode.removeEventListener('click', showCard)
      openCardsList[1].parentNode.removeEventListener('click', showCard)
      openCardsList[0].parentNode.removeEventListener('click', listing)
      openCardsList[1].parentNode.removeEventListener('click', listing)
      openCardsList = [];
      } else if (openCardsList[0].classList.value != openCardsList[1].classList.value)
      {
          setTimeout(function()
          {
          openCardsList[0].parentNode.classList.remove("open");
          openCardsList[0].parentNode.classList.remove("show");
          openCardsList[1].parentNode.classList.remove("open");
          openCardsList[1].parentNode.classList.remove("show");
          openCardsList = [];
          }, 1000);
      }
    }
};

function moveCounter(event) {
    jsmoves.push(event.target.firstChild);
    let moves = document.getElementsByClassName("moves")[0]
    moves.innerHTML = jsmoves.length
    if (jsmoves.length == 25){
      let stars1 = document.getElementsByClassName("star1")[0];
      stars1.remove();
    }
    else if (jsmoves.length == 50){
      let stars2 = document.getElementsByClassName("star2")[0];
      stars2.remove();
    };
};

function gameCounter(event) {
    let matchedGameFields = document.getElementsByClassName("match")
    if (matchedGameFields.length == 16) {
        alert("Congratulations! Do you want to play again (Press reload button.)? The time since you startet the game is shown upon the card-game (behind this popup), the stars (max 3) are shown there as well. You finished the game in " + jsmoves.length + " Moves!");
    }
};

/* Time-Logic copied from stackoverflow */
let sec = 0;
    function pad ( val ) { return val > 9 ? val : "0" + val; }
    setInterval( function(){
        document.getElementById("seconds").innerHTML=pad(++sec%60);
        document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    }, 1000);

let restarter = document.getElementsByClassName("restart")[0]
restarter.addEventListener('click', restart)

function restart(event) {
  location.reload();
};
