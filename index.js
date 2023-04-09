const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// middleware
require("dotenv").config();
app.use(cors());
app.use(express.json());

async function run() {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h9wahhk.mongodb.net/?retryWrites=true&w=majority`;
  console.log(uri);
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    // collection Name
    const moviesCollection = client
      .db("white_carrot_movies")
      .collection("movies_list");

    const favoriteCoolection = client
      .db("white_carrot_movies")
      .collection("Favorite");
    // const myfavorite = client.db("white_carrot_movies").collection("Favorite");
    app.get("/all-movies", async (req, res) => {
      const movies = {};
      const result = await moviesCollection.find(movies).toArray();
      res.send(result);
      console.log(result);
    });
    app.post("/favorite", async (req, res) => {
      const item = req.body;
      const result = await favoriteCoolection.insertOne(item);
      res.send(result);
    });
    app.get("/my-favorite", async (req, res) => {
      const email = req.query.email;
      const query = { userEmail: email };
      const result = await favoriteCoolection.find(query).toArray();
      res.send(result);
    });
    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await favoriteCoolection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.error());

app.get("/", (req, res) => {
  res.send("White Carrot movie server is running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
