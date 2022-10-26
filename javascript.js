// JavaScript File

console.log("JS connected...");

// A few constants
const EASY = "EASY";
const HARD = "HARD";

//grab reference to necessary HTML elements
var squares = document.querySelectorAll(".square");
var rgbGuess = document.querySelector("#rgbGuess");
var gameMessage = document.querySelector("#message");
var btnNew = document.querySelector("#btnNew");
var btnEasy = document.querySelector("#btnEasy");
var btnHard = document.querySelector("#btnHard");

//Misc setup
var difficultyLevel = HARD;
var magicColor = "";
var numSquares = 0;


initGame();

function initGame(){
    
    btnHard.classList.toggle("selected");
    resetGame(difficultyLevel);
   
    // Setup button event listeners
    btnNew.addEventListener("click",function(){
         resetGame(difficultyLevel);
    });
    
    btnEasy.addEventListener("click",function(){
        difficultyLevel = EASY;
        this.classList.add("selected");
        btnHard.classList.remove("selected");
        resetGame(difficultyLevel);
    });
    
    btnHard.addEventListener("click",function(){
        difficultyLevel = HARD;
        resetGame(difficultyLevel);
        this.classList.add("selected");
        btnEasy.classList.remove("selected");
    });

}

function resetGame(difficultyLevel) {

    resetSquares();

    // Good ol Ternary Operator
    numSquares = difficultyLevel === HARD ? 6 : 3;    
    
    rgbGuess.style.color = "";
    gameMessage.textContent = "Choose a Color";
    btnNew.textContent = "New Colors";
    
    initSquares(numSquares, squares, "RESET");

    /*Determine what the magic number is so we can determine 
    the magic color (the winning choice...)*/
    var magicNumber = getRandomIntInclusive(1, numSquares);

    magicColor = squares[magicNumber - 1].style.backgroundColor;

    rgbGuess.textContent = magicColor;

}

function resetSquares() {

    for (var i = 0; i < squares.length; i++) {
        squares[i].removeEventListener("click", guessColor);
        squares[i].style.visibility = "visible";
        squares[i].style.display = "none";
    }
}

function initSquares(numSquares, squareList, mode) {

    for (var i = 0; i < squareList.length && i < numSquares; i++) {

        if (mode === "RESET") {
            var rcolor = genRandomRGBColor();
            squareList[i].addEventListener("click", guessColor);
        }
        else { //GAMEOVER
            rcolor = magicColor;
        }

        squareList[i].style.backgroundColor = rcolor;
        squareList[i].style.display = "block";

        //-debug
        //squareList[i].textContent = rcolor;
        //console.log(squareList[i].style.backgroundColor);

    }
}

function guessColor() {
    var colorChoice = this.style.backgroundColor;

    //-debug
    console.log("My guess is..." + colorChoice);

    if (colorChoice === magicColor) {
        console.log("you won the game!!!!");
       
        resetSquares();
        initSquares(numSquares, squares, "GAMEOVER");
       
        rgbGuess.style.color = magicColor;
        gameMessage.textContent = "Correct!";
        btnNew.textContent = "Play Again?";
    }
    else {
        console.log("Bad choice :(");
        //this.style.display = "none";
        this.style.visibility = "hidden";
        gameMessage.textContent = "Wrong!";

        //could not get this to work.
            //console.log(this.classList);
            //this.classList.add("squareReset");

    }

}

function genRandomRGBColor() {
    // return Math.floor(Math.random() * (max - min + 1)) + min;

    var red = getRandomIntInclusive(0, 255).toString();
    var green = getRandomIntInclusive(0, 255).toString();
    var blue = getRandomIntInclusive(0, 255).toString();

    return "rgb(" + red + "," + green + "," + blue + ")";

}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}