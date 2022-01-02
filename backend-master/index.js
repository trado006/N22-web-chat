/* eslint-disable no-console */
const express = require('express');
const dotenv = require('dotenv');
const { Model } = require('objection');
const cors = require('cors');
const upload = require('express-fileupload');

// setup socket.io
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        //origin: [process.env.FRONT_END_URL, 'http://localhost:3001'],
        origin: '*',
        credentials: true,
    },
});

dotenv.config({ path: '.env' }); // don't move this line under routes

app.set('view engine', 'ejs');

const routes = require('./app/routes');
const web_routes = require('./web-routes/web');
const knex = require('./database/knex');
const middlewares = require('./app/http/middlewares');

// socket
const { addUser, removeUser } = require('./socket/user');
const { newFriendRequest, acceptFriendRequest } = require('./socket/friendRequest');
const { newMessage } = require('./socket/chat');

Model.knex(knex);

const port = process.env.PORT || 3002;

app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})
app.use('/public', express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //true
app.use(upload());
app.use(middlewares.me);

app.use('/', web_routes);
Object.keys(routes).map((route) => app.use('/api/', routes[route]));

// app.use((req, res, next) => {
//   console.log(req.method + " " + req.path + " - " + req.ip);
//   next();
// })

app.use((req, res) => {
    res.send('Api not found');
});

io.on('connection', (socket) => {
    console.log('Made socket connection');

    socket.on('addUser', ({ token }) => {
        console.log('addUser');
        console.log(token);
        addUser(token, socket.id);
    });

    socket.on('new message', async(data, cb) => {
        const res = await newMessage(data);

        if (res.me && res.user) {
            socket.to(res.user.socketId).emit('newMessage', res.me, res.message);
            cb(res.message);
        } else {
            console.log(res.message);
            if (res) cb(res.message);
            cb(false);
        }


    });

    socket.on('disconnection', () => {
        console.log('disconnect');

        socket.on('removeUser', async({ token }) => {
            removeUser(token, socket.id);
        });
    });

    socket.on('newFriendRequest', async(data, cb) => {
        const res = await newFriendRequest(data);
        console.log(res);
        if (res.me && res.user) {
            socket.to(res.user.socketId).emit('friendRequest', res.user.friendRequest);
        }

        if (res) cb(true);
        cb(false);
    });

    socket.on('acceptFriendRequest', async(data, cb) => {
        const res = await acceptFriendRequest(data);

        if (res.partnerMessenger && res.user) {
            socket.to(res.user.socketId).emit('friendRequestAccept', res.partnerMessenger);
        }

        if (res) {
            cb(res.meMessenger);
        } else {
            cb(false);
        }
    });
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});