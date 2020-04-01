const functions = require('firebase-functions');
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./fire.json");

admin.initializeApp(config);
const db = admin.firestore();

const app = express();
const main = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

main.use("/api/v1",app);

functions.https.onRequest(main);

// Test only
app.get("/hello",async (req,res) => {
    res.json(user.hello());
});


// Get list of user
app.get("/user",async (req,res) => {
    try {

        let arr_user = [];

        const result = await db.collection("user").get();
        
        result.forEach( (user) => {
            arr_user.push({
                id: user.id,
                data: user.data()
            })
        });

        res.json(arr_user);

    } catch (error) {
        res.status(500).send(error);
    }
})

// Get User By ID
app.get("/user/:id",async(req,res) => {
    try {

        const userId = req.params.id;
        
        const result = await db.collection("user").doc(userId).get();

        res.json({
            id: result.id,
            data: result.data(),
        });   

    } catch (error) {
        res.status(500).send(error);
    }
})

// Add new user
app.post("/user",async (req,res) => {
    try {

        const {name,email,phone} = req.body;
    
        const data = {
            name,
            email,
            phone
        }

        const result = await db.collection("user").add(data);
        
        res.json({
            id: result.id,
            data: req.body
        }); 
          
    } catch (error) {
        res.status(500).send(error);
    }
})

// Update User
app.put("/user/:id",async(req,res) => {
    try {

        const userId = req.params.id;
        const {name,email,phone} = req.body;

        const data = {
            name,
            email,
            phone
        }

        const result = await db.collection("user").doc(userId).set(data,{merge: true});

        res.json({
            id: result.id,
            data: data,
        });

    } catch (error) {
        res.status(500).send(error);
    }
})

// Delete User
app.delete("/user/:id",async(req,res) => {
    try {

        const userId = req.params.id;

        const result = await db.collection("user").doc(userId).delete();

        res.json({
            id: userId,
        });

    } catch (error) {
        res.status(500).send(error);
    }
})


// Login (unready function, still in testing)
app.post("/login",async (req,res) => {
    const {id} = req.body;

    const result = await admin.auth().createCustomToken(id)
    .then( (token) => {
        res.json({
            customToken: token
        });
    })
    .catch( (err) => {
        res.json({
            msg: "Failed create custom token"
        });
    }) 

});

main.listen(8000,() => {
    console.log("Local server start at : Localhost:8000");
})