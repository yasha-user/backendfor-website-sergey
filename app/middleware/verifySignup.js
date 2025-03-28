const { json } = require("sequelize");
const db = require("../models")
const ROLES = db.ROLES
const User = db.user

checkDuplicateUsernameOrEmail= async (req, res, next) => {
    // console.dir(req.body``, { depth: null, colors: true})
    // console.log({req})
try {
    let user = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    if(user){
        return res.status(400).send({
            message: "Fail: Username is already in use"
        })
    }
    
    user = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if(user){
        return res.status(400).send({
            message: "Failed: Email is already in use"
        })
    }
    next();

} catch(err){
    console.log(err);
    return res.status(500).send({
        message: "Unable to validate Username!"
    })
}
}

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                })
                return
            }
        }
    }
    next();
}

const verifySignup = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
}

module.exports = verifySignup;