

import { generateDeck, shuffle, ranks } from '../src/deckCreation.js'

test('Generates a standard deck of 52 cards.', () => {
    const deck = generateDeck();
    expect( deck.length ).toBe(52);
});

test('Check for 13 ranks.', () => {
    expect( Object.entries(ranks).length ).toBe(13);
});


// deck is a 52 length array of unique objects, { rankName: <eg, Jack>, suit: <eg, Hearts> }

test('Shuffles a standard deck of 52 cards.', () => {
    const deck = generateDeck();
    const originalDeck = [...deck];
    const shuffledDeck = shuffle(deck);
    expect( shuffledDeck.length ).toBe(52);
    expect(shuffledDeck).not.toEqual(originalDeck);
});



//expect(pick(['Hey', 'Hello', 'Hi'])).toMatch(/Hey|Hello|Hi/)
