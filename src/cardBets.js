import { show, showln, getNextUserInput } from './ioAdapter.js';

function cardsToBoth(deck, dealersHand, playersHand) {
    dealersHand.push(deck.shift());
    playersHand.push(deck.shift());
    return [deck, dealersHand, playersHand];
}

function cardToPlayerOrDealer(deck, hand) {
    hand.push(deck.shift());
    return [deck, hand];
}

async function betting(wallet, stake) {
    show(`\n\n☆☆☆ ✰ ✰ ✰★★★★★★★ ★ ✶✶✶✪✪✪🟊🟊🟌 > Place a bet [ from 0 to ${wallet} credits]: `);
    if(wallet == 0)
        return [0, stake];
    let ante = await bet(wallet);
    if(ante > wallet)
        ante = wallet;
    return [wallet - ante, stake += ante];
}

async function bet(wallet) {
    let response = await getNextUserInput("numeric");
    response = parseInt(response);
    if (isNaN(response))
        return 0;
    return response;
}

export { cardsToBoth, cardToPlayerOrDealer, betting }
