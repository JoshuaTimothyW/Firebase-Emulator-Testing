const admin = require("firebase-admin");
const fire = require("./fire");

const db = fire.firestore();

exports.get = async function(){
    try {

        let arr_user = [];

        const result = await db.collection("user").get();
        
        result.forEach( (user) => {
            arr_user.push({
                id: user.id,
                data: user.data()
            })
        });

        return arr_user;

    } catch (error) {
        return {
            msg: "Error get data"
        }
    }
}

exports.hello = function(){
    return {
        msg: "Hello World"
    }
}