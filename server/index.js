const express=require("express")
const mysql=require("mysql")
const bodyparser=require("body-parser")
const cors=require("cors")
const session=require("express-session")

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

app.use(express.static("/public"));

app.listen(port, (err)=>{
    if(err) console.log(err);
    else    console.log("server started, port: 8000")
})

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
            res.status(500).send('Server error');
            return;
        }

        if (result.length > 0) {
            res.status(400).send('Username taken');
        } else {
            const registerQuery = `INSERT INTO users (username, password, email, phone) VALUES ('${registerUsername}', '${registerPassword}', '${registerEmail}', '${registerPhone}')`;
            db.query(registerQuery, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Server error');
                    return;
                }
                res.send('Registration successful');
            });
        }
    });
});
