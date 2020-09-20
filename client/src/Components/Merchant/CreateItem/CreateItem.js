import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CreateItem extends Component {
    constructor() {
        super()
    }

    onSubmitHandler(e) {
        e.preventDefault()
        console.log(e.target.item_name.value)
        console.log(e.target.unit_price.value)
        console.log(e.target.quantity.value)
        console.log(e.target.category_id.value)
        console.log(e.target.description.value)
    }

    render() {
        return (
            <Form action="/newListing" onSubmit={(e) => this.onSubmitHandler(e)} method="post">
                <Form.Row>
                    <Form.Label column lg={2}>Item Name</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder="Item Name" name="item_name" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Unit Price</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder="Unit Price" name="unit_price" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Quantity</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder="Quantity" name="quantity" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Maximum Price</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder="maximum price" name="price_ceiling" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Minimum Price</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder="minimum price" name="price_floor" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Category</Form.Label>
                    <Col>
                        <Form.Control name="category_id" as="select" custom>
                            <option value="1">Snacks</option>
                            <option value="2">Light Bites</option>
                            <option value="3">Dim Sum</option>
                            <option value="4">Noodles</option>
                            <option value="5">Junk Food</option>
                            <option value="6">Hearty Meals</option>
                            <option value="7">Snacks</option>
                            <option value="8">Light Bites</option>
                            <option value="9">Dim Sum</option>
                            <option value="10">Noodles</option>
                            <option value="11">Junk Food</option>
                            <option value="12">Hearty Meals</option>
                        </Form.Control>
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Description</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder="Description" name="description" />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row>
                    <Form.Label column lg={2}>Duration</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder="Time in Minutes" name="time_limit_min" />
                    </Col>
                </Form.Row>
                <Button type="submit" className="mb-2">
                    Submit
                </Button>
                <Col>
                    <Form.Control type="hidden" placeholder="Normal text" name="merchant_id" value="1" />
                </Col>
            </Form>

        )
    }
}
