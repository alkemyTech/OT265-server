const db = require('../models/index.js');
const Comment = db.Comment;
const Role = db.Role;

class CommentControllers {

    async get(req, res) {
        try {
            const comments = await Comment.findAll({ attributes: ['body'] });
            res.status(200).json({
                ok: true,
                data: comments
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                ok: false,
                msg: 'Server side error. Contact an Administrator.'
            })
        }
    }

    async create(req, res) {
        const { body, post_id } = req.body;
        const { id } = req.userAuth; // The user should come in the "isAuthenticated" middleware

        try {
            const comment = await Comment.create({
                post_id,
                body,
                user_id: id
            })
            res.status(200).json({
                ok: true,
                data: comment
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                ok: false,
                msg: 'Server side error. Contact an Administrator.'
            })
        }
    }

    async update(req, res) {
        const { comment_id } = req.params;
        const { body } = req.body;
        try {
            const comment = await Comment.findByPk(comment_id);
            const { id, roleId } = req.userAuth;
            const { name } = await Role.findByPk(roleId);
            if (id != comment.user_id && name != 'Admin') {
                return res.status(401).json({
                    ok: false,
                    msg: 'Only the author or an admin can modify this comment.'
                })
            }
            comment.body = body;
            comment.save();
            res.status(200).json({
                ok: true,
                msg: 'Comment updated.',
                data: comment
            })

        } catch (err) {
            console.log(err);
            res.status(500).json({
                ok: false,
                msg: 'Server side error. Contact an Administrator.'
            })
        }
    }

    async delete(req, res) {
        const { comment_id } = req.params;
        try {
            const comment = await Comment.findByPk(comment_id);
            const { id, roleId } = req.userAuth;
            const { name } = await Role.findByPk(roleId);
            if (id != comment.user_id && name != 'Admin') {
                return res.status(401).json({
                    ok: false,
                    msg: 'Only the author or an admin can modify this comment.'
                })
            }
            comment.destroy()
            res.status(200).json({
                ok: true,
                msg: 'Comment deleted.'
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                ok: false,
                msg: 'Server side error. Contact an Administrator.'
            })
        }
    }

}

module.exports = new CommentControllers();