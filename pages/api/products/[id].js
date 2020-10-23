import axios from 'axios'
export default (req, res) => {
    const { id } = req.query
    axios.get("https://rstorer.herokuapp.com/api/products/")
        .then(_res => {
            try {
                res.json(_res.data.filter(product => product.id == id)[0])
            } catch (err) {
                console.log(err)
                res.status(400).send("Product not found!")
            }
        })
        .catch(err => {
            console.error(err)
        })
}