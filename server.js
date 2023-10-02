const { serverPort } = require("./config");
const { app } = require("./app");
const db = require("./db");

(async () => {
  try {
    await db.connect();
    console.log("Database connected");
    app.listen(serverPort, async () => {
      console.log(`Server running. Use our API on port: ${serverPort}`);
    });
  } catch (error) {
    console.error(error.message);
  }
})();
