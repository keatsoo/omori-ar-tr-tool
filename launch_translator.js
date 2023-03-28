require = require("esm")(module);

const express = require('express');
const { spawn } = require('child_process');
const { app, BrowserWindow } = require('electron');
const bodyParser = require('body-parser');
const { translate } = require('@vitalets/google-translate-api');
const fs = require('fs')


const myApp = express();
myApp.use(bodyParser.json())

// Start the server
myApp.listen(47709, () => {
  console.log('Server listening on port 47709');
});

myApp.post("/git-req-endpoint", function (req, res) {


  var data = req.body.data;

  if (data.toUpperCase().startsWith("PUSH_BTN")) {
    var commitMsg = data.substring(data.indexOf(":") + 1);
    if (commitMsg == "") {
      commitMsg = "COMMIT FROM THE TRANSLATOR";
    }

    const gitAdd = spawn('git', ['add', '.']);
    const gitCommit = spawn('git', ['commit', '-m', commitMsg]);
    const gitPush = spawn('git', ['push']);

    gitAdd.on('error', (err) => {
      console.error(`git add error: ${err}`);
    });

    gitAdd.stdout.on('data', (data) => {
      console.log(`git add stdout: ${data}`);
    });

    gitAdd.stderr.on('data', (data) => {
      console.error(`git add stderr: ${data}`);
    });

    gitAdd.on('close', (code) => {
      console.log(`git add process exited with code ${code}`);

      gitCommit.on('error', (err) => {
        console.error(`git commit error: ${err}`);
      });

      gitCommit.stdout.on('data', (data) => {
        console.log(`git commit stdout: ${data}`);
      });

      gitCommit.stderr.on('data', (data) => {
        console.error(`git commit stderr: ${data}`);
      });

      gitCommit.on('close', (code) => {
        console.log(`git commit process exited with code ${code}`);

        gitPush.on('error', (err) => {
          console.error(`git push error: ${err}`);
        });

        gitPush.stdout.on('data', (data) => {
          console.log(`git push stdout: ${data}`);
          res.send(`stdout: ${data}`);
        });

        gitPush.stderr.on('data', (data) => {
          console.error(`git push stderr: ${data}`);
          res.send(`stderr: ${data}`);
        });

        gitPush.on('close', (code) => {
          console.log(`git push process exited with code ${code}`);
        });
      });
    });
  }

  if (data.toUpperCase().startsWith("COMM_BTN")) {
    var commitMsg = data.substring(data.indexOf(":") + 1);
    if (commitMsg == "") {
      commitMsg = "COMMIT FROM THE TRANSLATOR";
    }

    spawn('git', ['add', '.']);
    spawn('git', ['commit', '-m', commitMsg]);
    /* child_process.exec(`git add . && git commit -m "${commitMsg}"`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }); */
  }

  if (data.toUpperCase().startsWith("PULL_BTN")) {
    spawn('git', ['pull']);
    /* child_process.exec(`git pull`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }); */
  }

  if (data.toUpperCase().startsWith("GGLE_TRL")) {
    var tr_string = data.substring(data.indexOf(":") + 1);

    if (tr_string == "") {
      res.send("ERR_EMPTY_TR_STR")
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
    height: 720
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
