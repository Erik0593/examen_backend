require('dotenv').config()
const mongoose = require('mongoose')

const server = require('./src/server')

const {
    DB_USER,DB_PASSWORD,DB_NAME,DB_HOST
} = process.env

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`)
.then(
    server.listen(8080, () => {
        console.log('API is ready on http://localhost:8080')
    })
)
.catch(error => {
    console.error('DB connection error: ', error)
}
)

