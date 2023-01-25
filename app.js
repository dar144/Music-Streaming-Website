const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const methodOverride = require('method-override')
const path = require('path')
const db = require('./queries')
const session = require('express-session');
var crypto = require('crypto');
const bcrypt = require('bcrypt');

var generate_key = function() {
    return crypto.randomBytes(16).toString('base64');
};

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const sessionConfig = {
    secret: 'gueb6434v7e565qc4ojnnafnlrhba!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use((req, res, next) => {
    res.locals.currentUser = req.session.user_id;
    next();
})


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


app.get('/logowanie', (req, res) => {
    res.render('strony/logowanie');
});

app.get('/logowanie/uzytkownik', async (req, res) => {
    res.render('strony/uzytkownikLog');
});

app.get('/logowanie/autor', async (req, res) => {
    res.render('strony/autorLog');
});

app.get('/wylogowanie', (req, res) => {
    req.session.user_id = null;
    res.redirect('/');
})


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

    // const isUzytkownik = await db.isUzytkownik(req.session.user_id);
    const isAutor = await db.isAutor(req.session.user_id, id);
    // console.log(isUzytkownik)
    // console.log(isAutor)

    res.render('strony/autorInfo', { autor, kraj, albumy, liczbaPiesni, isAutor });
});

app.get('/autorzy/:id/:id', async (req, res) => {
    pg = {};
    const id = parseInt(req.params.id);
    const album  = await db.getAlbumById(id);
    const autor = await db.getAutorById(album.autor_id);
    const piesni  = await db.getPiesni(album.id);
    const isAutor = await db.isAutor(req.session.user_id, autor.id);
    if(piesni.length > 0) {
        for(p of piesni) {
            const tmp = await db.getPiesniGatunki(p.id);
            pg[p.id] = tmp;
        }
    }
    const gatunki  = await db.getGatunki();
    res.render('strony/albumInfo', {autor, album, piesni, gatunki, pg, isAutor});
});

app.get('/playlisty', async (req, res) => {
    const playlisty  = await db.getPlaylisty();
    const uzytkownicy  = await db.getUzytkownicy();
    res.render('strony/playlisty', { uzytkownicy, playlisty });
});

app.get('/playlisty/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const playlista = await db.getPlaylistaById(id);
    const piesniDD = await db.getPiesniDoDodawania(id);
    const songsD = await db.getPiesniDodane(id);
    const uzytkownicySub  = await db.getUzytkownicySub(id);
    const subs  = await db.getSubByPlaylistId(id);



    res.render('strony/playlistInfo', { playlista, uzytkownicySub, subs, piesniDD, songsD });
});



app.post('/registracja/uzytkownik', async (req, res) => {
    const { imie, kraj_id, haslo } = req.body
    const sessionID = generate_key();
    const hasloHash = await bcrypt.hash(haslo, 12);

    db.insertUzytkownik(kraj_id, imie, sessionID, hasloHash).then(result => {
        if (result) {
            req.session.user_id = sessionID;
            console.log('Uzytkownik jest dodany');
            res.redirect("/")
        } else {
            res.redirect("/")
        }
    });
});

app.post('/registracja/autor', async (req, res) => {
    const { imie, kraj_id, bio, haslo } = req.body;
    const sessionID = generate_key();
    const hasloHash = await bcrypt.hash(haslo, 12);

    db.insertAutor(kraj_id, imie, bio, sessionID, hasloHash).then(result => {
        if (result) {
            console.log('Autor jest dodany');
            req.session.user_id = sessionID;
            res.redirect("/")
        } else {
            res.redirect("/")
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
            res.redirect('/gatunki');
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
            res.redirect('/autorzy/'+author_id);
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

app.post('/playlisty', async (req, res) => {
    const { nazwa, uzytkownik_id } = req.body;

    db.insertPlaylist(nazwa, uzytkownik_id).then(result => {
        if (result) {
            console.log('Playlist jest dodany');
            res.redirect('/playlisty');
        } else {
            res.redirect('/playlisty');
        }
    });
    
});

app.post('/playlisty/:id', async (req, res) => {
    const { sub_id } = req.body;
    const playlista_id = req.params.id;

    db.insertSub(sub_id, playlista_id).then(result => {
        if (result) {
            console.log('Subscriber jest dodany');
            res.redirect('/playlisty/'+playlista_id);
        } else {
            res.redirect('/playlisty'+playlista_id);
        }
    });
});

app.post('/playlisty/:id/piesni', async (req, res) => {
    const { piesn_id } = req.body;
    const playlista_id = req.params.id;

    db.insertPiesnToPlaylista(piesn_id, playlista_id).then(result => {
        if (result) {
            console.log('Piesn jest dodana do playlisty');
            res.redirect('/playlisty/'+playlista_id);
        } else {
            res.redirect('/playlisty'+playlista_id);
        }
    });
});


app.post('/logowanie/uzytkownik', async (req, res) => {
    const { imie, haslo } = req.body;
    const uczytkownik = await db.uczytkByImie(imie);
    const isValid = await bcrypt.compare(haslo, uczytkownik.haslo);

    if(isValid) {
        req.session.user_id = uczytkownik.session_id;
        res.redirect('/')
    } else {
        res.redirect('/logowanie/uzytkownik')
    }
});

app.post('/logowanie/autor', async (req, res) => {
    const { imie, haslo } = req.body;
    const autor = await db.autorByImie(imie);
    const isValid = await bcrypt.compare(haslo, autor.haslo);

    if(isValid) {
        req.session.user_id = autor.session_id;
        res.redirect('/')
    } else {
        res.redirect('/logowanie/uzytkownik')
    }
});



app.listen(18082, () => {
    console.log("Example app listening on port 18082");
})
