const express=require('express')
const router=express.Router()

const Usermodule=require('../Modules/Usermodule')
router.get('/get',Usermodule.getuser)
router.put('/update',Usermodule.udpateuser)

module.exports=router;