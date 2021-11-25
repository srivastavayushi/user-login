const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const {registerValidation} = require('./validation')

router.post('/register', async (req,res)=>{
    
    // validation
    const {error} = registerValidation(req.body);
    if(error) return res.status(200).send({errorData: error.details[0].message});


    const numberExists = await User.findOne({phone: req.body.phone});
    if(numberExists){
        return res.status(200).send({errorData: "Number already exists"})
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // New user creation
    const user = new User({
        phone: req.body.phone,
        password: hashPassword
    })

    try{
        const savedUser = await user.save();
        console.log(savedUser);
        const token = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET);
        res.send({id : savedUser._id, token: token});

    }catch(err){
        res.status(200).send({errorData: err});
    }
});

module.exports = router;