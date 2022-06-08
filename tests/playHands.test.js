

import * as ioAdapter from  '../src/ioAdapter.js'
//ioAdapter.query = jest.fn();
import {query} from '../src/ioAdapter.js'
import { playaHand, playerPlays, dealerPlays } from '../src/playHands.js';
import { generateDeck, shuffle, ranks } from '../src/deckCreation.js';
import { sleep } from '../src/sleep.js';

jest.setTimeout(20000) 

test(`Play a hand of 21s. Player sticks immediately.`, async () => {
    var wallet = 101;
    var deck = generateDeck()  //shuffle(generateDeck());
    ioAdapter.query = jest.fn();
    ioAdapter.getNextUserInput = jest.fn();
    ioAdapter.getNextUserInput.mockReturnValueOnce(22) // bets 22
    ioAdapter.query.mockReturnValueOnce("y")           // player sticks
    ioAdapter.getNextUserInput.mockReturnValueOnce("n")
    
    //ioAdapter.getNextUserInput.mockReturnValueOnce(true).mockReturnValueOnce(false);
    [deck, wallet] = await playaHand(deck, wallet);

    expect( wallet ).toBe(101);      
    expect( deck.length ).toBe(46);  
})

test(`Play a hand of 21s.`, async () => {
    var wallet = 101;
    var deck = generateDeck()  //shuffle(generateDeck());
    
    ioAdapter.query = jest.fn();
    ioAdapter.getNextUserInput = jest.fn();
    
    ioAdapter.getNextUserInput.mockReturnValueOnce(22)                 // bets 22
    
    ioAdapter.query.mockReturnValueOnce(false).mockReturnValueOnce(true)            // player goes on one and then sticks

    
    ioAdapter.getNextUserInput.mockReturnValueOnce(25)  // bets again
    //ioAdapter.query.mockReturnValueOnce("y")            // player sticks
    ioAdapter.getNextUserInput.mockReturnValueOnce("n") // ends game.
    
    //ioAdapter.getNextUserInput.mockReturnValueOnce(true).mockReturnValueOnce(false);
    [deck, wallet] = await playaHand(deck, wallet);

    expect( wallet ).toBe(101);      
    expect( deck.length ).toBe(45);  
})
