require('dotenv').config();
// console.log(process.env.HARPERDB_URL); // remove this after you've confirmed it working
const express = require('express');
const app = express();
// const http = require('http');
const cors = require('cors');
const cp = require('cookie-parser');
const mongoose = require('mongoose');
// const { MongoClient, ServerApiVersion } = require('mongodb');

const login = require('./src/login');


const personSchema = require('./models/person');
const Person = require('./models/person');

// const { Server } = require('socket.io'); // Add this

// const harperSaveMessage = require('./services/harper-save-message'); // Add this
// const harperGetMessages = require('./services/harper-get-messages'); // Add this
// const leaveRoom = require('./utils/leave-room'); // Add this

app.use(
  cors({
    origin: process.env.CLIENT_PATH,
    methods: ['GET', 'POST'],
    credentials: true
  }),
  express.json(),
  cp()
);

// const uri = process.env.MONGODB_URL;
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   console.log(uri);
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 });
//     console.log('Pinged your deployment. You successfully connected to MongoDB!');
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


// Options de configuration pour la connexion
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Établir la connexion à la base de données
mongoose.connect(process.env.MONGODB_URL, options)
  .then(() => {
    console.log('Connexion à la base de données établie');
    // User.find().forEach((user) => {
    //   console.log(user);
    // });
  })
  .catch((error) => {
    console.error('Erreur de connexion à la base de données :', error);
  });

// const server = http.createServer(app);
// const CHAT_BOT = 'ChatBot'; // Add this
// let chatRoom = ''; // E.g. javascript, node,...
// let allUsers = []; // All users in current chat room

// Add this
// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
// const io = new Server(server, {
//   cors: {
//     origin: 'https://weranion.vercel.app',
//     methods: ['GET', 'POST'],
//     credentials: true
//   },
// });

async function fetchPersons() {
  try {

    // Créer le modèle
    const Person = mongoose.model('Person', personSchema);
    const persons = await Person.find();
    console.log(persons);
  } catch (error) {
    console.error('Erreur lors de la récupération des personnes :', error);
  }
}


app.get('/', (req, res) => {
  res.json('hello');
});

// app.get('/patate', (req, res) => {
//   res.json('on dit banane');

//   fetchPersons();
// });


app.get('/patate', async (request, response) => {
  const users = await Person.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post('/add_test', async (request, response) => {
  const user = new Person(request.body);

  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.use('/login', login);

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   // console.log(req);
//   // console.log(req.query);


//   if (username === 'a' && password === 'a') {
//     // res.json({ success: true });

//     const payload = {
//       username: username,
//       // password: password
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET);
//     // res.json('mouais');
//     res.cookie('token', token, {
//       httpOnly: true
//     }).send('Cookie shipped');
//   } else {
//     res.json({ message: username, try: 'true' });
//   }
// });

// app.get('/cookies', (req, res) => {
//   const token = req.cookies.token;

  
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, (err) => {
//       if (err) {
//         // Le token est invalide, rediriger vers la page de connexion
//         res.status(403).send('Not connected');
//       } else {
//         // Le token est valide, passez à l'étape suivante
//         res.json('c est ok');
//       }
//     });
//   } else {
//     // Le token est manquant, rediriger vers la page de connexion
//     res.status(403).send('Not connected');
//   }
//   // const payload = jwt.verify(token, process.env.JWT_SECRET);
//   // res.json({
//   //   token, payload
//   // });
// });
  
// // Add this
// // Listen for when the client connects via socket.io-client
// io.on('connection', (socket) => {
//   console.log(`User connected ${socket.id}`);
  
//   // We can write our socket event listeners in here...
    
//   // Add a user to a room
//   socket.on('join_room', (data) => {
//     const { username, room } = data; // Data sent from client when join_room event emitted
//     socket.join(room); // Join the user to a socket room

//     // Add this
//     let __createdtime__ = Date.now(); // Current timestamp
//     // Send message to all users currently in the room, apart from the user that just joined
//     socket.to(room).emit('receive_message', {
//       message: `${username} has joined the chat room`,
//       username: CHAT_BOT,
//       __createdtime__,
//     });

//     // Add this
//     // Send welcome msg to user that just joined chat only
//     socket.emit('receive_message', {
//       message: `Welcome ${username}`,
//       username: CHAT_BOT,
//       __createdtime__,
//     });

//     // Add this
//     // Save the new user to the room
//     chatRoom = room;
//     allUsers.push({ id: socket.id, username, room });
//     let chatRoomUsers = allUsers.filter((user) => user.room === room);
//     socket.to(room).emit('chatroom_users', chatRoomUsers);
//     socket.emit('chatroom_users', chatRoomUsers);

//     // Add this
//     // Get last 100 messages sent in the chat room
//     harperGetMessages(room)
//       .then((last100Messages) => {
//         // console.log('latest messages', last100Messages);
//         socket.emit('last_100_messages', last100Messages);
//       })
//       .catch((err) => console.log(err));
//   });

//   // Add this
//   socket.on('send_message', (data) => {
//     const { message, username, room, __createdtime__ } = data;
//     io.in(room).emit('receive_message', data); // Send to all users in room, including sender
//     harperSaveMessage(message, username, room, __createdtime__) // Save message in db
//       .then((response) => console.log(response))
//       .catch((err) => console.log(err));
//   });

//   // Add this
//   socket.on('leave_room', (data) => {
//     const { username, room } = data;
//     socket.leave(room);
//     const __createdtime__ = Date.now();
//     // Remove user from memory
//     allUsers = leaveRoom(socket.id, allUsers);
//     socket.to(room).emit('chatroom_users', allUsers);
//     socket.to(room).emit('receive_message', {
//       username: CHAT_BOT,
//       message: `${username} has left the chat`,
//       __createdtime__,
//     });
//     console.log(`${username} has left the chat`);
//   });

//   // Add this
//   socket.on('disconnect', () => {
//     console.log('User disconnected from the chat');
//     const user = allUsers.find((user) => user.id == socket.id);
//     if (user?.username) {
//       allUsers = leaveRoom(socket.id, allUsers);
//       socket.to(chatRoom).emit('chatroom_users', allUsers);
//       socket.to(chatRoom).emit('receive_message', {
//         message: `${user.username} has disconnected from the chat.`,
//       });
//     }
//   });
// });

// server.listen(4000, () => 'Server is running on port 4000');
app.listen(4000, () => 'Server is running on port 4000');