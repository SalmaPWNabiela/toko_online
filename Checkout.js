import React, {Component, Fragment} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import { Link } from 'react-router-dom';

export default class Checkout extends Component{
  constructor(props){
    super(props);
    this.state = {
      produk: [],
      alamat: [],
      id_user: "",
      id_alamat: "",
      num: 0,
      total: 0,
      message: ""
    }
  }

  bind = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  get_produk = () => {
    let items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    let total = 0
    let num = 0
    items.forEach(item => {
      total += item.total
      num += item.qty
    });
    this.setState({
      produk: items,
      num: num,
      total: total
    });
  }

  get_alamat = async() => {
    const id = localStorage.getItem('Id')
    const url = "http://localhost/toko_online/toko_online/public/alamat/user/" +id
    await axios.get(url)
      .then(res => {
        this.setState({id_user: id, alamat: res.data.alamat})
      })
      .catch(error => {
        console.log(error)
      })
  }

  Order = (e) => {
    e.preventDefault()
    let url = "http://localhost/toko_online/toko_online/public/order/save"
    let form = new FormData()
    form.append("id_user", this.state.id_user)
    form.append("id_alamat", this.state.id_alamat)
    form.append("total", this.state.total)
    form.append("produk", JSON.stringify(this.state.produk))

    axios.post(url, form)
      .then(res => {
        alert("Order Berhasil")
        this.setState({message: res.data.message})
        localStorage.removeItem('cart')
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount(){
    this.get_produk()
    this.get_alamat()
  }

  removeFromCart = (produk) => {
    let carts = JSON.parse(localStorage.getItem('cart'));
    let cart = carts.filter(item => item.id !== produk.id );
    localStorage.setItem('cart', JSON.stringify(cart));
    this.getCarts()
  }

  clearCart = () => {
      localStorage.removeItem('cart');
      this.setState({carts: []});    
  }

  render(){
    const style = {
      marginTop: "50px"
    };
    const bottomStyle = {
      marginBottom: "100px"
    };
    return (
      <Fragment>
        {/* Custom styles for this template */}
        <div className="container">
          <div className="py-5 text-center" style={style}>
            <h2 className="kryptonite-text">Checkout Form</h2>
          </div>
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="kryptonite-text">Your cart</span>
                <span className="badge badge-secondary badge-pill">
                  {this.state.carts}
                </span>
              </h4>
              <ul className="list-group mb-3">
                {/* {this.state.carts.map(produk => {
                  return (
                    <li
                      className="list-group-item d-flex justify-content-between lh-condensed"
                      key={produk._id}
                    >
                      <div>
                        <h6 className="kryptonite-checkout-text my-0">
                          {produk.title}
                        </h6>
                        <small className="text-muted">
                          {produk.description}
                        </small>
                      </div>
                      <span className="text-muted">{produk.price}</span>
                    </li>
                  );
                })} */}
                <li className="list-group-item d-flex justify-content-between">
                  <span className="text-danger">Total (USD)</span>
                  <strong className="kryptonite-checkout-text">
                    {this.state.total}
                  </strong>
                </li>
              </ul>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="promo"
                  onChange={this.onChange}
                  placeholder="Promo code"
                />
              </div>
              <button
                onClick={() =>
                  this.setState(() => ({ total: this.state.total / 2 }))
                }
                type="submit"
                className="btn btn-secondary btn-block"
              >
                Redeem
              </button>
            </div>
            <div className="col-md-8 order-md-1">
              <h4 className="kryptonite-text mb-3">Billing address</h4>
              {/* -------------------------------------------------------------------------------------------------- */}
              <form onSubmit={this.handleFormSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName">First name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      onChange={this.onChange}
                      value={this.state.firstName}
                    />
                    <div className="invalid-feedback">
                      Valid first name is .
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName">Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      onChange={this.onChange}
                      value={this.state.lastName}
                    />
                    <div className="invalid-feedback">Valid last name is .</div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email">
                    Email <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                    placeholder="1234 Main St"
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="address2">
                    Address 2 <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    name="address2"
                    onChange={this.onChange}
                    placeholder="Apartment or suite"
                    value={this.state.address2}
                  />
                </div>
                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      name="country"
                      onChange={this.onChange}
                      placeholder="United States"
                      value={this.state.country}
                    />
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div className="col-md-7 mb-3">
                    <label htmlFor="zip">Zip</label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      name="zip"
                      onChange={this.onChange}
                      placeholder="14522"
                      value={this.state.zip}
                    />
                    <div className="invalid-feedback">Zip code .</div>
                  </div>
                </div>
                <hr className="mb-4" />
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="same-address"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="same-address"
                  >
                    Shipping address is the same as my billing address
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="save-info"
                  />
                  <label className="custom-control-label" htmlFor="save-info">
                    Save this information for next time
                  </label>
                </div>
                <hr className="mb-4" />
                <h4 className="kryptonite-text mb-3">Payment</h4>
                <div className="d-block my-3">
                  <div className="custom-control custom-radio">
                    <input
                      id="credit"
                      name="paymentMethod"
                      type="radio"
                      onChange={this.onChange}
                      value="Credit card"
                      className="custom-control-input"
                      defaultChecked
                    />
                    <label className="custom-control-label" htmlFor="credit">
                      Credit card
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      id="debit"
                      name="paymentMethod"
                      type="radio"
                      onChange={this.onChange}
                      value="Debit card"
                      className="custom-control-input"
                    />
                    <label className="custom-control-label" htmlFor="debit">
                      Debit card
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      id="paypal"
                      name="paymentMethod"
                      type="radio"
                      onChange={this.onChange}
                      value="PayPal"
                      className="custom-control-input"
                    />
                    <label className="custom-control-label" htmlFor="paypal">
                      PayPal
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-name">Name on card</label>
                    <input
                      type="text"
                      name="cardName"
                      value={this.state.cardName}
                      onChange={this.onChange}
                      className="form-control"
                      id="cc-name"
                    />
                    <small className="text-muted">
                      Full name as displayed on card
                    </small>
                    <div className="invalid-feedback">Name on card is</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-number">Credit card number</label>
                    <input
                      type="number"
                      name="cardNumber"
                      value={this.state.cardNumber}
                      onChange={this.onChange}
                      className="form-control"
                      id="cc-number"
                    />
                    <div className="invalid-feedback">
                      Credit card number is
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-expiration">Expiration</label>
                    <input
                      type="date"
                      name="expiration"
                      value={this.state.expiration}
                      onChange={this.onChange}
                      className="form-control"
                      id="cc-expiration"
                    />
                    <div className="invalid-feedback">Expiration date</div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-cvv">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={this.state.cvv}
                      onChange={this.onChange}
                      className="form-control"
                      id="cc-cvv"
                    />
                    <div className="invalid-feedback">Security code</div>
                  </div>
                </div>
                <hr className="mb-4" />
                <button
                  style={bottomStyle}
                  className="kryptonite-button btn btn-success btn-lg btn-block"
                  type="submit"
                >
                  Continue to checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
