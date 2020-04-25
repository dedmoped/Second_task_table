
const express= require('express')
const mongoose=require('mongoose')
const expresshbs=require('express-handlebars')
const todoRoutes=require('./routes/todos')
const session=require('express-session')
var MongoStore=require('connect-mongo')(session)


const Port = process.env.Port || 3000
const app = express()

const hbs = expresshbs.create({defaultLayout:'main',extname:'hbs'})
const path =require('path')

app.use(session({
secret:'sekret-key',
resave:false,
saveUninitialized:false,
store: new MongoStore({url:'mongodb+srv://vania:Passw0rd@cluster0-lzqjh.mongodb.net/todos'})}))

app.use(require("./middleware/loadUser"))

app.engine('hbs',hbs.engine);
app.set('view engine','hbs')
app.set('views','views');
app.use(express.urlencoded({extended:true}))
app.use(todoRoutes);
app.use(express.static(path.join(__dirname,'public')))

async function start(){
    try{
        await mongoose.connect('mongodb+srv://vania:Passw0rd@cluster0-lzqjh.mongodb.net/todos',
        {useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology: true,
    });
        app.listen(Port,()=>{console.log('Server started')})
    }
    catch(e){
        console.log(e);
    }
}

start();