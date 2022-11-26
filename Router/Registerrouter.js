const express=require('express')
const router=express.Router()

const Registermodule=require('../Modules/Registermodule')
router.post('/signup',Registermodule.createuser)

module.exports=router;