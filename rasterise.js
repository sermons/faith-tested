// Derived from phantomjs example rasterize.js
// https://github.com/ariya/phantomjs/blob/master/examples/rasterize.js

var page = require('webpage').create(),
    system = require('system'),
    Usage =
    'Usage: rasterize.js URL filename [width] [height] [zoom]' +
    '  e.g., http://example.com output.pdf 1024 768 1.0';

if (system.args.length < 3 || system.args.length > 6) {
    console.log(Usage);
    phantom.exit(1);
}

var address = system.args[1];
var output = system.args[2];
var pageW = system.args[3] ? system.args[3] : 1024;
var pageH = system.args[4] ? system.args[4] :  768;
page.zoomFactor = system.args[5] ? system.args[5] : 1.0;

console.log('Saving', URL, 'to', output,
    'at', pageW, 'x', pageH, 'zoom', page.zoomFactor);

page.viewportSize = { width: pageW, height: pageH };
page.clipRect = { top: 0, left: 0, width: pageW, height: pageH };

if (output.substr(-4) === ".pdf") {
    page.paperSize = { width: pageW, height: pageH, margin: 0 };
}

console.log('Wait 5 sec for render...');

page.open(address, function (status) {
    if (status !== 'success') {
        console.log('Unable to load the address!');
        phantom.exit(1);
    } else {
        window.setTimeout(function () {
            page.render(output);
            phantom.exit(0);
        }, 5000);
    }
});

