require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// Database Connection
const DB_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/eventLogs';
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
