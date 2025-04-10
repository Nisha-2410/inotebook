const express = require("express");
const connectDB = require("./db");
var cors = require('cors')

connectDB();

const app = express()
app.use(cors({
  origin: ['http://localhost:3000', 'https://inotebook-gr6b.vercel.app/']
}));

const port = 5000

app.use(express.json());

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})

// Connect to MongoDB



