const axios = require("axios").default;
const MongoClient = require("mongodb").MongoClient;

const options = {
    method: "GET",
    url: "https://api.spotify.com/v1/playlists/3v7tm35LaIfanEs0C3xjLA",
    headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + spotifyToken,
    }
};

// Spotify & Mongodb tokens
const spotifyToken = "your spotify token here";
const dbAcces = "<mongodb+srv://insertYourName:insertYourPassword@cluster0.awhe7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority>";



// Request and call insert function
axios.request(options).then(function (response) {
    response.data.tracks.items.map((items) => {
      insertMongodb(items.track.name);
    });
  }).catch(function (error) {
    console.error(error);
  });

// Mongo access
function insertMongodb(musicName, dbAcces) {
  MongoClient.connect(dbAcces, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { musicName: musicName};
    dbo.collection("songs").insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log("Check " + musicName + "in your database!");
    db.close();
    });
});
}