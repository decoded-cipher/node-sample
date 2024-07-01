
const express = require('express');
const router = express.Router();

const Users = require('../../models/users');
const verifyToken = require('../../middleware/authentication');
// const checkPermission = require('../../middleware/authorization');



router.get('/', verifyToken, async (req, res) => {

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let search = req.query.search || null;

    let query = {};
    if (search) {
        query = { $text: { $search: search } };
    }

    let totalUsers = await Users.countDocuments(query)
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving users',
                error: err
            });
        });

    let users = await Users.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving users',
                error: err
            });
        });

    res.status(200).json({
        status: 200,
        message: 'Users retrieved successfully',
        data: {
            users: users,
            meta: {
                page: page,
                limit: limit,
                pages: Math.ceil(totalUsers / limit),
                total: totalUsers,
                search: search
            }
        }
    });

});



router.get('/me', verifyToken, async (req, res) => {
    
    let user = await Users.findOne({ user_id: req.user.user_id })
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving user',
                error: err
            });
        });

    res.status(200).json({
        status: 200,
        message: 'User retrieved successfully',
        data: user
    });

});



router.get('/:id', verifyToken, async (req, res) => {
    
    let user = await Users.findOne({ user_id: req.params.id })
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error retrieving user',
                error: err
            });
        });

    res.status(200).json({
        status: 200,
        message: 'User retrieved successfully',
        data: user
    });

});



router.delete('/:id', verifyToken, async (req, res) => {
    
    let user = await Users.findOneAndDelete({ user_id: req.params.id })
        .catch(err => {
            res.status(400).json({
                status: 400,
                message: 'Error deleting user',
                error: err
            });
        });

    res.status(200).json({
        status: 200,
        message: 'User deleted successfully',
        data: user
    });

});



module.exports = router;