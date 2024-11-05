const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const fs = require("fs");
const multer = require("multer");

const app = express();
const port = 8000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(session({
    secret: '2prz6ych6odz2i!b0aba8@do4#le4kar8za$0a%l3eka5rz^5tez1&ba1ba',
    resave: false,
    saveUninitialized: true
}));

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/uploads', express.static('uploads'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.listen(port, (err) => {
    if (err)    console.log(err);
    else        console.log("Server started on port: "+port);
});

// ***** łączenie z bazą danych SQL *****

const dbname = "sprzedawczyk_db"

let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: dbname
});

db.connect((err) => {
    if (err) console.log(err);
    else console.log("Connected to database "+dbname);
});

// ***** logowanie *****
app.post('/api/login', (req, res) => {
    const { loginUsername, loginPassword } = req.body;
    const query = `SELECT * FROM users WHERE username='${loginUsername}'`;

    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }

        const user = result[0];
        if (!user) {
            return res.status(404).send('User not found');
        } else if (user.password !== loginPassword) {
            return res.status(401).send('Incorrect password');
        } else {
            req.session.userID = user.user_id;
            req.session.isAdmin = user.admin;
            console.log('User logged in:', req.session.userID, 'Admin:', req.session.isAdmin);
            return res.send({ userId: user.user_id, userName: user.username, isAdmin: user.admin });
        }
    });
});

// ***** rejestracja *****
app.post('/api/register', (req, res) => {
    const { registerUsername, registerPassword, registerPassword2, registerEmail, registerPhone } = req.body;
    const query = `SELECT * FROM users WHERE username='${registerUsername}'`;

    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Błąd serwera');
            return;
        }

        if (result.length > 0) {
            res.status(400).send('Użytkownik o takiej nazwie już istnieje.');
        } else {
            const registerQuery = `INSERT INTO users (username, password, email, phone) VALUES ('${registerUsername}', '${registerPassword}', '${registerEmail}', '${registerPhone}')`;
            db.query(registerQuery, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Błąd serwera');
                    return;
                }
                res.send('Zarejestrowano pomyślnie!');
            });
        }
    });
});

// ***** wysyłanie plików na serwer *****
app.post('/api/upload', upload.single('image'), (req, res) => {
    const { addTitle, addLocation, addCategory, addDescription, addPrice, addImage, userId } = req.body;

    let imagePath = null;

    if (req.file) {
        const dir = 'uploads';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        const fileName = `${Date.now()}_${req.file.originalname}`;
        imagePath = `${dir}/${fileName}`;

        fs.writeFile(imagePath, req.file.buffer, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Błąd serwera");
            }
        });
    }

    const query = `INSERT INTO POSTS (user_id, title, location, category, description, price, image) VALUES (${userId}, '${addTitle}', '${addLocation}', '${addCategory}', '${addDescription}', ${addPrice}, '${imagePath}')`;
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Database error');
        }
        res.send('Form submitted successfully');
    });
});

// ***** pobieranie ogłoszeń z bazy danych *****
app.get("/api/posts", (req, res) => {
    const query = "SELECT * FROM posts JOIN users ON posts.user_id = users.user_id";
    db.query(query, (err, result) => {
        if (err) console.log(err);
        res.json(result);
    });
});

// ***** pobieranie danego ogłoszenia *****
app.get('/api/post/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT posts.*, users.*
        FROM posts 
        JOIN users ON posts.user_id = users.user_id 
        WHERE posts.post_id = ?
    `;

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.send('Błąd serwera');
        }

        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.send('Nie znaleziono ogłoszenia');
        }
    });
});

// ***** wyszukiwanie ogłszenia na podstawie podanych kryteriów *****
app.get('/api/search', (req, res) => {
    const { searchText, searchCategory, searchFromPrice, searchToPrice, searchLocation } = req.query;

    let query = "SELECT * FROM posts WHERE 1=1";

    if (searchText) {
        query += ` AND title LIKE '%${searchText}%'`;
    }
    if (searchCategory && searchCategory !== 'anycategory') {
        query += ` AND category='${searchCategory}'`;
    }
    if (searchFromPrice) {
        query += ` AND price >= ${searchFromPrice}`;
    }
    if (searchToPrice) {
        query += ` AND price <= ${searchToPrice}`;
    }
    if (searchLocation) {
        query += ` AND location LIKE '%${searchLocation}%'`;
    }

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching search results:', err);
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
});

// ***** usuwanie ogłoszeń oraz dodanych do nich zdjęć *****
app.delete('/api/post/:id', (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    const adminCheckQuery = 'SELECT admin FROM users WHERE user_id = ?';
    db.query(adminCheckQuery, [userId], (err, adminResults) => {
        if (err) {
            console.error('Error checking admin status:', err);
            return res.status(500).send('Database error');
        }

        if (adminResults.length > 0) {
            const isAdmin = adminResults[0].admin === 1; 
            console.log(`Admin status for user ${userId}: ${isAdmin}`);

            const imagePathQuery = 'SELECT image FROM posts WHERE post_id = ?';
            db.query(imagePathQuery, [id], (err, imageResults) => {
                if (err) {
                    console.error('Error retrieving image path:', err);
                    return res.status(500).send('Database error');
                }

                if (imageResults.length > 0) {
                    const imagePath = imageResults[0].image;
                    console.log(`Image path for post ${id}: ${imagePath}`);

                    let deleteQuery = 'DELETE FROM posts WHERE post_id = ?';
                    const queryParams = [id];

                    if (!isAdmin) {
                        deleteQuery += ' AND user_id = ?';
                        queryParams.push(userId);
                    }

                    db.query(deleteQuery, queryParams, (err, result) => {
                        if (err) {
                            console.error('Error deleting post:', err);
                            return res.status(500).send('Database error');
                        }

                        if (result.affectedRows > 0) {
                            const fullImagePath = `./${imagePath}`;
                            fs.unlink(fullImagePath, (err) => {
                                if (err) {
                                    console.error('Error deleting image file:', err);
                                } else {
                                    console.log('Image file deleted:', fullImagePath);
                                }
                            });

                            res.send('Post and associated image deleted successfully');
                        } else {
                            res.status(403).send('You are not authorized to delete this post');
                        }
                    });
                } else {
                    res.status(404).send('Post not found');
                }
            });
        } else {
            res.status(404).send('User not found');
        }
    });
});