

function sleep(ms) {
	  var p = new Promise( resolve => setTimeout(resolve, ms));
    return p;
}

export { sleep }
