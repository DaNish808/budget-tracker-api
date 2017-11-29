const http = require('http');
const app = require('./lib/app');
const port = process.env.PORT || 3001;
require('./lib/setup-mongoose');

const server = http.createServer(app);

server.listen(port, () => console.log('server running at port', server.address().port));