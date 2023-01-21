const { Pool } = require('pg');

const pool = new Pool({
    user: 'u0haidukevich',
    // database: 'u0haidukevich',
    database: process.env.DATABASE_NAME,
    // password: '0haidukevich',
    password: process.env.DATABASE_PASSWORD,
    // port: 5432,
    port: process.env.DATABASE_PORT
})


// const updateUser = async (nazwisko, imie, id) => {
//     try {
//         await pool.query(
//             `UPDATE lab04.uczestnik SET nazwisko = $1, imie = $2 WHERE id_uczestnik = $3`,
//             [nazwisko, imie, id]);
//         return true;
//     } catch (error) {
//         console.error(error.stack);
//         return false;
//     } 
// }

// const deleteUser = async (id) => {
//     try {
//         // await pool.query(`DELETE FROM lab04.uczest_kurs WHERE id_uczest = $1;
//         // DELETE FROM lab04.uczestnik WHERE id_uczestnik = $1;`, [id]);
//         await pool.query(`DELETE FROM lab04.uczest_kurs WHERE id_uczest = $1;`, [id]);
//         await pool.query(`DELETE FROM lab04.uczest_zaj WHERE id_uczest = $1;`, [id]);
//         await pool.query(`DELETE FROM lab04.uczestnik WHERE id_uczestnik = $1;`, [id]);
//         return true;
//     } catch (error) {
//         console.error(error.stack);
//         return false;
//     } 
// }

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

const getAlbumy = async (id) => {
    try {
        const albumy = await pool.query('SELECT * FROM projekt.albumy WHERE autor_id=$1 ORDER BY year', [id]);
        return albumy.rows;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const getPiesni = async (id) => {
    try {
        const piesni = await pool.query('SELECT * FROM projekt.piesni WHERE album_id=$1 ORDER BY nazwa', [id]);
        return piesni.rows;
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const countUzytkownicy = async () => {
    try {
        const count = await pool.query('SELECT COUNT(*) FROM projekt.uzytkownicy');
        return count.rows[0];
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const countAutorzy = async () => {
    try {
        const count = await pool.query('SELECT COUNT(*) FROM projekt.autorzy');
        return count.rows[0];
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const countGatunki = async () => {
    try {
        const count = await pool.query('SELECT COUNT(*) FROM projekt.gatunki');
        return count.rows[0];
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const countAlbumy = async () => {
    try {
        const count = await pool.query('SELECT COUNT(*) FROM projekt.albumy');
        return count.rows[0];
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const countPiesni = async () => {
    try {
        const count = await pool.query('SELECT COUNT(*) FROM projekt.piesni');
        return count.rows[0];
    } catch (error) {
        console.error(error.stack);
        return null;
    }
};

const insertUzytkownik = async (id, kraj_id, imie) => {
    try {
        await pool.query(
            `INSERT INTO projekt.uzytkownicy ("id", "kraj_id", "imie", "utworzono", "zaktualizowano")  
             VALUES ($1, $2, $3, current_timestamp, null)`, [id, kraj_id, imie]);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const insertAutor = async (id, kraj_id, imie, bio) => {
    try {
        await pool.query(
            `INSERT INTO projekt.autorzy ("kraj_id", "imie", "bio",  "utworzono", "zaktualizowano")  
             VALUES ($1, $2, $3, current_timestamp, null)`, [kraj_id, imie, bio]);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const insertGatunek = async (id, nazwa) => {
    try {
        await pool.query(
            `INSERT INTO projekt.gatunki ("id", "nazwa", "utworzono", "zaktualizowano")  
             VALUES ($1, initcap($2), current_timestamp, null)`, [id, nazwa]);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const insertAlbum = async (id, author_id, nazwa, year) => {
    try {
        await pool.query(
            `INSERT INTO projekt.albumy ("id", "autor_id", "nazwa", "year", "utworzono", "zaktualizowano")  
             VALUES ($1, $2, $3, $4, current_timestamp, null)`, [id, author_id, nazwa, year]);
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

const getAutorByAlbumId = async (id) => {
    try {
        const autor = await pool.query(`
        SELECT imie FROM projekt.autorzy 
        JOIN projekt.albumy ON projekt.autorzy.id = projekt.albumy.autor_id
        WHERE projekt.albumy.id=$1;`, [id]);
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

const insertPiesni = async (id, album_id, nazwa) => {
    try {
        await pool.query(
            `INSERT INTO projekt.piesni ("id", "album_id", "nazwa", "ranking", "utworzono", "zaktualizowano")  
             VALUES ($1, $2, $3, 0, current_timestamp, null)`, [id, album_id, nazwa]);
        return true;
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
    countUzytkownicy,
    countAutorzy,
    countGatunki,
    countAlbumy,
    countPiesni,
    insertUzytkownik,
    insertAutor,
    insertGatunek,
    insertAlbum,
    insertPiesni,
    getAutorById,
    getKrajById,
    getAlbumById,
    getAutorByAlbumId,
}