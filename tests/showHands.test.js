

import { showHands, interlaceOutput, columate } from '../src/showHands.js'
import * as showhObj from '../src/showHands.js'
import { clear, showln } from '../src/ioAdapter.js'
import * as ioAdapter from  '../src/ioAdapter.js'

test(`The showing of headers.`, () => {
    ioAdapter.showln = jest.fn(); 
    showHands(dealersHand, playersHand);
    expect(showln.mock.calls[1][0]).toMatch(/Dealer's cards:/);
})

test(`The interlacing of dealer's and player's first cards.`, () => {
    ioAdapter.showln = jest.fn(); 
    interlaceOutput(dealersHand, playersHand);
    expect(showln.mock.calls[0][0]).toMatch(/<card is face down>.*8 of Hearts/);
});


test(`The division into dealer's column and player's column.`, () => {
    var resp = showhObj.columate("col1","col2");
    expect(resp).toMatch(/^ {40,40}col1 {28,28}col2 *$/);
});



var playersHand = [
    { rankName: '8', suit: 'Hearts' },
    { rankName: '4', suit: 'Hearts' },
    { rankName: '9', suit: 'Clubs' }
]
var dealersHand = [
    { rankName: 'Jack', suit: 'Hearts' },
    { rankName: '6', suit: 'Diamonds' },
]
