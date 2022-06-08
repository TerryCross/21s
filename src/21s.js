

import { playaHand } from './playHands.js';
import { isCli, show, showln, query, setupForBrowserOrnode, clear, getNextUserInput } from './ioAdapter.js';
import { generateDeck, shuffle, ranks } from './deckCreation.js';
import { sleep } from './sleep.js';

// check if running in nodejs CLI  or in a browser.

async function playaGame() {
    
    var wallet = 100;
    var deck = shuffle(generateDeck());
    clear();
    showln("♣ 🂡 ♣".repeat(2500)); // 🂲 🂡, unicodes too small for console.
    await sleep(1200);

    while(true){
        if(deck.length <= 21)  // coincidently, 21 is the maximum number of cards needed in one game.
            deck = shuffle(generateDeck());
        [deck, wallet] = await playaHand(deck, wallet);
        if (wallet <= 0) {
            showln("\n\n\t\t\tWallet empty.\n\t\t\tGame Over.");
            await sleep(10000);
            break;
        }
        if ( ! await query("Play again", true)){
            break;
        }
    };

    if (isCli)
        process.exit(0);
    else
        document.body.querySelector('pre').remove();

}

export { playaGame }

