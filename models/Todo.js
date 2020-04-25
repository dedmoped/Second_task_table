const{Schema,model}=require('mongoose')
const today =require('../date')
const schema = new Schema({

    Name:{
      type:String,
    },
    Status:{
      type:Boolean,
      default:true
    },
    LastIn:{
      type:String,
      default:today.last()
    },
    FirstIn:
    {
      type:String,
      default:today.last()
    },
    Password:
    {
      type:String
    },
    Email:
    {
      type:String
    },
    SessionId:
    {
     type:String
    }
})

module.exports= model('Users',schema)
