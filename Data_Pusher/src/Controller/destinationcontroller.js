const destinationmodule= require("../Module/destinationmodule")
const Destinationmodule = require("../Modules/Destinationmodule")
const accountmodule = require("../Modules/accountmodule")
const createdestination = async(req,res) => {
   try{
    let body={...req.body}

    let DestinationURL= req.params.DestinationURL

    if(Object.keys(body).length!=0)
    {
 
    const findAccountId = await accountmodule.findOne({_id : DestinationURL})    
if(findAccountId){

    const create=await destinationmodule.create(body)
    res.status(200).send(
    {
        status:true,
        msg:create

    })
}else{
    res.status(404).send(
        {
            status:false,
            msg:"Data is not present in requestbody"
   })
}
    }else{
        res.status(404).send(
            {
                status:false,
                msg:"Data is not present in requestbody"
       })

   }
   }
catch(err)
{
    res.status(400).send({
        status:false,
        msg:{err}
    })
}

}


 //-----getting a distination with filtering inputs-----//

const getfilterdestination = async(req,res) => {
    try{
        
     let params= {...req.query}
     let{DestinationURL,HTTPmethod,HTTPheader}=params
    let obj= {}
    if (DestinationURL != null)
    {
        obj.DestinationURL = DestinationURL
    }
    if (HTTPmethod != null)
    {
        obj.HTTPmethod = HTTPmethod
    }
    if (HTTPheader != null)
    {
        obj.HTTPheader = HTTPheader
    }


    
    let findfilterdistination = await destinationmodule.find(obj)
    if(Object.keys(findfilterdistination).length!=0)
    {
     res.status(200).send(
     {
         status:true,
         msg:findfilterdistination
 
     })
    }else{
         res.status(400).send(
             {
                 status:false,
                 msg:"Data doesn't exist for the given inputs"
     
 
     })
 
    }
    }
 catch(error)
 {
     res.status(400).send({
         status:false,
         message:error.message
     })
 }
 
 }
  //-----updating the destinaion with input-----//

 const updatedestination  = async (req,res)=>{
    try {
        let DestinationURL  = req.params.DestinationURL
        let updateinfo = {...req.body}
        const find_Destination = await blogmodel.findOne({isDeleted : false})

        if(find_Destination){
 
              const updatedestination = await Destinationmodule.findByIdAndUpdate(
                DestinationURL,
                updateinfo,
                {new : true}
              )

              res.status(200).send({
                status : true,
                msg : updatedestination
            }) 

        }else{
            res.status(400).send({
                status : false,
                msg : "updatedestination id doest not  exits and it is Deleted"
            })
        }
        

    } catch (error) {
        res.status(400).send({
            status : false,
            message : error.message
        })
    }
}


 //-----deleting destintion with delete using params-----//

const DeleteDestination  = async (req,res)=>{
    try {
        let DestinationURL  = req.params.blogId
        let updateinfo = {...req.body}

        const finddestination = await Destinationmodule.findOne({_id : DestinationURL , isDeleted : false})
        
        if(finddestination){
 
              const updatedestination = await Destinationmodule.findByIdAndUpdate(
                DestinationURL,
                updateinfo,
                {new : true}
              )

              res.status(200).send({
                status : true,
                msg : updatedestination
            }) 

        }else{
            res.status(400).send({
                status : false,
                msg : "DestinationURL id doest not  exits / Its Deleted"
            })
        }
        

    } catch (error) {
        res.status(400).send({
            status : false,
            message : error.message
        })
    }
}


 module.exports.createdestination=createdestination
 module.exports.getfilterdestination=getfilterdestination
 module.exports.updatedestination=updatedestination
 module.exports.DeleteDestination=DeleteDestination

 




