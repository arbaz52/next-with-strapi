import Stripe from "stripe"
import { calculateTotal } from "../../../components/Cart/Cart"

export default (req, res) => {
    const {token, cart} = req.body
    const stripe = new Stripe("sk_test_51HeypfL9vowMRDDJXyGQ0dZpVKxruJRPN1b4Dr1oAfAxvsDtf6GeVEEN9IjVZ9A4KkJOSr7npIBGUa7qyihY976V00jDAFvuz2")
    const amount = calculateTotal(cart)*100
    const currency = "usd"
    stripe.charges.create({
        source: token.id,
        amount,
        currency,
        description: "Cart items purchased"
    })
    .then(_res => {
        res.json(_res)
    })
    .catch(err => {
        res.status(500).send(err.message)
    })
}