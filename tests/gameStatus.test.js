

import { gameStatus } from '../src/gameStatus.js'
import { ranks } from '../src/deckCreation.js'

test('Early status check has no winner yet.', () => {
    var statusObj = gameStatus(dealersHand, playersHand);
    expect( statusObj.winner ).toBe(null);
});

test('Check that dealer stops at 17.', () => {
    var dh = [...dealersHand];
    dh[1].rankName = "7";
    var statusObj = gameStatus(dh, playersHand);
    expect( statusObj.winner ).toBe("player");
    expect( statusObj.dealerBust ).toBeFalsy();
});

test('Check that winner is closest to 21.', () => {
    // var dh = [...dealersHand];   // not deep, even with Object.freeze()
    // dh[1] = { rankName: "Ace" };

    var dh = JSON.parse(JSON.stringify(dealersHand));   // deep
    dh[1].rankName = "Ace" ;  

    var statusObj = gameStatus(dh, playersHand);
    expect( statusObj.winner ).toBe("dealer");
    expect( statusObj.dealerBust ).toBeFalsy();
});

test('Check for dealer bust status when over 21.', () => {
    var dh = [...dealersHand];
    dh.push( { rankName: "6" } );
    var statusObj = gameStatus(dh, playersHand);
    expect( statusObj.winner ).toBe("player");
    expect( statusObj.dealerBust ).toBe(true);
});

test('Check for player bust status when over 21.', () => {
    var ph = [...playersHand];
    ph.push( { rankName: "Ace" } );
    var statusObj = gameStatus(dealersHand, ph);
    expect( statusObj.winner ).toBe("dealer");
    expect( statusObj.playerBust ).toBe(true);
});

//  var statusObj = { winner: null, dealerBust: false, playerBust: false, dealersBest: , playersBest:  } 

 const playersHand = [
    { rankName: '8', suit: 'Hearts' },
    { rankName: '4', suit: 'Hearts' },
    { rankName: '9', suit: 'Clubs' }
]
const dealersHand = [
    { rankName: 'Jack', suit: 'Hearts' },
    { rankName: '6', suit: 'Diamonds' },
]
Object.freeze(playersHand, dealersHand);
