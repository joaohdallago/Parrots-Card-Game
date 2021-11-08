let numberOfCards;
let timer = 0;
let setTimerInterval;

function setTimer() {
    timer ++;

    const timerSpan = document.querySelector('.timer');
    timerSpan.innerHTML = timer + 's';
}

function startGame() {
    const validNumbersOfCards = [4, 6, 8, 10, 12, 14];

    while (!validNumbersOfCards.includes(numberOfCards)) {
        numberOfCards = parseInt(prompt('insira um número par de cartas de 4 a 14'))
    }

    setTimerInterval = setInterval(setTimer, 1000);

    const parrotsList = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot']

    parrotsList.sort(() => Math.random() - 0.5);

    let inGameParrots = parrotsList.slice(0, (numberOfCards / 2));

    inGameParrots.forEach(parrot => inGameParrots.push(parrot));

    inGameParrots.sort(() => Math.random() - 0.5)

    const main = document.querySelector('main');

    inGameParrots.forEach(parrot => {
        main.innerHTML += `
        <div class="card" onclick="flipCard(this)" data-identifier="card">
            <div class="front-face face" data-identifier="front-face">
                <img src="/assets/front.png" alt="front-face">
            </div>
            <div class="back-face face" data-identifier="back-face">
                <img src="/assets/${parrot}.gif" alt="${parrot}">
            </div>
        </div>
        `
    })
};

startGame();
let firstCardSelected;
let secondCardSelected;

let movementsCounter = 0;


function addMovement() {
    movementsCounter ++;
}

function flipCard(card) {
    addMovement()
    
    card.classList.add('flipped')

    if (firstCardSelected === undefined) {
        firstCardSelected = card
    } else {
        secondCardSelected = card;
    }

    compareCards();
}

function compareCards() {
    function unflipSelectedCards() {
        firstCardSelected.classList.remove('flipped');
        secondCardSelected.classList.remove('flipped');

        firstCardSelected = undefined;
        secondCardSelected = undefined;

        toggleCardSelectionBlock()
    }

    function toggleCardSelectionBlock() {
        if (flipCard !== null) {
            flipCard = null;
        } else {
            flipCard = (card) => {
                addMovement()

                card.classList.toggle('flipped')
            
                if (firstCardSelected === undefined) {
                    firstCardSelected = card;
                } else {
                    secondCardSelected = card;
                }
    
                compareCards();
            }
        }
    }

    function testWin() {
        const flippedCards = document.querySelectorAll('.flipped');

        function winCase() {
            alert(`Você ganhou em ${movementsCounter} jogadas e ${timer} segundos!`);

            const restartPrompt = prompt('Gostaria de reiniciar a partida?');
            if (restartPrompt.toLowerCase() === 'sim') {
                restartGame()
            }
        }

        if (flippedCards.length === numberOfCards) {
            clearInterval(setTimerInterval);
            setTimeout(winCase, 1000);
        }
    }

    if (firstCardSelected.innerHTML !== secondCardSelected.innerHTML && secondCardSelected !== undefined) {
        toggleCardSelectionBlock()
        setTimeout(unflipSelectedCards, 1000);

    } else if(firstCardSelected !== secondCardSelected && firstCardSelected.innerHTML === secondCardSelected.innerHTML){
        firstCardSelected.removeAttribute('onclick');
        secondCardSelected.removeAttribute('onclick');

        firstCardSelected = undefined;
        secondCardSelected = undefined;

        testWin()
    }
}

function restartGame() {
    const main = document.querySelector('main');
    main.innerHTML = '';
    numberOfCards = 0;
    movementsCounter = 0;
    timer = 0;

    startGame()
}