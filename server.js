const express = require('express')
const firebase = require('firebase');

const app = express()

var firebaseConfig = {
  apiKey: "AIzaSyCCGYug35uJBZYKdbqSur_Fg1Zjzj472LM",
  authDomain: "shrinker-3ddda.firebaseapp.com",
  databaseURL: "https://shrinker-3ddda.firebaseio.com",
  projectId: "shrinker-3ddda",
  storageBucket: "shrinker-3ddda.appspot.com",
  messagingSenderId: "207240240380",
  appId: "1:207240240380:web:6e677f3d37fb07cf17cb79",
  measurementId: "G-FZWVFL3W1G"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  db.collection('urls').onSnapshot(snapshot => {
    res.render('index', { 
      shortUrls: snapshot.docChanges().map(item => item.doc.data())
    });
  });
});

app.post('/shortUrls', async (req, res) => {
  await db.collection('urls').add({ full: req.body.fullUrl, short: getShortId(), clicks: 0})
  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  db.collection('urls').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(item => {
      if(item.doc.data().short == req.params.shortUrl){
        res.redirect(item.doc.data().full)
      }
    })
  });
})

app.listen(process.env.PORT || 5000);

function getShortId(){
  return Math.random().toString(36).substring(7);
}