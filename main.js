const app = require("./app");
const port = 3000;

function startServer(port) {
  try {
    app.listen(port, () => console.log(`Created the server at http://localhost:${port}`));
  } catch (error) {
    console.error(error);
  }
}

startServer(port);
