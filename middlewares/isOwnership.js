module.exports = {
  isOwnership: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.userAuth.id;
      if (Number(id) !== userId) {
        return res.status(403).json({
          ok: false,
          message: "User without access to this request.",
        });
      }
      next()
    } catch (err) {
      next(err);
    }
  },
};
