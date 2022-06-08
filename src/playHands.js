
import { betting, cardsToBoth, cardToPlayerOrDealer} from './cardBets.js'
import { showHands } from './showHands.js'
import { show, showln, query } from './ioAdapter.js'
import { sleep } from './sleep.js'
import { gameStatus } from './gameStatus.js'

async function playaHand(deck, wallet) {
    var dealersHand = [], playersHand = [];
    var state = await dealFirstTwoCards({deck, dealersHand, playersHand, wallet})
    var stake = state.stake;
    showln(" ".repeat(20),"You've staked:", stake);
    var isPlayerFinished = await query("Stick ?", false);
    if ( ! isPlayerFinished)
        state = await playerPlays(state);
    
    if (gameStatus(state.dealersHand, state.playersHand).winner) {
        showHands(dealersHand, playersHand);
        await sleep(1000);
        showHands(dealersHand, playersHand, "reveal");
        await sleep(2000);
    }
    else state = await dealerPlays(state);
    ({ deck, dealersHand, playersHand, wallet, stake} = state);
    
    var statusObj = gameStatus(dealersHand, playersHand);

    show("\n\n" + " ".repeat(20),"Stake was:", stake); //, JSON.stringify(statusObj));
    if (statusObj.winner == "player") {
        wallet += stake * 2;
        show(".  Winnings:", stake);
    }
    showln(".  Your wallet has: ", wallet+".  ");
    return [deck, wallet];
    
} // end playaHand()

async function dealFirstTwoCards( {deck, dealersHand, playersHand, wallet, stake} ){
    [deck, dealersHand, playersHand] = cardsToBoth(deck, dealersHand, playersHand);
    showHands(dealersHand, playersHand);
    await sleep(1000);
    var stake = 0;
    [wallet, stake] = await betting(wallet, stake);
        
    [deck, dealersHand, playersHand] = cardsToBoth(deck, dealersHand, playersHand);
    showHands(dealersHand, playersHand);
    return  ({ deck, dealersHand, playersHand, wallet, stake});
}    

async function playerPlays({deck, dealersHand, playersHand, wallet, stake}) {
    var isPlayerFinished;
    while(!isPlayerFinished) {
        
        showln(" ".repeat(20), "Stake:", stake);
        [wallet, stake] = await betting(wallet, stake);
        [deck, playersHand] = cardToPlayerOrDealer(deck, playersHand);
        showHands(dealersHand, playersHand);
        await sleep(1500);
        if (gameStatus(dealersHand, playersHand).winner)
            isPlayerFinished = true;
        else
            isPlayerFinished = await query("Stick? ", false);
    }
    return({deck, dealersHand, playersHand, wallet, stake});
}

async function dealerPlays({ deck, dealersHand, playersHand, wallet, stake }) {
    var isDealerFinished;
    await sleep(1000);
    showHands(dealersHand, playersHand);
    await sleep(1000);
    showHands(dealersHand, playersHand, "reveal");
    await sleep(1500); // for reveal.
    
    while( ! isDealerFinished) {
        
        [deck, dealersHand] = cardToPlayerOrDealer(deck, dealersHand);
        showHands(dealersHand, playersHand, "reveal");
        await sleep(1500);
        
        var stausObj = gameStatus(dealersHand, playersHand);
        if(stausObj.winner || stausObj.dealerSticks)
            isDealerFinished = true;
    }
    return { deck, dealersHand, playersHand, wallet, stake };
}

export { playaHand, playerPlays, dealerPlays }
