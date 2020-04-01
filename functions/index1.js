const functions = require('firebase-functions');
const admin = require("firebase-admin");
const express = require('express');
var bodyParser = require('body-parser');
const fire = require("./fire");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const db = fire.firestore();
db.settings({
    host: "localhost:8080",
    ssl: false,
    timestampsInSnapshots: true
});

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log("HTTP Get Request");
    res.send("HTTP GET Request");
});

app.get('/data', (req, res)=>{
    db.settings({
        timestampsInSnapshots: true
    })
    var allData = []
    db.collection('karyawan')
    .orderBy('waktu', 'desc').get()
    .then(snapshot => {
        snapshot.forEach((hasil)=>{
            allData.push(hasil.data())
        })
        console.log(allData)
        res.send(allData)
    }).catch((error)=>{
        console.log(error)
    })
})

app.post('/data', (req, res)=>{
    db.settings({
        timestampsInSnapshots: true
    })

    let time = new Date();

    db.collection('karyawan').add({
        nama: req.body.nama,
        usia: req.body.usia,
        kota: req.body.kota,
        waktu: time
    })
    res.send({
        nama: req.body.nama,
        usia: req.body.usia,
        kota: req.body.kota,
        waktu: time
    })
})

app.listen(8000,() => {
    console.log('Server aktif @port 8000');
})