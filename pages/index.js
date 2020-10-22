import Head from 'next/head'
import StripeCheckout from 'react-stripe-checkout'
import { Button } from 'reactstrap'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Home() {
  const product = {
    name: "Arbaz's Resume",
    price: 20 //dollars
  }
  const STRIPE_PUBLIC_KEY = "pk_test_51HeypfL9vowMRDDJ8F7zCzT7sDI9iYIK7LmcAGuLU4Rdrl0viLjf4RHmb2i8F9tvuH2enMuwzOxLjZQm1FfP5Sxl00CUpLOajx"
  const handlePayment = (token) => {
    console.log(token)
    axios.post("/api/checkout/", {token, product}, {})
    .then(res => {
      console.log(res)
      toast.success("Yayyyy, let's gooooooo!!!")
    })
    .catch(err => {
      console.log(err.response)
      toast.error(err.response.data)
    })
  }

  
  return (
    <div>
      <Head>
        <title>Next with Stripe - Buy my CV/Resume</title>
      </Head>
      <div className="container">
        <div className="row align-items-center" style={{minHeight: "100vh"}}>
          <div className="col">
            <h1>Next with Stripe</h1>
            <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, voluptates?</p>
            <StripeCheckout
              stripeKey={STRIPE_PUBLIC_KEY}
              token={handlePayment}
              currency="USD"
              amount={product.price * 100} //as stripe converts it to lowest representation of a given currency
            >
              <Button color="primary">Buy Arbaz's Resume!</Button>
            </StripeCheckout>
          </div>
          <div className="col">
            <img src="undraw_reading_list_4boi.svg" alt="" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>

  )
}
