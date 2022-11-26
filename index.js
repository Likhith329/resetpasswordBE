const dotenv=require('dotenv')
dotenv.config()



//json web token
const jwt=require('jsonwebtoken')

//express server
const express=require('express')
const app=express()
//buit-in middleware
app.use(express.json())

//mongodb connection
const mongo=require('./connect')
mongo.connect()


//cross origin resource sharing(cors)
const cors=require('cors')
app.use(cors())


//nodemailer
const nodemailer=require('nodemailer')

//email function
function sendEmail(email,link){
    return new Promise((resolve,reject)=>{
        //transporter is the object which is used to send emails
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'emypersonalemail@gmail.com',
                pass:process.env.PASS
            }
        })
         //mail configurations
        const mail_configs={
            from:'emypersonalemail@gmail.com',
            to:email,
            subject:'Reset-password',
            text:`To reset your password ,click on the link ${link}`
        }
        //sending the mail
        transporter.sendMail(mail_configs,(error)=>{
            if(error) {
                console.log(error)
                reject({message:"error occured"})}
            return  resolve({message:"email sent successfully!"})
        })
    })
}

//importing routers
const Registerrouter=require('./Router/Registerrouter')
const Userrouter=require('./Router/Userrouter')

//routes
app.use('/register',Registerrouter)
app.use('/users',Userrouter)

//secret key or privatekey
const privatekey=process.env.PRIVATE_KEY

// creation of token and sending the token through email
app.post('/forgotpassword',async(req,res)=>{

    //token creation 
    const token=jwt.sign(req.body.user,privatekey,{expiresIn:'120s'})
    //updating the token to database
    await mongo.selectedDb.collection('Reset').updateOne({email:req.body.user.email},{$set:{token:token}})
    //creating and sending the link through email
    const link=`https://resetpasswordfe.netlify.app/resetpassword/${req.body.user.email}/${token}`
    sendEmail(req.body.user.email,link).then(resp=> res.send(resp)).catch(error=>res.send(error))
 
})


//listening to server
app.listen(process.env.PORT)


