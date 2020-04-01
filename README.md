# Firebase Emulator Test

Test for Firebase function and firestore

# Note to Jani

First, u need to create project in your firebase account. then go to Setting>Project Setting, scroll down to Firebase SDK snippet

Copy the following configuration from Firebase SDK snippet: 
    var firebaseConfig = {
        apiKey: "...",
        authDomain: "...",
        databaseURL: "...",
        projectId: "...",
        storageBucket: "...",
        messagingSenderId: "...",
        appId: "...",
        measurementId: "..."
    };

Create a file called 'fire.json' and paste the config in it

Second, `npm i` in this project

Third, run `npm run start` to start local server, done enjoy testing :)

# Documentation

Local Server start at http://localhost:8000/api/v1


| No |      Path      |  Method | Description  |
|----|:-------------:|------:|---|
| 1  |  /user | GET |   Get All Users   |
| 2  |  /user/{id}   |  GET  |  Get Spesific User by ID |
| 3  |  /user |    POST  |  Add New User |
| 4  |  /user/{id} |   PUT    |  Update User |
| 5  |  /user/{id} |   DELETE    |  Delete User |

Data to be send For no 2-5:

I test it in Postman