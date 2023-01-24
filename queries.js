const { fromByteArray } = require('ipaddr.js');
const { Pool } = require('pg');
const { uptime } = require('process');

const pool = new Pool({
    user: 'u0haidukevich',
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
})


const getPlaylisty = async () => {
    try {
        const playlisty = await pool.query('SELECT * FROM projekt.playlist_imie_widok');
        return playlisty.rows;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const getKraje = async () => {
    try {
        const kraje = await pool.query('SELECT * FROM projekt.kraje ORDER BY id');
        return kraje.rows;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const getGatunki = async () => {
    try {
        const gatunki = await pool.query('SELECT * FROM projekt.gatunki ORDER BY id');
        return gatunki.rows;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const getAutorzy = async () => {
    try {
        const autorzy = await pool.query('SELECT * FROM projekt.autorzy ORDER BY id');
        return autorzy.rows;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const getUzytkownicy = async () => {
    try {
        const uzytkownicy = await pool.query('SELECT * FROM projekt.uzytkownicy ORDER BY id');
        return uzytkownicy.rows;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const getSubByPlaylistId = async (id) => {
    try {
        const sub = await pool.query(`SELECT u.id, u.imie FROM projekt.uzytkownicy u
                                      JOIN projekt.uzytkownicy_playlisty up ON up.uzytkownik_id = u.id
                                      WHERE playlista_id = $1
                                      AND rola = 'sluchacz';`, [id]);
        return sub.rows;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
}; 

const getAlbumy = async (id) => {
    try {
        const albumy = await pool.query('SELECT * FROM projekt.albumy WHERE autor_id=$1 ORDER BY rok', [id]);
        return albumy.rows;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const getLiczbaPiesni = async (id) => {
    try {
        const liczbaPiesniByAutor = await pool.query('SELECT count FROM projekt.liczba_piesni_widok WHERE autor_id=$1', [id]);
        return liczbaPiesniByAutor.rows[0]?.count;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
}

const getPiesni = async (id) => {
    try {
        const piesni = await pool.query('SELECT * FROM projekt.piesni WHERE album_id=$1 ORDER BY nazwa', [id]);
        return piesni.rows;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const getPiesniGatunki = async (id) => {
    try {
        const pg = await pool.query(`SELECT nazwa FROM projekt.gatunki JOIN projekt.piesni_gatunki
        ON projekt.piesni_gatunki.gatunek_id = projekt.gatunki.id WHERE projekt.piesni_gatunki.piesn_id=$1`, [id])
        return pg.rows
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};




const insertUzytkownik = async (kraj_id, imie) => {
    try {
        await pool.query(
            `INSERT INTO projekt.uzytkownicy ("kraj_id", "imie")  
             VALUES ($1, $2)`, [kraj_id, imie]);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const insertSub = async (sub_id, playlista_id) => {
    try {
        await pool.query(
            `INSERT INTO projekt.uzytkownicy_playlisty ("uzytkownik_id", "playlista_id", "rola")  
             VALUES ($1, $2, 'sluchacz')`, [sub_id, playlista_id]);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const insertAutor = async (kraj_id, imie, bio) => {
    try {
        await pool.query(
            `INSERT INTO projekt.autorzy ("kraj_id", "imie", "bio")  
             VALUES ($1, $2, $3)`, [kraj_id, imie, bio]);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const insertGatunek = async (nazwa) => {
    try {
        await pool.query(
            `INSERT INTO projekt.gatunki ("nazwa")  
             VALUES (initcap($1))`, [nazwa]);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const insertAlbum = async (author_id, nazwa, rok) => {
    try {
        await pool.query(
            `INSERT INTO projekt.albumy ("autor_id", "nazwa", "rok")  
             VALUES ($1, $2, $3)`, [author_id, nazwa, rok]);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const getAutorById = async (id) => {
    try {
        const autor = await pool.query(`SELECT * FROM projekt.autorzy WHERE id = $1`, [id]);
        return autor.rows[0];
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};


const getKrajById = async (id) => {
    try {
        const kraj = await pool.query(`SELECT nazwa FROM projekt.kraje WHERE id = $1`, [id]);
        return kraj.rows[0];
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const getAlbumById = async (id) => {
    try {
        const album = await pool.query(`SELECT * FROM projekt.albumy WHERE id = $1`, [id]);
        return album.rows[0];
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const getPlaylistaById = async (id) => {
    try {
        const playlista = await pool.query(`SELECT * FROM projekt.playlist_imie_widok WHERE id = $1`, [id]);
        return playlista.rows[0];
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const getPiesniDoDodawania = async (id) => {
    try {
        const playlista = await pool.query(`SELECT p.id, p.nazwa, apw.imie FROM projekt.piesni p
        JOIN projekt.autor_piesn_widok apw ON apw.piesn_id = p.id
        WHERE NOT EXISTS 
        ( SELECT * FROM projekt.playlisty_piesni pp WHERE p.id = pp.piesn_id AND playlista_id = $1)`, [id]);
        return playlista.rows;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};



const getUzytkownicySub = async (id) => {
    try {
        const uzytkownicySub = await pool.query(
            `SELECT * FROM projekt.uzytkownicy u
             WHERE NOT EXISTS 
             ( SELECT * FROM projekt.uzytkownicy_playlisty up WHERE u.id = up.uzytkownik_id AND playlista_id = $1 ) ;`, [id]);
        return uzytkownicySub.rows;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const insertPiesni = async (album_id, nazwa, gatunek) => {
    try {
        const piesn = await pool.query(`SELECT * FROM projekt.piesni WHERE album_id = $1 AND nazwa = $2`, [album_id, nazwa]);
        
        if(piesn.rowCount == 0 && gatunek != undefined) {
            const piesn_id = await pool.query(
            `INSERT INTO projekt.piesni ("album_id", "nazwa", "ranking")  
                VALUES ($1, $2, 0) RETURNING id;`, [album_id, nazwa]);

            if(Array.isArray(gatunek)) {
                for(g of gatunek) {
                    await pool.query(`INSERT INTO projekt.piesni_gatunki ("piesn_id", "gatunek_id")  
                                    VALUES ($1, $2)`, [piesn_id.rows[0]?.id, parseInt(g)]);            
                }
            } else {
                await pool.query(`INSERT INTO projekt.piesni_gatunki ("piesn_id", "gatunek_id")  
                VALUES ($1, $2)`, [piesn_id.rows[0]?.id, parseInt(gatunek)]);   
            }
        } else {
            return false;
        }

        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};


const insertPlaylist = async (nazwa, uzytkownik_id) => {
    try {
        const playlista = await pool.query(`SELECT * FROM projekt.playlisty WHERE nazwa = $1`, [nazwa]);
        
        if(playlista.rowCount == 0) {
            const playlista_id = await pool.query(
            `INSERT INTO projekt.playlisty ("nazwa")  
                VALUES ($1) RETURNING id;`, [nazwa]);

            await pool.query(`INSERT INTO projekt.uzytkownicy_playlisty ("uzytkownik_id", "playlista_id", "rola")  
                VALUES ($1, $2, $3)`, [parseInt(uzytkownik_id), playlista_id.rows[0]?.id, 'tworca']); 

        } else {
            return false;
        }

        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const insertPiesnToPlaylista = async (piesn_id, playlista_id) => {
    try {
        await pool.query(`INSERT INTO projekt.playlisty_piesni ("playlista_id", "piesn_id")  
        VALUES ($1, $2)`, [parseInt(playlista_id), parseInt(piesn_id)]); 
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};


const getPiesniDodane = async (id) => {
    try {
        const piesni = await pool.query(`SELECT apw.imie, apw.nazwa FROM projekt.playlisty_piesni pp
        JOIN projekt.autor_piesn_widok apw ON apw.piesn_id = pp.piesn_id
        WHERE playlista_id = $1;`, [id]); 
        return piesni.rows;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};



module.exports = {
    getKraje,
    getGatunki,
    getAutorzy,
    getAlbumy,
    getPiesni,
    getPiesniDodane,
    getPiesniDoDodawania,
    getPlaylisty,
    getUzytkownicy,
    getPiesniGatunki,
    getUzytkownicySub,
    getSubByPlaylistId,
    insertUzytkownik,
    insertAutor,
    insertGatunek,
    insertAlbum,
    insertPiesni,
    insertPlaylist,
    insertSub,
    insertPiesnToPlaylista,
    getAutorById,
    getKrajById,
    getAlbumById,
    getPlaylistaById,
    getLiczbaPiesni
}