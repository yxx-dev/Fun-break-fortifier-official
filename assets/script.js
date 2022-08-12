//let superheroAPILink = "https://superheroapi.com/api/10227036229149593/character-id/biography";
//get document elements
let superheroTitle = document.getElementById('superhero-title');
let superheroImg = document.getElementById('superhero-image');
let superheroArticle = document.getElementById('superhero-article');
let giphyContainer = document.getElementById('giphy-container');
let boosterButton = document.getElementById('booster-button');
let giphyImg = document.querySelector('#giphy00');
//good, neutral, bad buttons
let stateButtons = document.querySelector('.button-mood-state')

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
let giphyAPILink;
let giphyAll;
//timer parameters
let timeLeft;
let currentTimeLeft;
let timeDisplay = document.querySelector('#timer-fortifier');
//current state of mood
let currentState;

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

//main actions
document.addEventListener('load',resetTimer);
stateButtons.addEventListener('click',buttonStateAction);
//show giphy only when booster button is clicked
boosterButton.addEventListener('click',printGiphy);

//load from local storage
$('#load-last').on('click',loadFromLast);

function loadFromLast () {
    countDown();
    superheroSelected = localStorage.getItem('last-superhero');
    console.log(superheroSelected,superheroAll);
    printSuperhero();
    currentState = superheroSelectedDetails.biography.alignment;
    console.log(currentState, superheroSelectedDetails);
    
    //show booster button only when state of mood is entered
    boosterButton.style.display = 'block'
}

//Mood state button function
function buttonStateAction (event) {
    //console.log(event.target);
    currentState = event.target.dataset.state;
    console.log(currentState);
    countDown();
    selectSuperhero(currentState);
    printSuperhero();
    //show booster button only when state of mood is entered
    boosterButton.style.display = 'block'
    
}



//reset timer
function resetTimer(){
    timeLeft = 12;
    clearInterval(currentTimeLeft);
}
//countdown function
function countDown() {
    resetTimer();
    currentTimeLeft = setInterval(function(){
        timeLeft -= 1;
        timeDisplay.textContent=`Stress-free timer: ${timeLeft}s`;
        if (timeLeft === 0) {
            resetTimer();
        }
    },1000);
}
//print superhero
function selectSuperhero (alignment) {
    let superheroAlignmentGood = [];
    let superheroAlignmentNeutral = [];
    let superheroAlignmentBad = [];
    console.log(alignment);

    //reset giphy
    giphyImg.setAttribute('src', '');
    giphyImg.setAttribute('alt', '');

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
    
    //save to local storage for re-use
    localStorage.setItem("last-superhero", superheroSelected);
};

function printSuperhero () {
    //get details of the selected superhero
    console.log(superheroAll.length);
    console.log(superheroAll[0].id);
    console.log(superheroSelected);
    for (i=0; i<superheroAll.length; i++) {
        if (superheroAll[i].id == superheroSelected) {
            superheroSelectedDetails = superheroAll[i];
            console.log(superheroSelectedDetails);
            break;
        }
    }
    console.log(superheroSelectedDetails);
    console.log(superheroSelectedDetails.biography.alignment);

    //print superhero detail
    superheroTitle.textContent = superheroSelectedDetails.name;
    superheroImg.setAttribute('src', superheroSelectedDetails.images.lg);
    superheroImg.setAttribute('alt', `and image of ${superheroSelectedDetails.name}`);

    //TO DO print out article properly
    superheroArticle.textContent = superheroSelectedDetails;
}

function printGiphy() {
    giphyAll=[];
    giphySelected='';
    //$(giphyContainer).children().remove();
    giphyAPILink = `https://api.giphy.com/v1/gifs/search?api_key=A2TgkGiLoAQZ9pidarrbGGfT3MCAv5xy&q=${currentState}&limit=10&offset=0&rating=${giphyRating}&lang=en`;
    //GET giphy/search API
    fetch(giphyAPILink)
        .then(function(response){
            return response.json();
        })
        .then (function(data){
            giphyAll=data.data;
            console.log(giphyAll);
            console.log(giphyAll.length);
            giphySelected = giphyAll[Math.floor(Math.random() * giphyAll.length)];

            giphyImg.setAttribute('src', giphySelected.images.downsized_large.url);
            giphyImg.setAttribute('alt', giphySelected.title);
        })
    
}
