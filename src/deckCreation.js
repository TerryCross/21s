

const ranks = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, Jack: 10, Queen: 10, King: 10, Ace: 11 };
const suits = { 0: "Spades", 1: "Hearts", 2: "Clubs", 3: "Diamonds" };

Object.freeze(ranks, suits);

function generateDeck() {
    var deck = [];
    for(let i=0; i<4; i++) {
        let suit = suits[i];
        for (let rankName in ranks) {
            deck.push({ rankName, suit});
        }
    }
    return deck;
}

function shuffle(deck) {
    let nswaps = 52, nShuffles = 6;
    while(nShuffles--){
        while(nswaps--) {
            let left = Math.floor(Math.random()*26);
            let right = Math.floor(26 + Math.random()*26);
            const tmp = deck[left];
            deck[left] = deck[right];
            deck[right] = tmp;
        }
        nswaps = 52;
    }
    return deck;
}

export { generateDeck, shuffle, ranks }
