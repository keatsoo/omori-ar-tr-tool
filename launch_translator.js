require = require("esm")(module);

const express = require('express');
const child_process = require('child_process');
const { app, BrowserWindow } = require('electron');
const bodyParser = require('body-parser');
const { translate } = require('@vitalets/google-translate-api');
const fs = require('fs')


const myApp = express();
// Serve static files from the public directory
myApp.use(express.static('translator_tool'));
myApp.use(bodyParser.json())

// Start the server
myApp.listen(3000, () => {
  console.log('Server listening on port 3000');
});

myApp.post("/git-req-endpoint", function (req, res) {
  var data = req.body.data;

  if (data.toUpperCase().startsWith("PUSH_BTN")) {
    var commitMsg = data.substring(data.indexOf(":") + 1);
    if (commitMsg == "") {
      commitMsg = "COMMIT FROM THE TRANSLATOR";
    }
    child_process.exec(`git add . && git commit -m "${commitMsg}" && git push`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        res.send(`ERROR:::${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        res.send(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      res.send(`stdout: ${stdout}`)
    });
  }

  if (data.toUpperCase().startsWith("COMM_BTN")) {
    var commitMsg = data.substring(data.indexOf(":") + 1);
    if (commitMsg == "") {
      commitMsg = "COMMIT FROM THE TRANSLATOR";
    }
    child_process.exec(`git add . && git commit -m "${commitMsg}"`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }

  if (data.toUpperCase().startsWith("PULL_BTN")) {
    child_process.exec(`git pull`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }

  if (data.toUpperCase().startsWith("GGLE_TRL")) {
    var tr_string = data.substring(data.indexOf(":") + 1);

    if (tr_string == "") {
      res.write("ERR_EMPTY_TR_STR")
    } else {
      translate(tr_string, { to: 'ar' }).then(trd_response => {
        var resptxt = "TRD_TXT:" + trd_response.text;
        res.send(resptxt);
      })
    }
  }

  //res.end()

})

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
  });

  win.loadFile('translator_tool/index.html');
};


app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
