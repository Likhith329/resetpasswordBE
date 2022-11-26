const mongo=require('../connect')


module.exports.createuser=async(req,res)=>{
    //email validation
    const userexist=await mongo.selectedDb.collection('Reset').findOne({email:req.body.user.email})
    if(userexist)return res.status(400).send({msg:"You are already an existing user"})
    //password confirmation
    const confirmpassword=req.body.user.password===req.body.user.confirmpassword
    if(!confirmpassword)return res.status(400).send({msg:"Password did'nt matched"})
    //password hashing
    //saving in Db
    const createdresp=await mongo.selectedDb.collection('Reset').insertOne({...req.body.user})
    res.send(createdresp)
}