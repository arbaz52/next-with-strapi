import React from 'react'
import { Badge, Card, CardBody, CardImg, CardLink, CardText, CardTitle } from 'reactstrap'
import { goto } from '../navigation'


const ProductCard = (props) => {
    return (
        <div className="col-sm-12 col-md-4 col-lg-4 p-5 text-center">
            <img
                className="mb-2"
                src={props.image}
                height="200px"
                width="100%"
                style={{ objectFit: "contain", objectPosition: "center" }}
            />
            <CardTitle><p>{props.title}</p></CardTitle>
            <h6 className="text-primary">${props.price}</h6>
            <Badge color="primary">{props.category}</Badge>
            <CardText>
                <small>{props.description.substr(0, 35) + '...'}</small>
            </CardText>
            <a className="stretched-link" href="#" onClick={e=>{e.preventDefault(); goto(`products/${props.id}`)}}></a>
        </div>
        /*
        <Card className="col-sm-12 col-md-4 col-lg-4">
            <CardImg  top className="px-5 py-2" src={props.image} />
            <CardBody>
                <h5 className="text-primary">${props.price}</h5>
                <CardTitle><b>{props.title}</b></CardTitle>
                <Badge color="primary">{props.category}</Badge>
                <CardText>
                    <small>{props.description.substr(0, 35) + '...'}</small>
                </CardText>
                <a className="stretched-link" href="#">View Product</a>
            </CardBody>
        </Card>
        */
    )
}

export default ProductCard