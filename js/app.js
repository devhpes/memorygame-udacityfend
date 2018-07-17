/*
 * Create a list that holds all of your cards
 */
//Declarations

//array for open cards
let openCard = [];

//array for matched cards
let matchedCards = [];

// declaring move variable
let moves = 0;

// declaring stars rating variable and assign it to 3
let starsRating = 3;

// declaring time variables
let minute = 0;
let second = 0;
let hour = 0;

//Selecting container
const container = document.querySelector('.container');

//Selecting cards
let card = document.getElementsByClassName('card');
let cards = [...card];

//Selecting deck
const deck = document.querySelector('.deck');

//Selecting moves span
const movesCounter = document.querySelector('.moves');

//Selecting timer
const timerCounter = document.querySelector('.timer');

//Selecting fontawesome star
let stars = document.querySelectorAll(".fa-star");
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Game start function
function init() {
    cards = shuffle(cards);
    for(let i = 0; i < cards.length; i++){
        deck.innerHTML = '';
        [].forEach.call(cards, function(element){
            deck.appendChild(element);
        });
        cards[i].classList.remove("show", "open", "match", "disable");
    }
}

//Calling the reset function,it reset everything when a new game is started - time, stars and moves

// Adding Event listener to all cards and specifying matching conditions
for (let i = 0; i < card.length; i++)

    cards[i].addEventListener('click', function() {

        {
            console.log('Clicked');
        }

       openCard.push(this);
        if (openCard.length === 2) {
        // Comparing the cards and adding match and disable class
            if (openCard[0].innerHTML  === openCard[1].innerHTML) {

                openCard[0].classList.add('match', 'disable');
                openCard[1].classList.add('match', 'disable');
                //Removing the show and open class
                openCard[0].classList.remove('show', 'open');
                openCard[1].classList.remove('show', 'open');

                //Pushing card to matched card variable
                matchedCards.push(openCard[0], openCard[1]);

                //reseting the openCard 
                openCard = [];

            } else {
                //
                openCard[0].classList.add('show',"unmatched",'disable');
                openCard[1].classList.add('show',"unmatched",'disable');
                setTimeout(function() {
                    openCard[0].classList.remove('open', 'show', 'disable','unmatched');
                    openCard[1].classList.remove('open', 'show', 'disable','unmatched');
                    openCard = [];

                }, 600);

            }
            

        } else {
            openCard[0].classList.add('open', 'show', 'disable');
            openCard[1].classList.add('open', 'show', 'disable');
            openCard.push(this);
        }

    });

//Move function - for adding moves when user clicks on cards
function addMoves() {
    moves++;
    movesCounter.innerHTML = moves;
    rating();
    //Starting timer when user makes its first click on the cards
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
}

//Timer function
let timerInterval; 
function startTimer() {
    timerInterval = setInterval(function() {
        //Inner HTML of timer
       timerCounter.innerHTML = minute + " Minute " + second + " Second";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);

}

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
