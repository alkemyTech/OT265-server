const db = require("../models/index.js");
const News = db.News;
const Category = db.Category;
const { uploadImage } = require("../services/uploadImages");

const getAllNews = async (err, req, res, next) => {
  try {
    const allNews = await News.findAll();

    if (!allNews) {
      res.status(200).json({
        ok: true,
        message: "There are no news available.",
      });
    } else {
      res.status(200).json({
        ok: true,
        data: allNews,
      });
    }
  } catch (err) {
    next(err);
  }
};

const getNewById = async (req, res) => {
  const { id } = req.params;

  try {
    const news = await News.findOne({
      where: { id },
      include: [{
        model: Category,
        as: 'category',
        attributes: ['name']
      }]
    });

    if (!news) {
      return res.status(200).json({
        ok: true,
        msg: `There is no news with id: ${id}.`
      });
    }

    res.status(200).json({
      ok: true,
      data: news,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      message: "Server side error, contact an Administrator."
    })
  }
};

const postNews = async (req, res) => {
  const { name, content, categoryId } = req.body;

  try {

    let imgUrl = ''

    if (req.files) {
      
      const { image } = req.files;
      imgUrl = await uploadImage(image);

      if (imgUrl === '') {
        return res.status(400).json({
          ok: false,
          msg: 'Extension not supported.'
        })
      }
    }

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(400).json({
        ok: false,
        msg: 'This category does not exist.'
      })
    }

    const news = await News.create({ name, content, categoryId, image: imgUrl });

    res.status(200).json({
      ok: true,
      msg: 'Created.',
      data: news
    })

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      msg: 'Server side error. Contact and Administrator.'
    })
  }
};

const putNews = async (req, res) => {
  const { name, content, categoryId } = req.body;

  try {
    const { id } = req.params;

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(400).json({
        ok: false,
        msg: `There is no news with id: ${id}.`
      })
    }

    if (name) news.name = name;
    if (content) news.content = content;
    if (categoryId) news.categoryId = categoryId;

    if (categoryId) {
      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.json({
          ok: false,
          msg: 'This category does not exist.'
        })
      }

      news.categoryId = categoryId;
    }

    if (req.files) {
      const { image } = req.files;
      const imgUrl = await uploadImage(image);
      if (imgUrl === '') {
        return res.json({
          ok: false,
          msg: 'Extension not supported.'
        })
      }

      news.image = imgUrl;
    }

    news.save();

    res.json({
      ok: true,
      msg: 'Updated.',
      data: news
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      msg: 'Server side error.'
    })
  }
};

const deleteNews = async (req, res) => {
  const { id } = req.params;

  const news = await News.findByPk(id);
  if (!news) {
    return res.status(400).json({
      ok: false,
      msg: `There is no news with id: ${id}.`
    })
  }

  news.destroy();

  res.status(200).json({
    ok: true,
    msg: 'Deleted.',
    data: news
  })

};

module.exports = {
  getAllNews,
  getNewById,
  postNews,
  putNews,
  deleteNews,
};
