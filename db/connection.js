const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fsi-transfer-market-default-rtdb.firebaseio.com/",
});

const rtdb = admin.database();

module.exports = { rtdb };
