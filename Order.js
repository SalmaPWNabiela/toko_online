import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";

export default class Order extends Component
{
    constructor(props){
        super(props);
        this.state = {
            cart: [],
            num: 0,
            total: 0,
            data_pengiriman: []
        }
        if(!localStorage.getItem("Token")){
            window.location = "/login";
        }
    }

    bind = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    getCart = () => {
        let item = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        let total = 0
        let num = 0
        item.array.forEach(item => {
            total += item.total
            num += item.qty
        });
        this.setState({
            cart: item,
            num: num,
            total: total
        });
    }

    componentDidMount(){
        this.getCart()
        // this.get_alamat()
    }

    

    // addToCart = (item) => {
    //     let oldItems = JSON.parse(localStorage.getItem('cart')) || []
    //     let newid = item.kode_produk
    //     let match = oldItems.find(({ id }) => id === newid);
    //     if (match) {
    //         match['qty'] += parseInt(this.state.quantity);
    //         match['total'] = match['total'] + (item.harga * parseInt(this.state.quantity));
    //     }
    //     else{
    //         let newItem = {
    //             'kode_produk': item.kode_produk,
    //             'nama_produk': item.nama_produk,
    //             'harga': item.harga,
    //             'qty': parseInt(this.state.quantity),
    //             'total': item.harga * parseInt(this.state.quantity)
    //         };
    //         oldItems.push(newItem);
    //     }
    //     localStorage.setItem('cart', JSON.stringify(oldItems));
    // }

    render(){
        const { item } = this.props;
        return (
            <div className="col-lg-4">
                <div className="card h-100" style={{ marginBottom: "10px"}}>
                    {/* <a href="#">
                        <img className="card-img-top" src={'http://localhost/toko_online/toko_online/public/images/' + item.image}
                         alt="" />
                    </a> */}
                    <div className="card-body">
                        <h5 className="card-tittle text-center">
                            ORDER ID
                        </h5>
                            <h6>
                                <p className="card-text text-left">
                                    <small>
                                        Username    : Salma Putri Wahyu <br />
                                        Alamat      : PBI <hr />
                                        Metode Pembayaran   : Credit Card
                                    </small>
                                </p>
                            </h6>  
                        <table className="table">
                            <thead>
                                <tr>
                                    <small>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </small>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <small>
                                        <td>Kaos Ocen</td>
                                        <td>200000</td>
                                        <td>10</td>
                                        <td>2000000</td>
                                    </small>
                                </tr>
                                <tr>
                                    <small>
                                        <td>Lukisan</td>
                                        <td>400000</td>
                                        <td>2</td>
                                        <td>800000</td>
                                    </small>
                                </tr>
                            </tbody>
                        </table>
                        <h6 className="text-left">Total</h6>
                        
                        {/* <h5>Rp. {item.harga}</h5>
                        <p className="card-text">{item.description}</p>
                        <span className="card-text">
                            <small>Available Quantity: </small>{item.stok}
                        </span>
                        { item.stok > 0 ? 
                        <div>
                            <button className="btn btn-sm btn-warning"
                             onClick={() => this.addToCart(item)}>Add to Cart</button>
                             <input type="number" value={this.state.quantity} name="quantity"
                              onChange={this.bind} className="float-right" style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}} />
                        </div> :
                        <p className="text-danger"> Product is out of Stock </p>
                        } */}
                    </div>
                </div>
            </div>
        )
    }
}