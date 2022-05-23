const express = require('express')
const usersRouter = require('./routes/users.router')
const authRouter = require('./routes/auth.router')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(cors())
app.use('/user', usersRouter)
app.use('/auth', authRouter)


app.get('/', (request, response) => {
    response.json({
        ok:true,
        message: 'API Examen'
    })
})


module.exports = app