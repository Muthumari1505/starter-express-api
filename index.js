const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3900;

// Middleware to parse webhook body as JSON

// Handle webhook POST request
app.post('/webhook', async (req, res) => {
  // Get ticket information from webhook body

  // Send message to Zoho Cliq
  try {
    const response = await axios.post('https://cliq.zoho.com/api/v2/channelsbyname/buildtest/message?zapikey=1001.ddbb61d82fba2eb8de1f61ce073cc0c5.5d4eba8ac3c86965c3c59d4cc736755f', {
      text: `build detail`,
    });
    console.log('Message sent to Zoho Cliq:', response.data);
  } catch (error) {
    console.error('Error sending message to Zoho Cliq:', error);
  }

  // Send response to webhook
  res.sendStatus(200);
});

// Start server
app.listen(process.env.PORT || PORT, function(err){
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);
})
