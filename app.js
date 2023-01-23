const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const methodOverride = require('method-override')
const path = require('path')
const db = require('./queries')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


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

app.get('/registracja/autor', async (req, res) => {
    const kraje  = await db.getKraje();
    res.render('strony/autorReg', { kraje });
});

app.get('/kraje', async (req, res) => {
    const kraje  = await db.getKraje();
    res.render('strony/kraje', { kraje });
});

app.get('/gatunki', async (req, res) => {
    const gatunki  = await db.getGatunki();
    res.render('strony/gatunki', { gatunki });
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
    const liczbaPiesni = await db.getLiczbaPiesni(autor.id);
    console.log(liczbaPiesni)
    res.render('strony/autorInfo', { autor, kraj, albumy, liczbaPiesni });
});

app.get('/autorzy/:id/:id', async (req, res) => {
    pg = {};
    const id = parseInt(req.params.id);
    const album  = await db.getAlbumById(id);
    const autor = await db.getAutorById(album.autor_id);
    const piesni  = await db.getPiesni(album.id);
    if(piesni.length > 0) {
        for(p of piesni) {
            // console.log("app.get('/autorzy/:id/:id'):  p.id :  " + p.id)
            const tmp = await db.getPiesniGatunki(p.id);
            // console.log("app.get('/autorzy/:id/:id'):  tmp  : " + tmp)
            pg[p.id] = tmp;
        }
    }
    const gatunki  = await db.getGatunki();
    res.render('strony/albumInfo', {autor, album, piesni, gatunki, pg});
});










app.post('/registracja/uzytkownik', async (req, res) => {
    const { imie, kraj_id } = req.body

    db.insertUzytkownik(kraj_id, imie).then(result => {
        if (result) {
            console.log('Uzytkownik jest dodany');
            res.redirect("/")
        } else {
            res.send("error")
        }
    });
});

app.post('/registracja/autor', async (req, res) => {
    const { imie, kraj_id, bio } = req.body;

    db.insertAutor(kraj_id, imie, bio).then(result => {
        if (result) {
            console.log('Autor jest dodany');
            res.redirect("/")
        } else {
            res.send("error")
        }
    });
});

app.post('/gatunki', async (req, res) => {
    const { nazwa } = req.body;

    db.insertGatunek(nazwa).then(result => {
        if (result) {
            console.log('Gatunek jest dodany');
            res.redirect('/gatunki');
        } else {
            res.send("error")
        }
    });
});

app.post('/autorzy/:id', async (req, res) => {
    const { nazwa, rok } = req.body
    const author_id = req.params.id;

    db.insertAlbum(author_id, nazwa, rok).then(result => {
        if (result) {
            console.log('Album jest dodany');
            res.redirect('/autorzy/'+author_id);
        } else {
            res.send("error")
        }
    });

});


app.post('/autorzy/:id/:id', async (req, res) => {
    const { nazwa, gatunek } = req.body;
    const album_id = req.params.id;
    const album  = await db.getAlbumById(album_id);

    db.insertPiesni(album_id, nazwa, gatunek).then(result => {
        if (result) {
            console.log('Piesn jest dodana');
            res.redirect('/autorzy/'+album.autor_id+"/"+album_id);
        } else {
            res.redirect('/autorzy/'+album.autor_id+"/"+album_id);
        }
    });
});




app.listen(18082, () => {
    console.log("Example app listening on port 18082");
})

