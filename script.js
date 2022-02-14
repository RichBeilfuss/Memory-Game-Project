const gameContainer = document.getElementById("game");
let cantClick = false;
let flippedCards = 0;
let card1 = null;
let card2 = null;
let score = 0
let lowScore = localStorage.getItem("low-score");

if (lowScore) {
  document.getElementById("best-score").innerText = `Best Score: ${lowScore}`;
}

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
function setScore(newScore) {
  score = newScore;
  document.getElementById("current-score").innerText = `Current score: ${score}`;
}
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (cantClick) return;
  if (event.target.classList.contains('flip')) return;

  let selected = event.target;
  selected.style.backgroundColor = selected.classList[0];


  if(!card1 || !card2) {
    selected.classList.add('flip');
    setScore(score + 1);
    card1 = card1 || selected;
    card2 = selected === card1 ? null : selected;
  }

  if (card1 && card2){
    cantClick = true;
    let storage1 = card1.className;
    let storage2 = card2.className;

    if(storage1 === storage2){
      flippedCards += 2;
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);
      card1 = null;
      card2 = null;
      cantClick = false;
    } else {
      setTimeout(function(){
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        card1 = null;
        card2 = null;
        cantClick = false;
      }, 1000);
    };
  };
  if (flippedCards === COLORS.length) {
    let lowScore = +localStorage.getItem("low-score") || Infinity;
    if (score < lowScore) {
      alert(`NEW BEST SCORE!! Score: ${score}`);
      localStorage.setItem("low-score", score);
    } else {
      alert(`Game Over! Score: ${score}`);
    }
    window.location.reload();

  }
};


// when the DOM loads
createDivsForColors(shuffledColors);
