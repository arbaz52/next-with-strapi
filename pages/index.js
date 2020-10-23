import Head from 'next/head'
import StripeCheckout from 'react-stripe-checkout'
import { Button, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label } from 'reactstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { _getProducts } from '../redux/products/actions'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard/ProductCard'
import InputRange from 'react-input-range'


export default function Home() {
  //products
  const products = useSelector(store => store.products)
  const dispatch = useDispatch()
  useEffect(() => {

    if (!products.products)
      dispatch(_getProducts())

  }, [])

  //category filter
  const [categoryFilter, setCategoryFilter] = useState([])
  useEffect(() => {
    if (products.categories)
      setCategoryFilter(products.categories.map(_category => {
        return { title: _category, checked: true }
      }))
  }, [products.categories])
  const updateCategoryFilter = (e) => {
    const name = e.target.name
    setCategoryFilter(categoryFilter.map(({ title, checked }) => {
      return title == name ? { title, checked: e.target.checked } : { title, checked }
    }))
  }

  //price filter
  const [priceFilter, setPriceFilter] = useState({ min: 1, max: 299 })

  //sorting
  const [sorting, setSorting] = useState({ methods: ["id", "price", "title", "category"], method: null, asc: true })


  const STRIPE_PUBLIC_KEY = "pk_test_51HeypfL9vowMRDDJ8F7zCzT7sDI9iYIK7LmcAGuLU4Rdrl0viLjf4RHmb2i8F9tvuH2enMuwzOxLjZQm1FfP5Sxl00CUpLOajx"
  const handlePayment = (token) => {
    console.log(token)
    axios.post("/api/checkout/", { token, product }, {})
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
        <title>estori. - Home</title>
      </Head>
      <section>

        <div className="container">
          <div className="row align-items-center" style={{ minHeight: "80vh" }}>
            <div className="col-sm-12 col-md-6 py-5">
              <img src="undraw_successful_purchase_uyin.svg" alt="" className="img-fluid" />
            </div>
            <div className="col-sm-12 col-md-6 py-5">
                <h1>estori.</h1>
              <h5>Next.js store with redux and stripe</h5>
              <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, voluptates?</p>
              <Button color="primary">Let's start buying!</Button>
            </div>
          </div>
        </div>

      </section>

      <section>
        <div className="container pb-5">
          <div className="row pb-5">
            <div className="col text-center">
              <b>Lorem, ipsum.</b>
              <h1>Products</h1>
              <p className="lead">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, nam?</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-3">
              <h5>Options and filters</h5>
              <h6>Category Filter</h6>
              {
                categoryFilter &&
                categoryFilter.map(({ title, checked }) => {
                  return <FormGroup key={title} check>
                    <Label check>
                      <Input type="checkbox" checked={checked} name={title} onChange={e => updateCategoryFilter(e)} />{' '}
                      {title}
                    </Label>
                  </FormGroup>

                })

              }
              <br />
              <h6>Price Filter</h6>
              <br />
              <div style={{ width: "80%", margin: "auto" }}>
                <InputRange
                  maxValue={300}
                  minValue={0}
                  value={priceFilter}
                  onChange={e => setPriceFilter(e)}
                />
              </div>
              <br />
              <h6>Sort products by: {sorting.method + ' ' + (sorting.asc ? 'asc' : 'desc')}</h6>
              <InputGroup>
                <Input type="select" onChange={e => setSorting({ ...sorting, method: e.target.value })}>
                  {
                    sorting.methods.map(_method => {
                      return <option className="text-capitalize" key={_method} selected={_method == sorting.method}>{_method}</option>
                    })
                  }
                </Input>
                <InputGroupAddon>

                  <Input type="select" onChange={e => setSorting({ ...sorting, asc: (e.target.value == "true") })}>
                    <option value="true">Ascending</option>
                    <option value="false">Descending</option>
                  </Input>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="col">
              {
                !products.products ? (
                  <div className="alert alert-info">Please wait, loading products</div>
                ) : (
                    <div className="row">
                      {
                        products.products
                          .filter(_product => {
                            // category filter
                            const _cat = _product.category
                            for (let { title, checked } of categoryFilter) {
                              if (title == _cat
                                && checked) {
                                return true
                              }
                            }
                            return false
                          })
                          .filter(_product => {
                            //price filter
                            return _product.price >= priceFilter.min && _product.price <= priceFilter.max
                          })
                          .sort((a, b) => {
                            let x = 0
                            switch (sorting.method) {
                              case "id":
                                x = a.id - b.id
                                break
                              case "price":
                                x = a.price - b.price
                                break
                              case "title":
                                x = a.title.localeCompare(b.title)
                                break
                              case "category":
                                x = a.category.localeCompare(b.category)
                                break

                              default:
                                return -1
                            }
                            if (sorting.asc)
                              return x
                            return -x
                          })
                          .map(_product =>
                            <ProductCard key={_product.id} {..._product} />
                          )
                      }
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}
