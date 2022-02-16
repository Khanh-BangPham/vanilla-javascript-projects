let navCurrent = document.querySelector("header .difficulty .nav-current");
let nav = document.querySelector("header .difficulty .nav");
let navItems = document.querySelectorAll("header .difficulty .nav .nav-item");
let difficulty = 1;
let header = document.querySelector("header");
let settingBtn = document.querySelector("#settings-btn");
let repeatBtn = document.querySelector("#repeat-btn");

navCurrent.addEventListener('click', () => {
    if(nav.classList.contains("active")){
        nav.classList.remove("active");
    } else {
        nav.classList.add("active");
    }
})

navItems.forEach((navItem) => {
    navItem.addEventListener('click', (e) => {
        navCurrent.innerHTML = e.target.getAttribute("data");
        if(e.target.getAttribute("data") == 'Dễ'){
            difficulty = 2;
        } else {
            if(e.target.getAttribute("data") == 'Thường'){
                difficulty = 1;
            } else difficulty = 0;
        }
        nav.classList.remove("active");
    })
})

settingBtn.addEventListener("click", () => {
    if(header.classList.contains("active")){
        header.classList.remove("active");
    } else{
        header.classList.add("active");
    }
})

repeatBtn.addEventListener("click", () => {
    gameStart(true);
})

let data = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
]

let timingElm = document.querySelector(".time-left .timing");
let scoreElm = document.querySelector(".score span");
let firstWordElm = document.querySelector(".typing-container .words #word-1");
let secondWordElm = document.querySelector(".typing-container .words #word-2");
let gamingElm = document.querySelector(".container .gaming");
let gameOverElm = document.querySelector(".container .gameOver");
let tyingInput = document.querySelector(".typing-container #typing");
let container = document.querySelector(".container");
let buttonReload = document.querySelector(".container .gameOver button");
let time;
let totalTime;
let score;
let firstWord;
let secondWord;
let maxTime = 20;
let getRandomWord = () => {
    return data[Math.floor(Math.random() * data.length)];
}

time = maxTime;
totalTime = maxTime;
score = 0;
firstWord = getRandomWord();
secondWord = getRandomWord();
firstWordElm.innerHTML = firstWord;
secondWordElm.innerHTML = secondWord;

let typingFunction = () => {
    let isSpace;
    tyingInput.addEventListener("keyup", (e) => {
       value = e.target.value;
       isSpace = value[value.length - 1] === ' ' ? true : false;
       if(isSpace) {
            e.target.value = '';
       } else {
            if(value === firstWord){
                time+=difficulty;
                totalTime+=difficulty;
                score++;
                scoreElm.innerHTML = score;
                firstWord = secondWord;
                firstWordElm.innerHTML = firstWord;
                secondWord = getRandomWord();
                secondWordElm.innerHTML = secondWord;
                e.target.value = '';
            }
       }
    })
}


let gameStart = (isRepeat) => {
    time = maxTime;
    totalTime = maxTime;
    score = 0;
    firstWord = getRandomWord();
    secondWord = getRandomWord();
    firstWordElm.innerHTML = firstWord;
    secondWordElm.innerHTML = secondWord;
    tyingInput.value = '';
    timingElm.innerHTML = time + 's';
    scoreElm.innerHTML = score;
    tyingInput.focus();
    typingFunction();
    let updateTime = () => {
        time--;
        timingElm.innerHTML = time + 's';
    
        if(time == 0) {
            clearInterval(timeInterval);
            document.querySelector(".gameOver .result .score span").innerHTML = score + '.';
            document.querySelector(".gameOver .result .totalTime span").innerHTML = totalTime + 's.';
            gamingElm.classList.remove("active");
            gameOverElm.classList.add("active");
        };
    }
    
    let timeInterval = setInterval(updateTime , 1000);
    if(isRepeat) clearInterval(timeInterval);
}
gameStart();
buttonReload.addEventListener("click", () => {
    gamingElm.classList.add("active");
    gameOverElm.classList.remove("active");
    gameStart(false);
})

