const fs = require('fs');
const screenshot = require('desktop-screenshot');

function startScreener () {
  const todaysDate = new Date();
  const ssDir = `./www/screenshots-${todaysDate.getMonth()}-${todaysDate.getDay()}-${todaysDate.getFullYear()}/`;

  if (!dirExists(ssDir)) {
    fs.mkdir(`./www/screenshots-${todaysDate.getMonth()}-${todaysDate.getDay()}-${todaysDate.getFullYear()}/`);
  }

  setInterval(function() {
    const innerDate = new Date();
    screenshot(`./${ssDir}/screenshot-${innerDate.getHours()}-${innerDate.getMinutes()}-${innerDate.getSeconds()}.png`, (error, complete) => {
        if(error)
            console.log("Screenshot failed", error);
        else
            console.log("Screenshot succeeded");
    });
  },300000)

}

function dirExists(dirPath) {
    try { return fs.statSync(dirPath).isDirectory(); }
    catch (err) { return false; }
}

module.exports = startScreener;
