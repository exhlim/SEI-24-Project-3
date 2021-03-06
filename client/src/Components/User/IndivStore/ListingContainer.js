import React from "react";
import IndivListing from "./IndivListing";
import Basket from "./Basket";
import CheckoutForm from "./CheckoutForm";
import PaymentOverlay from "./PaymentOverlay";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
export default class ListingContainer extends React.Component {
  constructor(props) {
    //mounting
    super(props);
    console.log("----inside Listing constructor");
    this.state = {
      merchant_id: props.merchant_id,
      merchant_name: "",
      merchant_img: "",
      html: [],
      result: [],
      cart: [],
      viewCart: true,
      checkout: false,
      listing_id: props.listing_id,
    };
    // this.addToCart = this.addToCart.bind(this);
    // this.navigateTo = this.navigateTo.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
  }
  //
  //payment click handlling
  handleCheckOut() {
    this.setState({ checkout: true });
  }
  //delete from cart
  handleRemoveFromCart(e, item) {
    let cart = this.state.cart;
    if (this.state.cart[0]) {
      if (item.quantity > 1 && cart[0].count > 0) {
        cart[0].count--
      }
    }
    this.setState({ cart: cart })
  }
  //   //add to cart button
  //   addToCart(e, addToCart) {
  //     console.log(addToCart);
  //     this.setState((prevState) => ({ cart: [...prevState.cart, addToCart] }));
  //   }

  //add to cart button
  handleAddToCart(e, product) {
    console.log(product);
    let cart = this.state.cart;
    console.log(this.state.cart, `statecart`)
    console.log(cart, `cart`)
    let productAlreadyInCart = false;
    cart.forEach((item) => {
      if (item.name === product.name) {
        if (item.count < product.quantity) {
          console.log(item.count, "---hello from before increment")
          productAlreadyInCart = true;
          console.log(`you're adding`)
          item.count += 1
          console.log(item.count, "---hello from count after increment")
        }
      }
    });
    if (!productAlreadyInCart) {
      if (product.quantity > 0) {
        cart.push({ ...product, count: 1 });
        console.log("---hello from first add")
      }
    }
    this.setState({ cart: cart })
  }
  //when state is changed, FETCH results from aPI
  //side effects ie: HTTP requests are allowed here
  componentDidMount() {
    fetch(`/indivshop/${this.state.listing_id}`)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          result: res,
          html: this.format(res),
          merchant_name: res[0].name,
        })
      );
  }
  //update and re-render once checkout is clicked and this.state.checkout=true;
  //helper functions
  //take the res.json and convert into nice HTML
  format(array) {
    let item_name = array[0].item_name;
    let quantity = array[0].quantity;
    let discPrice = this.props.price.toFixed(2);
    let originalPrice = array[0].unit_price;
    let discount = (originalPrice - discPrice) / originalPrice;
    let merchant_name = array[0].name;
    let cuisine = array[0].cuisine;
    let listing_id = array[0].listing_id;
    let merchant_id = array[0].merchant_id;
    return (
      <IndivListing
        item_name={item_name}
        quantity={quantity}
        discPrice={discPrice}
        originalPrice={originalPrice}
        discPrice={discPrice}
        discount={discount}
        merchant_name={merchant_name}
        cuisine={cuisine}
        onClick={this.handleAddToCart}
        onDel={this.handleRemoveFromCart}
        listing_id={listing_id}
        merchant_id={merchant_id}
      />
    );
  }
  render() {
    const stripePromise = loadStripe(this.props.stripper);
    // if (this.state.checkout) {
    //     return (
    //         <div><PaymentOverlay cart={this.state.cart} stripper={this.props.stripper} /></div>
    //     )
    // }
    let data = {}
    if (this.state.cart[0]) {
      data = {
        merchant_id: this.state.cart[0].merchant_id,
        user_id: this.props.user_id,
        name: this.state.cart[0].name,
        listing_id: this.state.cart[0].listing_id,
        price: this.state.cart[0].price,
        quantity: this.state.cart[0].count,
        revenue: ((this.state.cart[0].count) * this.state.cart[0].price).toFixed(2),
      };
    }
    console.log(data)
    return (
      <div id="wrapper">

        <div>
          <h1>You are viewing deals from {this.state.merchant_name}</h1>
          <br />
          <div className="ListItems">{this.state.html}</div>
          {/* <button onClick={this.navigateTo}>
            View Cart {(this.state.cart[0] ? this.state.cart[0].count : 0)}
          </button> */}
          {(this.state.viewCart && this.state.cart[0]) ?
            <>
              <h1>Order Summary</h1>
              <table style={{ maxWidth: "300px", margin: "0 auto" }}>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
                <tr>
                  <td>{this.state.cart[0].name}</td>
                  <td>{this.state.cart[0].count}</td>
                  <td>
                    Total: $
                  {((this.state.cart[0].count) * this.state.cart[0].price).toFixed(2)}
                  </td>
                </tr>
              </table>
              <Elements stripe={stripePromise}>
                <CheckoutForm data={data}></CheckoutForm>
              </Elements>
            </> : null}
        </div>
      </div>
    );
  }
}