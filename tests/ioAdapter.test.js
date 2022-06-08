import * as globwin from '../__mocks__/dom.js'

import { sleep } from '../src/sleep.js'
import * as ioAdapter from  '../src/ioAdapter.js'
import { isCli, show, showln, query, setupForBrowserOrnode,
         clear, getNextUserInput, forceCliMode } from  '../src/ioAdapter.js'


// window via global

test(`Check if setup ok for dom.`, () => {
    var result = setupForBrowserOrnode() ;
    expect(result).toBe(undefined)
})

test(`User input from the DOM.`, async () => {
    simulateKeyPresses();
    var newinput = await getNextUserInput("numeric");
    expect(newinput).toBe("22");        // 2 is doubled because we now have register the same listener twice, once here and other elsewhere.
    newinput = await getNextUserInput("yn");
    expect(newinput).toBe("yy");
    simulateKeyPresses();
    newinput = await query("Another Game?", false)
    expect(newinput).toBe(false);
})


test(`Check if setup ok for node.`, async () => {
    //ioAdapter.showln = jest.fn(); 
    window = undefined;
    forceCliMode(); // sets isCli to true;
    var result = setupForBrowserOrnode() ;
    expect(result).toBe(true)
    var parallel = async () => {
        //await sleep(100);
        result = await getNextUserInput("numeric")
    }
    parallel();
    await sleep(100);
    process.stdin.pause();
    process.stdin.write("55");
    process.stdin.resume();
    process.stdin.write("\n");

    await sleep(1000)
})


async function simulateKeyPresses() {
    if (!window) return;
    const pre = document.body.querySelector("pre");
    const numericEvent = new window.KeyboardEvent('keydown', { key: 2, which: 50  });
    const enterEvent = new window.KeyboardEvent('keydown', { key: "Enter" });
    const ynEvent = new window.KeyboardEvent('keydown', { key: "y"  });

    var parallel = async () => {
        await sleep(100);
        pre.dispatchEvent(numericEvent);
        await sleep(100);
        pre.dispatchEvent(enterEvent);
        await sleep(200);
        pre.dispatchEvent(ynEvent);
        await sleep(100);
        pre.dispatchEvent(enterEvent);
    }
    parallel();
}

//afterAll( () => setTimeout(() => process.exit(0), 0))
