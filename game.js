const buttons = document.querySelectorAll('.btn');
const h1 = document.getElementById('level-title');
const sounds = ['green', 'red', 'yellow', 'blue'];

let levels = 0;
let gamePattern = [];
let ind = 0;
let gameOver = false;
let btnClicked = '';
let randomNum = 0;
let start = 0;

function addAnimation(toWho) {
    if (toWho) {
        buttons[randomNum].classList.add('pressed');
        setTimeout(() => {
            buttons[randomNum].classList.remove('pressed');
        },100)
        let audio = new Audio(`sounds/${sounds[randomNum]}.mp3`);
        audio.play();
    } else {
        buttons[sounds.indexOf(btnClicked)].classList.add('clicked');
        audio = new Audio(`sounds/${sounds[sounds.indexOf(btnClicked)]}.mp3`);
        setTimeout(() => {
            buttons[sounds.indexOf(btnClicked)].classList.remove('clicked');
        },100)
        audio.play();
    }
}

function generate() {
    randomNum = Math.floor(Math.random() * 4);
    gamePattern.push(randomNum);
    h1.textContent = `Level ${levels + 1}`;
    addAnimation(true);
    levels++;
    ind = 0;
}

function compare() {    

    if (ind < gamePattern.length) {
        if (gamePattern[ind] !== sounds.indexOf(btnClicked)) {
            h1.textContent = 'Game Over, Press Any Key to Restart';
            document.querySelector('body').classList.add('game-over');
            setTimeout(() => {
                document.querySelector('body').classList.remove('game-over');
            },100);
            audio = new Audio('sounds/wrong.mp3');
            audio.play();
            ind = 0;
            gamePattern = [];
            gameOver = true;
            levels = 0;
            return;
        }
        ind++;
        addAnimation(false);
        if (ind === gamePattern.length) {
            setTimeout(() => {
                generate();
            }, 800);
        }
    }
}

document.addEventListener('keypress', (e) => {
    if (e.key === 'a' && start === 0) {
        generate();
        start++;
    }
});

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        btnClicked = e.target.classList[1];
        compare();
    })
})

window.addEventListener('keypress', () => {
    if (gameOver === true) {
        generate();
        gameOver = false;
    }
    
})


// function isClicked(btn) {
//     for (let i = 0; i < newArr.length; i++) {
//         if (newArr[i] === clickedBtn[i]) {
//             generate();
//         }
//     }
//     if (sounds[randomNum] === btn) {
//         h1.textContent = 'Level 2';
//         const randomNum = Math.floor(Math.random() * 4);
//         buttons[randomNum].classList.add('pressed');
//         audio = new Audio(`sounds/${sounds[randomNum]}.mp3`);
//         setTimeout(() => {
//             buttons[randomNum].classList.remove('pressed');
//         },100)
//         audio.play();
//     } else {
//         h1.textContent = 'Game Over, Press Any Key to Restart';
//         document.querySelector('body').classList.add('game-over');
//         setTimeout(() => {
//             document.querySelector('body').classList.remove('game-over');
//         },100)
//     }
// }

// const indeX = sounds.indexOf(btnClicked);
// clickedBtn.push(indeX);
// isClicked(btnClicked);