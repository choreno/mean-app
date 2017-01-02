const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');


//get api routes
const api = require('./server/routes/api');

const app = express();

//parser for post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// Set our api routes
app.use('/api', api);


//catch all routes and return the index file which means all other routes are handled by Angular
app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname, 'dist/index.html'));
    res.sendFile(path.join(__dirname, 'src/index.html'));

});

//get port from environment and store in express
const port = process.env.PORT || '3000';
app.set('port', port);

//create a http server
const server = http.createServer(app); 

//listen on provided port, on all network interfaces.
server.listen(port, () => console.log('API running on localhost: ' + port));

