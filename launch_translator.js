import express from 'express';
import child_process from 'child_process';

import bodyParser from 'body-parser';
import { translate } from '@vitalets/google-translate-api';

const app = express();
// Serve static files from the public directory
app.use(express.static('translator_tool'));
app.use(bodyParser.json())

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.post("/git-req-endpoint", function (req, res) {
  var data = req.body.data;

  if (data.toUpperCase().startsWith("PUSH_BTN")) {
    var commitMsg = data.substring(data.indexOf(":") + 1);
    if (commitMsg == "") {
      commitMsg = "COMMIT FROM THE TRANSLATOR";
    }
    child_process.exec(`git add . && git commit -m "${commitMsg}" && git push`, (error, stdout, stderr) => {
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
        res.write("TRD_TXT:" + trd_response.text);
      })
    }
  }

})