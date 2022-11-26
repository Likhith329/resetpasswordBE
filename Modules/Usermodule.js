const mongo=require('../connect')


module.exports.getuser=async(req,res)=>{
    try {
        const resp=await mongo.selectedDb.collection('Reset').find({}).toArray()
        res.send(resp)
    } catch (error) {
        console.log(error)
    }
}

module.exports.udpateuser=async(req,res)=>{
    try {
        const resp=await mongo.selectedDb.collection('Reset').updateOne({email:req.body.user.email},{$set:{password:req.body.user.password,token:'',confirmpassword:''}})
        res.send(resp)
    } catch (error) {
        console.log(error)
    }
}


