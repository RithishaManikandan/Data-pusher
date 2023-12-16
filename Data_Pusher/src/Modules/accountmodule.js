const mongoose=require('mongoose')
const accountmodule = new mongoose.schema(
    {
       EmailId:{
        type:String,
        required:[true,'E-mail ID is Mandatory'],
        unique:[true,'E-Mail ID should be unique'],
        match:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
       },
       AccountId:{
        type:number,
        unique:[true,'Account ID should be unique']
       },
       AccountName:{
        type:String,
        required:[true,'Account Name is Mandatory']
       },
       AppSecretToken:{
        type:String,
        Default:''
        },
       Website:{
        type:String,
        required:[true,'Website is Optional'],
        match:/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
       },
       isDeleted : {
        type : Boolean,
        default: false
       }

    }
)
module.exports=mongoose.Modules('Account',accountmodule)