
const User = require('../models/users');

const checkPermission = (role) => {
    return async (req, res, next) => {
        try {
            const user = await User.findOne({ user_id: req.user.user_id });
            if (user.role.includes(role)) {
                next();
            } else {
                return res.status(401).json({
                    status: 401,
                    message: 'Unauthorized'
                })
            }
        } catch (err) {
            return res.status(400).json({
                status: 400,
                message: 'Something went wrong'
            })
        }
    }
}

module.exports = checkPermission;
