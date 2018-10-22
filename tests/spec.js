const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');


function getApp() {
	var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

	if (process.platform === 'win32') {
	    electronPath += '.cmd';
	}

	var appPath = path.join(__dirname, '..');

	var app = new Application({
	            path: electronPath,
	            args: [appPath],
	            startTimeout: 20000,
	        });
	return app;
}

let app = getApp()

chai.should();
chai.use(chaiAsPromised);


describe("test-providers", function () {
    
    const frameSelector = 'iframe';
 
    // Start spectron
    before(function () {
        chaiAsPromised.transferPromiseness = app.transferPromiseness;
        return app.start();
    });
 
    // Stop Electron
    after(function () {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    describe("test-pdf-provider", function(){

       it('open window', function () {
            return app.client.getWindowCount().should.eventually.equal(1);
       });

       it('paste-pdf-url', function () {
            return app.client.getWindowCount().should.eventually.equal(1);
       });
    })
})
 