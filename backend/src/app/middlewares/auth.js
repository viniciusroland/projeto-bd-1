const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const authConfig = require('../../config/auth')

async function checkJWTAuth(req, res, next) {
  const authHeader = req.headers.authorization
  console.log(authHeader)

  if (!authHeader) {
    return res.status(401).json({ error : 'Token not provided.'})
  }

  const token = authHeader.split(' ')[1]

  try {
    const tokenDecoded = await promisify(jwt.verify)(token, authConfig.secret)
    req.userId = tokenDecoded.id
    console.log('req.userId', req.userId)

    return next()
  } catch (err) {
    return res.status(401).json({ error : 'Token invalid.'})
  }

  return next()
}

module.exports = checkJWTAuth
