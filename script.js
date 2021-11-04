startGame();

function startGame() {
    let numberOfCards;

    const validNumbersOfCards = [4, 6, 8, 10, 12, 14];

    while (!validNumbersOfCards.includes(numberOfCards)) {
        numberOfCards = parseInt(prompt('insert a valid number of cards'))
    }

    const parrotsList = ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot']

    parrotsList.sort(() => Math.random() - 0.5);

    let inGameParrots = parrotsList.slice(0, (numberOfCards/2));

    inGameParrots.forEach(parrot => inGameParrots.push(parrot));

    inGameParrots.sort(() => Math.random() - 0.5)

    const main = document.querySelector('main');

    inGameParrots.forEach(parrot => {
        main.innerHTML += `
        <div class="card" onclick="flipCard(this)">
            <div class="front-face face">
                <img src="/assets/front.png" alt="front-face">
            </div>
            <div class="back-face face">
            <img src="/assets/${parrot}.gif" alt="${parrot}">
            </div>
        </div>
        `
    })

}

function flipCard(card) {
    card.classList.toggle('flipped')
}