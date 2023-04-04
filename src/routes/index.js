const router = require('express').Router()
const userRoutes = require('./user')
const authRoutes = require('./auth')

const blogsRoutes = require('./blogs')

// Middlewares
const authenticate = require('../middlewares/auth/authenticate')

//Health Checker
router.use('/health', (req, res) => res.status(200).json({ status: 'ok' }))

// Public Routes

// Application Routes
router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/users', authenticate, userRoutes)

router.use('/api/v1/blogs', blogsRoutes)

// Module Exports
module.exports = router
