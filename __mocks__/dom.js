
import dom from "jsdom";
var jsdom=dom.JSDOM;

const htmlstr = `<!DOCTYPE html><body><p><pre>Hello world</pre></p></body></html>`;
global.document = (new jsdom(htmlstr,{})).window.document; //,config); //no 'var' makes global and accessible within repl.start.

global.window = document.defaultView;

//var window = global.window

//export { window };
