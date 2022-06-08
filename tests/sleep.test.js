

import { sleep } from '../src/sleep.js';

test('Sleeps for 500 msec.', async () => {

    const starttime = performance.now();
    await sleep(500);
    const interval = performance.now() - starttime;
    const diff = Math.abs(interval - 500);
    expect( diff ).toBeLessThan(5);
});

