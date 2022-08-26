module.exports = {
  isOwnership: async (req, res) => {
    try {
      const { id } = req.userAuth;
      const { userId } = req.body;
      if (id !== userId) {
        return res.status(403).json({
          ok: false,
          message: "User without access to this request.",
        });
      }
    } catch (err) {
      next(err);
    }
  },
};
