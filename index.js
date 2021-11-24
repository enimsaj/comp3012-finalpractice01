const express = require("express");
const PORT = process.env.PORT || 8007;
const app = express();
const fs = require('fs');
const fsPromises = require('fs').promises;
const FILENAME = 'database.json';

// Don't worry about these 4 lines below
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("createcard");
});

app.post("/", async (req, res) => {
  //send all data to server, insert and write to db
  req.body.id = 123;//replace with user count
  let data = JSON.stringify(req.body)
  console.log(data)
  try {
    await fsPromises.appendFile(FILENAME, data)
    //add data to db
    console.log("File written successfully");
    console.log("The written file has"
        + " the following contents:");

    // console.log("" + fs.readFileSync("./"+FILENAME));
  } catch (err) {
      console.error(err);
  }

  //send user data to /people page
  res.render("people");
});

app.get("/people/:id", (req, res) => {
  res.render("people");
});

app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});
