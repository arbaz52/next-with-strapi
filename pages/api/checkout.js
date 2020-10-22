import createError from 'http-errors' 
import Stripe from 'stripe'

const stripe = new Stripe("sk_test_51HeypfL9vowMRDDJXyGQ0dZpVKxruJRPN1b4Dr1oAfAxvsDtf6GeVEEN9IjVZ9A4KkJOSr7npIBGUa7qyihY976V00jDAFvuz2")


export default (req, res) => {
    const {token, product} = req.body

    stripe.customers.create({
        email: token.email,
        source: token.id
    })
    .then(customer => {
        // https://stripe.com/docs/api/charges/create
        stripe.charges.create({
            amount: product.price * 100,
            currency: "usd",

            customer: customer.id,
            description: `Purchasing ${product.name}!`
        })
        .then(result => {
            console.log(result)
            res.json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err.message)
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err.message)
    })
}