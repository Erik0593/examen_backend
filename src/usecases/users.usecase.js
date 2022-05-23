const createError = require('http-errors')
const User = require('../models/users.model')
const bcrypt = require('bcrypt')
const jwt = require('../lib/jwt.lib')

function getUser () {
    return User.find()
}

function getById(id) {
    return User.findById(id)
}


function deletedById (id) {
    return User.findByIdAndDelete(id)
}

function updatedById (id, newUserData){
    return User.findByIdAndUpdate(id, newUserData)
}

async function create (userData){
    const userFound = await User.findOne({email: userData.email})
    if(userFound){
        throw new createError(412, 'User already exists')
    }

    const hash = await bcrypt.hash(userData.password, 10)
    userData.password = hash

    return User.create(userData)
}


async function login(email, password){
    const userFound = await User.findOne({email})
    if(!userFound){
        throw new createError(401, 'Invalid Data')
    }
    const isValidPassword = await bcrypt.compare(password, userFound.password)
    if(!isValidPassword){
        throw new createError(401, 'Invalid Data')
    }
    return jwt.sign({id: userFound._id })
}


module.exports = {
    getUser,
    getById,
    create,
    deletedById,
    updatedById,
    login
}