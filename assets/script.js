//initiate Foundation
$(document).foundation();

//get document elements
let superheroTitle = document.getElementById('superhero-title');
let superheroImg = document.getElementById('superhero-image');
let superheroArticle = document.getElementById('superhero-article');
let giphyContainer = document.getElementById('giphy-container');
let boosterButton = document.getElementById('booster-button');
let giphyImg = document.querySelector('#giphy00');
//good, neutral, bad buttons
let stateButtons = document.querySelector('.button-mood-state');

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
document.addEventListener('load', loadPage());


stateButtons.addEventListener('click',buttonStateAction);
//show giphy only when booster button is clicked
boosterButton.addEventListener('click',printGiphy);

function loadPage () {
    resetTimer ();
    loadFromLast ();
};

//temporary test function
//$('.test-btn1').on('click',loadFromLast);

function loadFromLast () {
    
    //load from local storage
    superheroSelectedDetails = JSON.parse(localStorage.getItem('last-superhero'));
    console.log(superheroSelectedDetails);
    if (superheroSelectedDetails) {
        console.log("not null");
        //superheroSelected = superheroSelectedDetails.id;
        printSuperhero();

        //clear local storage
        localStorage.clear('last-superhero');

        currentState = superheroSelectedDetails.biography.alignment;
        console.log(currentState, superheroSelectedDetails);
    
        //show booster button only when state of mood is entered
        boosterButton.style.display = 'block';
        countDown();
    }
}

//Mood state button function
function buttonStateAction (event) {
    localStorage.clear('last-superhero');
    //console.log(event.target);
    currentState = event.target.dataset.state;
    console.log(currentState);
    countDown();
    selectSuperhero(currentState);
    printSuperhero();
    //show booster button only when state of mood is entered
    boosterButton.style.display = 'block';
    
}



//reset timer
function resetTimer(){
    timeLeft = 12;
    clearInterval(currentTimeLeft);
    console.log("timer reset");
}
//countdown function
function countDown() {
    resetTimer();
    currentTimeLeft = setInterval(function(){
        timeLeft -= 1;
        timeDisplay.textContent=`Stress-free timer: ${timeLeft}s`;
        if (timeLeft === 0) {
            //open modal window
            $('#modal1').foundation('open');
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
    console.log(superheroSelectedDetails)   
    //save to local storage for re-use
    localStorage.setItem("last-superhero", JSON.stringify(superheroSelectedDetails))    
    console.log(superheroSelectedDetails.biography.alignment);
};

function printSuperhero () {

    //print superhero detail
    superheroTitle.textContent = superheroSelectedDetails.name;
    superheroImg.setAttribute('src', superheroSelectedDetails.images.md);
    superheroImg.setAttribute('alt', `and image of ${superheroSelectedDetails.name}`);

    //TO DO print out article properly
    //superheroArticle.textContent = superheroSelectedDetails;
    //console.log(JSON.stringify(superheroSelectedDetails.powerstats));

        //console.log("power: " + superheroSelectedDetails.powerstats.power + "/100");
        //console.log("combat: " + superheroSelectedDetails.powerstats.combat + "/100");
        //console.log("durability: " + superheroSelectedDetails.powerstats.durability + "/100");
        //console.log("intelligence: " + superheroSelectedDetails.powerstats.intelligence + "/100");
        //console.log("speed: " + superheroSelectedDetails.powerstats.speed + "/100");
        //console.log("strength: " + superheroSelectedDetails.powerstats.strength + "/100");
        //for (var i = 0; i < 6; i++) {
        $(superheroArticle).children().remove();
            let liElm1 = document.createElement('li');
            liElm1.textContent = "Power: " + superheroSelectedDetails.powerstats.power + "/100";
            superheroArticle.appendChild(liElm1);
            let liElm2 = document.createElement('li');
            liElm2.textContent = "Combat: " + superheroSelectedDetails.powerstats.combat + "/100";
            superheroArticle.appendChild(liElm2);
            let liElm3 = document.createElement('li');
            liElm3.textContent = "Durability: " + superheroSelectedDetails.powerstats.durability + "/100";
            superheroArticle.appendChild(liElm3);
            let liElm4 = document.createElement('li');
            liElm4.textContent = "Intelligence: " + superheroSelectedDetails.powerstats.intelligence + "/100";
            superheroArticle.appendChild(liElm4);
            let liElm5 = document.createElement('li');
            liElm5.textContent = "Speed: " + superheroSelectedDetails.powerstats.speed + "/100";
            superheroArticle.appendChild(liElm5);
            let liElm6 = document.createElement('li');
            liElm6.textContent = "Strength: " + superheroSelectedDetails.powerstats.strength + "/100";
            superheroArticle.appendChild(liElm6);
            }
        //}
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
