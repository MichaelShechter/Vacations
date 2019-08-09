const jwt = require('jsonwebtoken');
const config = require('config');
const Users = require("../models/users");


module.exports =  async (req, res, next) => {
console.log(`In admin middleware`);
    try {
        const user = await Users.findById(req.user);
        user.admin  === true ?  next()  :  res.status(401).json({ msg: "User in not admin" });
    } catch (error) {
        console.log(error) ;

    }
};
