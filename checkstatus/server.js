const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3005;

const uri = 'mongodb+srv://nehab:Tomnjerry@cluster0.c2g9sor.mongodb.net/Dapp?retryWrites=true&w=majority';
const dbName = 'Dapp';

app.use(bodyParser.json());
app.use(express.static('public'));
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect().then(() => {
  console.log('Connected to MongoDB');
  const db = client.db(dbName);
  
  // Endpoint to check passenger verification
  app.post('/checkPassengerVerification', async (req, res) => {
    const { hashValue } = req.body;
    const collection = db.collection('passengerverified');

    try {
      const result = await collection.findOne({ hashValue });
      if (result) {
        res.json({ userId: result.userId });
      } else {
        res.json({ message: 'Hash value not found' });
      }
    } catch (error) {
      console.error('Error checking passenger verification:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Endpoint to check driver verification
  app.post('/checkDriverVerification', async (req, res) => {
    const { hashValue } = req.body;
    const collection = db.collection('driververified');

    try {
      const result = await collection.findOne({ hashValue });
      if (result) {
        res.json({ userId: result.userId1 });
        console.log(result.userId1);
      } else {
        res.json({ message: 'Hash value not found' });
      }
    } catch (error) {
      console.error('Error checking driver verification:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Exit the process if MongoDB connection fails
});
