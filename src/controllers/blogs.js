// External Module:
const createError = require('http-errors')

//Internal Module:
const BlogModel = require('../models/Blogs')

/**
 * @desc Create
 * @Route [POST]- /api/v1/blogs
 * @Access protected - [auth]
 * @returns {OBJECT}
 */
const create = async (req, res, next) => {
  try {
    let newData = new BlogModel({ ...req.body, bannar: req.file?.filename })

    let data = await newData.save()
    res.status(201).json(data)
  } catch (error) {
    next(createError(500, error))
  }
}

/**
 * @description Get Single Data
 * @Route [GET]- /api/v1/blogs/:id
 * @Access protected - [auth]
 * @returns {Object}
 */
const findOneById = async (req, res, next) => {
  try {
    let query = { _id: req.params.id }
    const data = await BlogModel.findOne(query)
    const modified = {
      ...data._doc,
      bannar: `${req.server_url}/uploads/blogs/${data.bannar}`,
    }
    res.status(200).json(modified)
  } catch (error) {
    next(createError(500, error))
  }
}

/**
 * @desc Get All Data
 * @Route [GET]- /api/v1/blogs
 * @Access protected - [auth]
 * @returns {Array<JSON>}
 */
const findAll = async (req, res, next) => {
  try {
    const query = {}
    const projection = '_id title description bannar author avatar createdAt'
    const options = { sort: { createdAt: -1 } }
    const totalCount = await BlogModel.countDocuments(query)
    const data = await BlogModel.find(query, projection, options)

    let modified = data.map((item) => ({
      ...item._doc,
      bannar: `${req.server_url}/uploads/blogs/${item.bannar}`,
    }))

    res.set('x-total-count', totalCount)
    if (totalCount) {
      return res.status(200).json(modified)
    }
    return next(createError(404, 'No Data found!'))
  } catch (error) {
    next(createError(500, error))
  }
}

/**
 * @desc Update Data
 * @Route [PATCH]- /api/v1/blogs/:id
 * @Access protected - [auth]
 * @returns {JSON} - Updated Object
 */
const updateOneById = async (req, res, next) => {
  try {
    let query = { _id: req.params.id }
    let options = {
      new: true,
    }

    console.log({ update: req.body })
    let updatedData = await BlogModel.findOneAndUpdate(query, req.body, options)
    res.status(200).json(updatedData)
  } catch (error) {
    next(createError(500, error))
  }
}

/**
 * @desc Delete single
 * @Route [DELETE]- /api/v1/blogs/:id
 * @Access protected - [auth]
 * @returns {Boolean}
 */
const deleteOneById = async (req, res, next) => {
  try {
    let query = { _id: req.params.id }
    await BlogModel.findByIdAndDelete(query)
    res.status(200).json({ message: 'Entry Deleted' })
  } catch (error) {
    next(createError(500, error))
  }
}

//Export Module:
module.exports = {
  create,
  findOneById,
  findAll,
  updateOneById,
  deleteOneById,
}
