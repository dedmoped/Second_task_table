const{Router}=require('express')
const Todo =require('../models/Todo')
const router = Router()
const as= require('async');
var date = require('../date')
           
router.get('/',async(req,res)=>{ 

    let page;
    const todos = await Todo.find({}).lean()
    if(req.session.user){
    const user=Todo.findById(req.session.user);
        if(!req.user.Status){
            req.user=res.locals.user=null;
        }
    }
    if(req.user){
         
            res.render('index',{
                title:'Todos',
                todos
            })
        }
        else{
            res.redirect('/signin')
        }
    
})
    router.get('/signin',function(req,res,next){
    res.render('signin')
    })

     router.get('/registration',(req,res)=>{
    res.render('registration',
    {title:'Registration',
    isCreate:true
    })
    })
router.post('/registration',async(req,res)=>
{
    const todo = new Todo({
        Name: req.body.name,
        Password:req.body.pass,
        Email:req.body.mail,
        SessionId:req.sessionID
    })
    await todo.save()
    const todos = await Todo.findOneAndUpdate({Name:req.body.name},{Status:true},{new:true}).lean()
    req.session.user=todos._id;
    res.redirect('/')

})

router.post('/signin',async(req,res)=>
{
   const todos = await Todo.findOneAndUpdate({Name:req.body.name},{Status:true},{new:true}).lean()
   var newdate=date.last();
    await Todo.findOneAndUpdate({Name:req.body.name},{LastIn:newdate},{new:true})
    console.log(newdate)
    let username=req.body.name
    let password=req.body.pass
    if(todos){
    as.waterfall([
        function(callback){
            Todo.findOne({Name:username},callback)
        },
        function (user,callback){
            if(user){
                if(user.Password==password){
                  callback(null,user)
                }
                else{
                    res.redirect('/registration')
                }
            }
             
        }
    ],function(err,user){
        if(err) return next(err);
        req.session.user=user._id;
        res.redirect('/');
    })
}
else{
    res.redirect('/registration')
}
})

router.post('/complete',async(req,res)=>{

    if(req.session.user){
                const user=Todo.findById(req.session.user);
                    if(!req.user.Status){
                        req.user=res.locals.user=null;
                        res.redirect('/signin')
                    }
                    else{
                        const todo =await Todo.findById(req.body.id)
                        todo.Status=!!req.body.Status
                        todo.save()
                        res.redirect('/')
                    }
        }
})

router.post('/logout',async(req,res)=>{
    await Todo.findOneAndUpdate({SessionId:req.sessionID},{Status:false},{new:true})
    req.session.destroy()
    res.redirect('/signin')
})
module.exports=router