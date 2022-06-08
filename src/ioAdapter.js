

var $ = q => document.body.querySelector(q),
    isCli = setupForBrowserOrnode();

if (isCli) 
    var readline = import('readline');  // dynamic import. // can't await here in jest.

function showln(...args) {
    show(...args,"\n");
}

async function query(Q, default0) {
    show("\n" + " ".repeat(20),Q,"[y/n]: ");
    let response = await getNextUserInput("yn");
    if (response == "y")
        return true;
    if (response == "n")
        return false;
    return default0;
}

function show(...args) {
    if(isCli){
        process.stdout.write(args.join(" "));
    } else {
        $('pre').textContent += args.join(" ");
    }
}

function clear() {
    if(isCli)
        console.clear();
    else {
        $('pre').textContent = "";
    }
}


async function getNextUserInput(keyType) {
    var resolver, promise = new Promise( res => resolver = res);
    if (isCli) {
        process.stdin.resume();
        process.stdin.setEncoding('utf-8');

        if(!getNextUserInput.reader)
            getNextUserInput.reader = (await readline).createInterface({
                input: process.stdin, output: process.stdout
            });
        getNextUserInput.reader.on('line', line => resolver(line));
        return promise;
    } else {
        ip(resolver, keyType);
        return promise;
        //$("#userInput").value;
    }
};

function ip(resolver, keyType) {
    if (resolver) {
        ip.resolver = resolver;
        ip.keys = "";
        ip.keyType = keyType;
        let pre = $("pre")
        pre.focus();
        setCursorToEnd(pre);
    }
    else {
        ip.resolver(ip.keys);
    }
}

function setupForBrowserOrnode() {
    const isBrowser = typeof window !== "undefined" &&
          typeof window.document !== "undefined";
    
    if (isBrowser) {
        var pre = document.body.querySelector("pre");
        //var enter = (p) => if (p) enter.p = p;
        pre.addEventListener("keydown", e => {
            if (e.key == "Enter") {
                e.preventDefault();
                ip();  // resolve
            } else {
                if (ip.keyType == "numeric" && e.which >= 48 && e.which <= 57){
                    ip.keys += e.key;
                }
                else {
                    if (ip.keyType == "yn" && /y|n/.test(e.key)) {
                        ip.keys += e.key;
                    }
                }
        }
        });
    } else {
        return true;
    }
}

function setCursorToEnd(ele) {
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(ele, 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    ele.focus();
}

function forceCliMode() {
    isCli = true;
    readline = import('readline'); 
}


export { isCli, forceCliMode, show, showln, query, setupForBrowserOrnode, clear, getNextUserInput } 
