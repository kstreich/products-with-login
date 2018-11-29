let router = require('express').Router()
let Products = require('../models/Product')
let Reviews = require('../models/Review')

// get all reviews
router.get('/', (req, res, next) => {
  Products.find({})
    .then(products => res.send(products))
    .catch(next)
})

//get product by id
router.get('/:id', (req, res, next) => {
  Products.findById(req.params.id)
    .then(product => res.send(product))
    .catch(next)
})

router.get('/:id/reviews', (req, res, next) => {
  Products.findById(req.params.id)
    .then(product => {
      Reviews.find({ productId: product._id })
        .then(reviews => {
          return res.send({ product, reviews })
        })
    })
    .catch(next)
})

//creates a new product
router.post('/', (req, res, next) => {
  Products.create(req.body)
    .then(product => res.send(product))
    .catch(next)
})

//delete a product
router.delete('/:id', (req, res, next) => {
  Products.findOneAndUpdate({ _id: req.params.id, creatorId: req.session.uid }, { description: "No Longer Available", price: 0, img: "http://placehold.it/200x200" })
    .then(product => res.send({ message: "Deleted", data: product }))
    .catch(next)
})

//update/modify an existing product
router.put('/:id', (req, res, next) => {
  Products.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(product => res.send(product))
    .catch(next)
})

module.exports = router