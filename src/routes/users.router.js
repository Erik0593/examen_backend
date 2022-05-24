const express = require('express')
const createError = require('http-errors')
const User = require('../usecases/users.usecase')
const auth = require('../middleware/auth.middleware')
const router = express.Router()


router.get('/', auth ,async (request, response) => {
    try {
        const allUsers = await User.getUser()
        response.json({
            ok: true,
            user: allUsers
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok:false,
            message: error.message
        })
    }
})

router.get('/:id', auth, async (request, response) => {
    try {
        const userFound = await User.getById(request.params.id)
        if(!userFound){
            throw new createError(404, 'User not found')
        }
        response.json({
           ok: true,
            user: userFound
        })    
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok:false,
            message: error.message
        })
    }
    
})

router.delete('/:id',auth, async (request, response) => {
    try {
        const userDeleted = await User.deletedById(request.params.id)
        response.json({
            ok:true,
            user: userDeleted
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok:false,
            message: error.message
        })
    }
})

router.post('/', async (request, response) => {
    try {
        const userCreated = await User.create(request.body)
        response.json({
            ok:true,
            message: 'Usuario Creado',
            New_user: userCreated
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok:false,
            message: error.message
        })
    }
})

router.patch('/:id',auth, async (request, response) => {
    try {
        const userUpdated = await User.updatedById(request.params.id, request.body)
        response.json({
            ok:true,
            user: userUpdated
        })
   } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok:false,
            message: error.message
      }) 
    }
})

module.exports = router
