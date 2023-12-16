const Destinationmodule = require("../Modules/Destinationmodule")
const accountmodule = require("../Modules/accountmodule")
const shortid  = require('shortid')

const createaccount = async(req,res) => {
   try{
    let body={...req.body}

let{EmailId,AccountId,AccountName,AppSecretToken,Website}= body


const secretKey  = shortid.generate()

res.setheader('x-auth-secret-Key', secretKey)

AppSecretToken = secretKey
    const findAccountId = await accountmodule.findOne({AccountId : AccountId})

    if(findAccountId){
    return res.status(400).send({
        status : false,
        message : 'Account Id already is Exists'
    })
    }

    if(Object.keys(body).length!=0)
    {
     
     let userdata = {
        EmailId,
        AccountId,
        AccountName,
        AppSecretToken,
        Website
     }   


    const create=await accountmodule.create(userdata)
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
   }
catch(err)
{
    res.status(400).send({
        status:false,
        msg:{err}
    })
}

}


 //-----getting a account with filtering inputs-----//

const getfilteraccount = async(req,res) => {
    try{
        
     let params= {...req.query}
     let{EmailId,AccountId,AccountName,AppSecretToken,Website,isDeleted}=params
    let obj= {}
    if (EmailId != null)
    {
        obj.EmailId = EmailId
    }
    if (AccountId != null)
    {
        obj.AccountId = AccountId
    }
    if (AccountName != null)
    {
        obj.AccountName = AccountName
    }
    if (AppSecretToken != null)
    {
        obj.AppSecretToken = AppSecretToken
    }

    if (Website != null)
    {
        obj.Website = Website
    }
    if (isDeleted != null)
    {
        obj.isDeleted = isDeleted
    }


    let findfilteraccount = await accountmodule.find(obj)
    if(Object.keys(findfilteraccount).length!=0)
    {
     res.status(200).send(
     {
         status:true,
         msg:findfilteraccount
 
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

 const updateaccount  = async (req,res)=>{
    try {
        let AccountId  = req.params.AccountId
        let updateinfo = {...req.body}
        const find_account = await accountmodule.findOne({isDeleted : false})

        if(find_account){
 
              const updatedaccount = await accountmodule.findByIdAndUpdate(
                AccountId,
                updateinfo,
                {new : true}
              )

              res.status(200).send({
                status : true,
                msg : updatedaccount
            }) 

        }else{
            res.status(400).send({
                status : false,
                msg : "account id doest not  exits and it is Deleted"
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

const DeleteAccount  = async (req,res)=>{
    try {
        let AccountId  = req.params.AccountId
        let userId = req.params.userId
        let updateinfo = {...req.body}

        const findaccount = await accountmodule.findOne({_id : AccountId , isDeleted : false})
        
        if(findaccount){
 
              const deleteaccount = await accountmodule.findByIdAndUpdate(
                AccountId,
                {$set : {isDeleted : true}},
                {new : true}
              )

            const findId = await Destinationmodule.findOne({_id : userId})

            if(findId){

              const  DeleteDestination = await Destinationmodule.findByIdAndUpdate(
                AccountId,
                {$set : {isDeleted : true}},
                {new : true}
              )

              res.status(200).send({
                status : true,
                msg : deleteaccount, 
            }) 
        }

        }else{
            res.status(400).send({
                status : false,
                msg : "AccountId id doest not  exits / Its Deleted"
            })
        }
        

    } catch (error) {
        res.status(400).send({
            status : false,
            message : error.message
        })
    }
}


 module.exports.createaccount=createaccount
 module.exports.getfilteraccount=getfilteraccount
 module.exports.updateaccount=updateaccount
 module.exports.DeleteAccount=DeleteAccount

 




