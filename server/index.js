const express=require("express")
const mysql=require("mysql")
const bodyparser=require("body-parser")
const cors=require("cors")
const session=require("express-session")
const fs=require("fs")
const multer=require("multer")

const app=express()

const port=8000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.use(session({
    secret: 'abc',
    resave: false,
    saveUninitialized: true
  }));

const corsOptions={
    origin: 'http://localhost:5173',
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions))

app.use('/uploads', express.static('uploads'));

const storage=multer.memoryStorage();
const upload=multer({storage:storage})

app.listen(port, (err)=>{
    if(err) console.log(err);
    else    console.log("server started, port: 8000")
})

// sql

let db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"sprzedawczyk_db"
})

db.connect((err)=>{
    if(err) console.log(err)
    else    console.log("connected to database")
})

// LOGIN

app.post('/api/login', (req,res)=>{
    
    const{loginUsername, loginPassword}=req.body

    const query=`SELECT * FROM users WHERE username=\'${loginUsername}\'`

    db.query(query, (err, result)=>{
        if(err) console.log(err)
        
        const user=result[0]

        if(result.length<=0){
            res.status(404).send("User not found")
        }
        
        else if(user.password!=loginPassword){
            console.log("bad password")
            res.status(401).send("Incorrect password")
        }

        else{
            req.session.userID=user.user_id
            console.log("GOOD password")
            res.send({userId:user.user_id, userName:user.username})
        }
    })
    
})

// REGISTER

app.post('/api/register', (req, res) => {
    const { registerUsername, registerPassword, registerPassword2, registerEmail, registerPhone } = req.body;  
    
    const query = `SELECT * FROM users WHERE username=\'${registerUsername}\'`;
    
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

//image upload

app.post('/api/upload', upload.single('image'), (req,res)=>{
    const {addTitle, addLocation, addCategory, addDescription, addPrice, addImage, userId}=req.body

    let imagePath=null;
    
    if(req.file){
        const dir = './uploads';
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);
    

        const fileName=`${Date.now()}_${req.file.originalname}`;
        imagePath=`/uploads/${fileName}`

        fs.writeFile(imagePath, req.file.buffer, (err)=>{
            if(err){
                console.log(err);
                return res.status(500).send("Błąd serwera")
            }
        })
    }

    const query=`INSERT INTO POSTS (user_id, title, location, category, description, price, image) VALUES (${userId}, '${addTitle}', '${addLocation}', '${addCategory}', '${addDescription}', ${addPrice}, '${imagePath}')`
    db.query(query, (err, result)=>{
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Database error');
          }
          res.send('Form submitted successfully');
    })
})

app.get("/api/posts", (req, res)=>{
    const query="SELECT * FROM posts"
    db.query(query, (err, result)=>{
        if(err) console.log(err)
        res.json(result)
    })
})