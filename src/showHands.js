

import { clear, showln, isCli } from './ioAdapter.js'
import { ranks } from './deckCreation.js'

function showHands(dealersHand, playersHand, reveal) {
    clear();
    showln("\n".repeat(isCli ? 3 : 13));

    showln("\n\n" + 
           columate("Dealer's cards:", "Your cards:\n"));
    interlaceOutput(dealersHand, playersHand, reveal);
}

function interlaceOutput(dealersHand, playersHand, reveal) {
        for (let i=0; i < dealersHand.length || i < playersHand.length; i++ ) {
            let dCard = dealersHand[i],
                pCard = playersHand[i],
                facedown = !reveal && i == 0;

            let col1 = dCard && !facedown ? dCard.rankName + " of "
                                          + dCard.suit : facedown ? "<card is face down>" : "",
                
                col2 = pCard ? pCard.rankName + " of " + pCard.suit + unicodes(pCard) : "";

            let line = columate(col1,col2) 
                
            showln(line);
        }
}

function columate(col1, col2) {
    const leftcolStart = 40, rightcolStart = 72;
    const cushion = rightcolStart - col1.length - leftcolStart;
    return " ".repeat(leftcolStart) + col1 + " ".repeat(cushion) + col2;
}

function unicodes(card) {
    var unicodes = { Spades: "♠ ", Hearts: "♥ ", Clubs: "♣ " , Diamonds: "♦ " }
    return " " + unicodes[card.suit].repeat(ranks[card.rankName]);
}
export { showHands, interlaceOutput, columate };
