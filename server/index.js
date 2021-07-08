/*
  This file is responsible for requiring your express server and then binding it to the desired port
*/

const server = require('./server.js');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
