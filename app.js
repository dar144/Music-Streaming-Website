const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg')
const methodOverride = require('method-override')
const path = require('path')
const { v4: uuid } = require('uuid');
const db = require('./queries')

const pool = new Pool({
    user: 'u0haidukevich',
    database: 'u0haidukevich',
    password: '0haidukevich',
    port: 5432,
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

function buildlist(listName,labelName){
    var controls = document.getElementsByName(listName);
    var label = document.getElementsByName(labelName);
    label.value = '';
    for(var i=0;i<controls.length;i++){
       label.value += controls[i].value.toString()+',';
    }
}


app.get('/', (req, res) => {
    res.render('strony/glowna');
});

app.get('/registracja', (req, res) => {
    res.render('strony/registracja');
});

app.get('/registracja/uzytkownik', async (req, res) => {
    const kraje  = await db.getKraje();
    res.render('strony/uzytkownikReg', { kraje });
});

app.post('/registracja/uzytkownik', async (req, res) => {
    const { imie, kraj_id } = req.body
    let { count } = await db.countUzytkownicy();
    count = parseInt(count) + 1;


    db.insertUzytkownik(count, kraj_id, imie).then(result => {
        if (result) {
            console.log('Uzytkownik jest dodany');
            res.redirect("/")
        } else {
            res.send("error")
        }
    });
});

app.get('/registracja/autor', async (req, res) => {
    const kraje  = await db.getKraje();
    res.render('strony/autorReg', { kraje });
});

app.post('/registracja/autor', async (req, res) => {
    const { imie, kraj_id, bio } = req.body
    let { count } = await db.countAutorzy();
    count = parseInt(count) + 1;

    db.insertAutor(count, kraj_id, imie, bio).then(result => {
        if (result) {
            console.log('Uzytkownik jest dodany');
            res.redirect("/")
        } else {
            res.send("error")
        }
    });
});

app.get('/kraje', async (req, res) => {
    const kraje  = await db.getKraje();
    res.render('strony/kraje', { kraje });
});

app.get('/gatunki', async (req, res) => {
    const gatunki  = await db.getGatunki();
    res.render('strony/gatunki', { gatunki });
});

app.post('/gatunki', async (req, res) => {
    const { nazwa } = req.body
    let { count } = await db.countGatunki();
    count = parseInt(count) + 1;

    db.insertGatunek(count, nazwa).then(result => {
        if (result) {
            console.log('Gatunek jest dodany');
            res.redirect('/gatunki');
        } else {
            res.send("error")
        }
    });
});

app.get('/autorzy', async (req, res) => {
    const autorzy  = await db.getAutorzy();
    res.render('strony/autorzy', { autorzy });
});

app.get('/autorzy/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const autor = await db.getAutorById(id);
    const kraj = await db.getKrajById(autor.kraj_id);
    const albumy  = await db.getAlbumy(autor.id);
    res.render('strony/autorInfo', { autor, kraj, albumy });
});

app.post('/autorzy/:id', async (req, res) => {
    const { nazwa, year } = req.body
    const author_id = parseInt(req.params.id);
    let { count } = await db.countAlbumy();
    count = parseInt(count) + 1;

    db.insertAlbum(count, author_id, nazwa, year).then(result => {
        if (result) {
            console.log('Album jest dodany');
            res.redirect('/autorzy/'+author_id);
        } else {
            res.send("error")
        }
    });

});

app.get('/autorzy/:id/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const album  = await db.getAlbumById(id);
    const autor = await db.getAutorById(album.autor_id);
    const piesni  = await db.getPiesni(album.id);
    const gatunki  = await db.getGatunki();
    res.render('strony/albumInfo', {id, autor, album, piesni, gatunki});
});

app.post('/autorzy/:id/:id', async (req, res) => {
    const { nazwa, gatunek } = req.body;

    // console.log(gatunek.value)

    // var controls = document.getElementsByName(listName);
    // var label = document.getElementsByName(labelName);
    // label.value = '';
    // for(var i=0;i<controls.length;i++){
    //    label.value += controls[i].value.toString()+',';
    // }

    // let listaGatunki = '';
    // for(let i = 0; i < gatunek.length; i++) {

    // }





    // var listaGatunki = gatunek.split(',');
    // console.log(listaGatunki)
    const album_id = parseInt(req.params.id);
    const album  = await db.getAlbumById(album_id);
    let { count } = await db.countPiesni();
    count = parseInt(count) + 1;

    db.insertPiesni(count, album_id, nazwa, 0).then(result => {
        if (result) {
            console.log('Piesn jest dodana');
            res.redirect('/autorzy/'+album.autor_id+"/"+album_id);
        } else {
            res.send("error")
        }
    });
});




app.listen(18082, () => {
    console.log("Example app listening on port 18082");
})

