const db = require("../models/index.js");
const { Op } = require("sequelize");
const News = db.News;

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

const getNewById = async (req, res = response) => {
  const { newsId } = req.params;

  try {
    const oneNews = await News.findOne({
      where: {
        id: newsId,
      },
    });

    if (!oneNews) {
      res.status(200).json({
        ok: true,
        message: "This news item has not been found.",
      });
    } else {
      res.status(200).json({
        ok: true,
        data: oneNews,
      });
    }
  } catch (err) {
    next(err);
  }
};

const getNewByName = async (req, res = response) => {
  const { newsName } = req.params;

  try {
    const news = await News.findAll();

    const fixedNews = news.filter((n) =>
      n.dataValues.name.toLowerCase().includes(newsName.toLowerCase())
    );

    if (!fixedNews) {
      res.status(200).json({
        ok: true,
        message: "No news with this name have been found.",
      });
    } else {
      await fixedNews.sort((a, b) => {
        if (a.name.length > b.name.length) {
          return 1;
        } else if (a.name.length < b.name.length) {
          return -1;
        } else {
          return 0;
        }
      });

      res.status(200).json({
        ok: true,
        data: fixedNews,
      });
    }
  } catch (err) {
    next(err);
  }
};

const postNews = async (req, res = response) => {
  try {
    const { name, content, image, categoryId } = req.body;

    const category = await Category.findOne({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      res.status(200).json({
        ok: false,
        message: "The category requested does not exist.",
      });
      return;
    }
    const newNews = await News.create({
      name,
      content,
      image,
    });

    newNews.addCategory(category);

    res.status(200).json({
      ok: true,
      data: newNews,
    });
  } catch (err) {
    next(err);
  }
};

const putNews = async (req, res = response) => {
  try {
    const { newsId, oldCategoryId, newCategoryId } = req.query;
    const { name, content, image } = req.body;

    const findNews = await News.findOne({
      where: {
        id: newsId,
      },
      include: [
        {
          model: Category,
        },
      ],
    });

    if (oldCategoryId && newCategoryId) {
      const findOldCategory = await Category.findOne({
        where: {
          id: oldCategoryId,
        },
      });

      const findNewCategory = await Category.findOne({
        where: {
          id: newCategoryId,
        },
      });
      if (findOldCategory && findNewCategory) {
        findCategory && findNews.remodeCategory(oldCategoryId);
        findNews.addCategory(newCategoryId);
      } else {
        res.status(400).json({
          ok: false,
          message: "Category not found.",
        });
      }
    }

    await News.update(
      {
        name,
        content,
        image,
      },
      {
        where: {
          id: newsId,
        },
      }
    );
  } catch (err) {
    next(err);
  }
};

const deleteNews = async (req, res = response) => {
    const { newsId } = req.params;

    const news = await News.findByPk(newsId);
    if (!news) return res.status(400).json({
        ok: false,
        message: "This news item has not been found.",
      });;

    news.destroy();
    res.status(200).json({
        ok: true,
        data: news
    })

};

module.exports = {
  getAllNews,
  getNewById,
  getNewByName,
  postNews,
  putNews,
  deleteNews,
};
