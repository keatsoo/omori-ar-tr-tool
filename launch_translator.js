const express = require('express');
const app = express();

// Serve static files from the public directory
app.use(express.static('translator_tool'));

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});