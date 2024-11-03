require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for remote testing
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Root route - serves the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Main API endpoint to retrieve client header info
app.get('/api/whoami', (req, res) => {
  // Get IP address
  const ipaddress = req.ip;

  // Get language from 'accept-language' header
  const language = req.headers['accept-language'];

  // Get software info from 'user-agent' header
  const software = req.headers['user-agent'];

  // Respond with JSON object containing the header info
  res.json({
    ipaddress,
    language,
    software,
  });
});

// Start server on specified PORT
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
