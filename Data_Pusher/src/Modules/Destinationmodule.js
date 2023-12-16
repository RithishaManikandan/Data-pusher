const mongoose = require('mongoose')
const ObjectsId=mongoose.Schema.Types.ObjectsId

const destinationmodule=new mongoose.Schema(
    {
       DestinationURL:{
       Type:ObjectsId,
       required:[true,'Destination URL is the mandatory field'],
       Ref:'Account'
       },
        HTTPmethod:{
            Type:String,
            required:[true,'HTTP method is the mandatory field']
        },
        HTTPheader:{
            Type:String,
            reuired:[true,'HTTP Header is the mandatory field']
        }
    }

)

module.exports=mongoose.modules('Destination',destinationmodule)