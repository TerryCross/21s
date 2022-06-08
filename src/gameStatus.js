

import { ranks } from './deckCreation.js'

function gameStatus(dealersHand, playersHand) {

    var statusObj = { winner: null, dealerBust: false, playerBust: false },
        
        playersTotals = totals(playersHand),
        dealersTotals = totals(dealersHand);
    
    if (dealersTotals.every( r => r > 21) ) 
        return { dealerBust: true, winner: "player" };
    
    if (playersTotals.every( r => r > 21) )
        return { playerBust: true, winner: "dealer" };

    let dealerSticks = dealersTotals.some( r => r >= 17 && r <= 21);
    if (dealerSticks) { 

        let bestTotal = totals => totals.reduce( (acc, curr) => curr <= 21 && curr > acc ? curr : acc),
            dealersBest = bestTotal(dealersTotals),
            playersBest = bestTotal(playersTotals);
        var bests={dealersBest, playersBest};
        if (playersBest > dealersBest) 
            return { winner: "player", ...bests};
        return { winner: "dealer", ...bests};
    }
    return { winner: null};
};


function totals(hand) {
    let tots = hand.reduce( (acc, curr) => {
        let tot = curr;
        if(curr.rankName == "Ace") {
            var single = acc.map( sum => sum + 1),
                double = acc.map( sum => sum + 11);
            acc = [...single, ...double];
        }
        else acc = acc.map( sum => sum + ranks[curr.rankName]);
        return acc;
    }, [0]);
    return tots;
}

export { gameStatus };
