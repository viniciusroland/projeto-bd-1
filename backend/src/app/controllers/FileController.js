const File = require('../models/File')

class FileController {
  async store(req, res) {
    const { originalname, filename } = req.file
    const file = await File.create({
      name : originalname,
      path : filename
    })
    return res.json(file)
  }
}

module.exports = new FileController()