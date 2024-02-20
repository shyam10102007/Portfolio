//first of all install all dependencies
//step1 --> npm init -y
//step2 --> npm i express
//step3 --> npm i mongoose
//step3 -->npm i hbs
// Starting -- >> nodemon ./app.js

const express = require("express");
const path = require("path");
const app = express();
exports.app = app;
const port = process.env.Port || 3000;
const bodyparser = require("body-parser")
const hbs = require("hbs")

// getting-started.js
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/contactDance');// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//Define mongoose schema
const contactschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    work: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    problem: {
        type: String,
        required: true
    }
});
const contact = mongoose.model('contact', contactschema);
const static_path = path.join(__dirname, "/static");
// EXPRESS SPECIFIC STUFF
// serving static files
app.use('/static', express.static('static'))//For serving static files
app.use(express.urlencoded({ extended: false }))

//HBS SPECIFIC ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "hbs");

app.get('/', (req, res) => {
    const babaAcademy = {}
    res.status(200).render('index.hbs', babaAcademy);
});
//ENDPOINT

// //post request to contact page
app.post('/', async (req, res) => {
    var myData = await new contact(req.body);
    myData.save().then(() => {
        console.log(myData);
        res.send("Your form submited successfully")
    }).catch(() => {
        res.status(403).send("Data can not to the saved in database")
    });
});
//START THE SERVER
app.listen(port, () => {
    console.log(`The application is listening on ${port}`);
});