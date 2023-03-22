const express = require('express');
const { exec } = require("child_process");
const app = express();
const bodyParser = require('body-parser')

// Serve static files from the public directory
app.use(express.static('translator_tool'));
app.use(bodyParser.json())

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.post("/git-req-endpoint", function (req, res) {
  var data = req.body.data;

  if (data.toUpperCase() == "PUSH_BTN") {
    exec("git add . && git commit -m 'ohhhhhh' && git push", (error, stdout, stderr) => {
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

})