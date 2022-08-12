//let superheroAPILink = "https://superheroapi.com/api/10227036229149593/character-id/biography";
//console.log("script.js working")

//superhero API getting all superheros
let superheroAPILink = 'https://akabab.github.io/superhero-api/api/all.json';
let superheroAll;
let superheroAlginment;
let superheroSelected;
let superheroSelectedDetails;
//giphy API
let giphySearch = 'good';
//placeholder function for parental control
let giphyRating = 'g'; //g, pg, pg-13, r
let giphyAPILink = `https://api.giphy.com/v1/gifs/search?api_key=A2TgkGiLoAQZ9pidarrbGGfT3MCAv5xy&q=${giphySearch}&limit=5&offset=0&rating=${giphyRating}&lang=en`;
let giphyEl;
//timer parameters
let timeLeft;
let currentTimeLeft;
let timeDisplay = document.querySelector('#timer-fortifier');

//good, neutral, bad buttons
let stateButtons = document.querySelector('.button-mood-state')

//GET superhero API data
fetch(superheroAPILink)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        //console.log(data);
        //console.log(data.length);
        superheroAll = data;
        //console.log(data[0].biography.alignment);
    })

//GET giphy/search API
fetch(giphyAPILink)
    .then(function(response){
    return response.json();
    })
    .then (function(data){
        console.log(data);
    })


//main actions
document.addEventListener('load',resetTimer);
stateButtons.addEventListener('click',buttonStateAction);




//Mood state button function
function buttonStateAction (event) {
    //console.log(event.target);
    console.log(event.target.dataset.state);
    countDown();
    printSuperhero(event.target.dataset.state);
}

//reset timer
function resetTimer(){
    timeLeft = 10;
    clearInterval(currentTimeLeft);
}
//countdown function
function countDown() {
    resetTimer();
    currentTimeLeft = setInterval(function(){
        timeLeft -= 1;
        timeDisplay.textContent=`${timeLeft}s`;
        if (timeLeft === 0) {
            resetTimer();
        }
    },1000);
}
//print superhero
function printSuperhero (alignment) {
    let superheroAlignmentGood = [];
    let superheroAlignmentNeutral = [];
    let superheroAlignmentBad = [];
    console.log(alignment);

    //get all good, neutral, bad superheros
    for (i=0; i<superheroAll.length; i++) {
        if (superheroAll[i].biography.alignment === 'good') {
            superheroAlignmentGood.push(superheroAll[i].id);
        } else if (superheroAll[i].biography.alignment === 'neutral') {
            superheroAlignmentNeutral.push(superheroAll[i].id);
        } else if (superheroAll[i].biography.alignment === 'bad') {
            superheroAlignmentBad.push(superheroAll[i].id);
        } //else console.log(superheroAll[i].biography.alignment)
    }
    console.log(superheroAlignmentGood.length, superheroAlignmentNeutral.length,superheroAlignmentBad.length);
    console.log(superheroAll.length);

    //randomly select superhero based on alignment
    if (alignment === 'good') {
        superheroSelected = superheroAlignmentGood[Math.floor(Math.random() * superheroAlignmentGood.length)];
    } if (alignment === 'neutral') {
        superheroSelected = superheroAlignmentNeutral[Math.floor(Math.random() * superheroAlignmentNeutral.length)];
    } if (alignment === 'bad') {
        superheroSelected = superheroAlignmentBad[Math.floor(Math.random() * superheroAlignmentBad.length)];
    }
    console.log(superheroSelected);
    //superheroAll = superheroAll[Math.floor(Math.random() * superheroAll.length)];
    
    //get details of the selected superhero
    for (i=0; i<superheroAll.length; i++) {
        if (superheroAll[i].id === superheroSelected) {
            superheroSelectedDetails = superheroAll[i];
            console.log(superheroSelectedDetails);
            console.log(superheroSelectedDetails.biography.alignment);
            break;
        }
    }

    //print superhero detail
    
};
