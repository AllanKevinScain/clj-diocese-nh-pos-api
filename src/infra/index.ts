import server from './server';

server.listen('8080', () => {
  console.log(`Server started at ${new Date().toISOString()}`);
  console.log(`Server running on port 8080`);
});
