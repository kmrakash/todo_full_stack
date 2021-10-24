const express = require("express");
const path = require("path");
const app = express();
// const bodyParser = require("")
app.use(express.json());

app.use(express.static(path.join(__dirname, "client/build")));

require("./app/router/router.js")(app);

// Create a Server
const port = process.env.PORT || 8001;
app.listen(port, function () {

  console.log(`App listening on port ${port}`);
});
