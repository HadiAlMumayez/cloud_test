const Folder = require('../models/Folder');

class FolderController {
  async store(req, res) {
    const { key } = req.file;
    const {
      originalname: name,
      location: url = `${process.env.APP_URL}/Folder/${key}`
    } = req.folder;
    const { user_id = 2 } = req;
    const folder = await Folder.create({
      user_id,
      key,
      name,
      url
    });

    return res.json(folder);
  }

  async index(req, res) {
    const { user_id } = req;

    const folders = await Folder.findAll({ where: { user_id } });
    return res.json(folders);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Folder.destroy({ where: { id }, individualHooks: true });

    return res.status(200).send();
  }
}

module.exports = new FolderController();
