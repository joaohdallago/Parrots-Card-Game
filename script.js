startGame();

function startGame() {
    let numberOfCards;

    const validNumbersOfCards = [4, 6, 8, 10, 12, 14];

    while (!validNumbersOfCards.includes(numberOfCards)) {
        numberOfCards = parseInt(prompt('insira o numero de cartas'))
    }

    const main = document.querySelector('main');

    for (let i = 0; i < numberOfCards; i++) {
        main.innerHTML += `
        <div class="card" onclick="flipCard(this)">
            <div class="front-face face">
                <img src="/assets/front.png" alt="front-face">
            </div>
            <div class="back-face face">
                Verso
            </div>
        </div>
        `
    }
}

function flipCard(card) {
    card.classList.toggle('flipped')
}