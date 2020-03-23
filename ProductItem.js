import React, {Component} from "react";

export default class ProductItem extends Component
{
    constructor(props){
        super(props);
        this.state = {
            quantity: 1,
            total: 0
        }
    }

    bind = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    addToCart = (item) => {
        let oldItems = JSON.parse(localStorage.getItem('cart')) || []
        let newid = item.kode_produk
        let match = oldItems.find(({ id }) => id === newid);
        if (match) {
            match['qty'] += parseInt(this.state.quantity);
            match['total'] = match['total'] + (item.harga * parseInt(this.state.quantity));
        }
        else{
            let newItem = {
                'kode_produk': item.kode_produk,
                'nama_produk': item.nama_produk,
                'harga': item.harga,
                'qty': parseInt(this.state.quantity),
                'total': item.harga * parseInt(this.state.quantity)
            };
            oldItems.push(newItem);
        }
        localStorage.setItem('cart', JSON.stringify(oldItems));
    }

    render(){
        const { item } = this.props;
        return (
            <div className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100" style={{ marginBottom: "10px"}}>
                    <a href="#">
                        <img className="card-img-top" src={'http://localhost/toko_online/toko_online/public/images/' + item.image}
                         alt="" />
                    </a>
                    <div className="card-body">
                        <h4 className="card-tittle">
                            <a href="#">{item.nama_produk}</a>
                        </h4>
                        <h5>Rp. {item.harga}</h5>
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
                        }
                    </div>
                </div>
            </div>
        )
    }
}