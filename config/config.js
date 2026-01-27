require('dotenv').config()

module.exports = {
    "ATLASDB": process.env.ATLASDB,
    "JWT_SCRET": process.env.JWT_SECRET
}