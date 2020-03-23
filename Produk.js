import React, {Component} from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
// import Slide1 from '../image/Slide1.jpg';
// import Slide2 from '../image/Slide2.jpg';
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Produk extends Component{
    constructor(props){
        super(props);
        this.state = {
            produk: [],
            kode_produk: "",
            nama_produk: "",
            harga: "0",
            deskripsi: "",
            image: null,
            stok: "",
            message: ""
        }
        //jika tidak terdapat data token pada local storage
        // if(!localStorage.getItem("Token")){
        //     //direct ke halaman login
        //     window.location = "/login";
        // } 
    }

    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (e) => {
        this.setState({image: e.target.files[0]})
    }

    Add = () => {
        //fungsi untuk membuka form edit data
        //membuka modal
        $("#modal_produk").modal("show");
        //mengosongkan data pada form
        this.setState({
            action: "insert",
            //ini
            kode_produk: "",
            nama_produk: "",
            harga: "",
            deskripsi: "",
            image: null,
            stok: ""
        });
    }

    Edit = (item) => {
        //membuka modal
        $("#modal_produk").modal("show");
        //mengisikan data pada form
        this.setState({
            action: "update",
            kode_produk: item.kode_produk,
            nama_produk: item.nama_produk,
            harga: item.harga,
            deskripsi: item.deskripsi,
            image: item.image,
            stok: item.stok
        });
    }

    get_produk = () => {
        $("#loading").toast("show");
            let url = "http://localhost/toko_online/toko_online/public/produk";
            axios.get(url)
            .then(response => {
                this.setState({produk: response.data.produk});
                $("#loading").toast("hide");
            })
            .catch(error => {
                console.log(error);
            });
    }

    Drop = (kode_produk) => {
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/toko_online/public/produk/drop/"+kode_produk;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_produk();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    componentDidMount = () => {
        this.get_produk();
    }

    Save = (event) => {
        event.preventDefault();
            //menampilkan proses loading
            // $("#loading").toast("show");
            //menutup form modal
            $("#modal_produk").modal("hide");
            let url = "http://localhost/toko_online/toko_online/public/produk/save";
            let form = new FormData();
            form.append("action", this.state.action);
            form.append("kode_produk", this.state.kode_produk);
            form.append("nama_produk", this.state.nama_produk);
            form.append("harga", this.state.harga);
            form.append("deskripsi", this.state.deskripsi);
            form.append("image", this.state.image,this.state.image.name);
            form.append("stok", this.state.stok);
            axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_produk();
            })
            .catch(error => {
                console.log(error);
            });
    }

    search = (event) => {
        if(event.keyCode === 13){
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/toko_online/public/produk";
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({produk: response.data.produk});
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    render(){
        // const renderData = this.state.produk.map((item, kode_produk)=>{
        //     return (
        //         <ProdukItem item={item} key={kode_produk}/>
        //     )
        // })
        return(
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-dark">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data Produk</h4>
                            </div>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="find"
                                 onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                                 placeholder="Pencarian..." />
                            </div>
                        </div>
                    </div>
                    {/* content card */}
                    <div className="card-body">
                        <Toast id="message" autohide="true" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <Toast id="loading" autohide="false" title="Informasi">
                            <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
                        </Toast>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Kode Produk</th>
                                    <th>Nama Produk</th>
                                    <th>Harga</th>
                                    <th>Deskripsi</th>
                                    <th>Image</th>
                                    <th>Stok</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.produk.map((item) => {
                                    return(
                                        <tr key={item.kode_produk}>
                                            <td>{item.kode_produk}</td>
                                            <td>{item.nama_produk}</td>
                                            <td>{item.harga}</td>
                                            <td>{item.deskripsi}</td>
                                            <td><img src={'http://localhost/toko_online/toko_online/public/images/' + item.image} 
                                                    alt={item.image} width="200px" height="200px" />
                                            </td>
                                            <td>{item.stok}</td>
                                            <td>
                                                <button className="m-1 btn btn-sm btn-info"
                                                 onClick={() => this.Edit(item)}>
                                                     <span className="fa fa-edit"></span> Edit
                                                 </button>
                                                 <button className="m-1 btn btn-sm btn-danger"
                                                  onClick={() => this.Drop(item.kode_produk)}>
                                                      <span className="fa fa-trash"></span> Hapus
                                                  </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* tombol tambah */}
                        <button className="btn btn-success my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span> Tambah Data
                        </button>

                        {/* form modal produk */}
                        <Modal id="modal_produk" title="Form Produk" bg_header="success"
                        text_header="white">
                            <form onSubmit={this.Save}>
                                Kode Produk
                                <input type="number" className="form-control" name="kode_produk"
                                value={this.state.kode_produk} onChange={this.bind}
                                />
                                Nama Produk
                                <input type="text" className="form-control" name="nama_produk"
                                value={this.state.nama_produk} onChange={this.bind}
                                />
                                Harga
                                <input type="text" className="form-control" name="harga"
                                value={this.state.harga} onChange={this.bind}
                                />
                                Deskripsi
                                <input type="text" className="form-control" name="deskripsi"
                                value={this.state.deskripsi} onChange={this.bind}
                                />
                                Image
                                <input type="file" className="form-control" name="image" onChange={this.bindImage} />
                                Stok
                                <input type="number" className="form-control" name="stok"
                                value={this.state.stok} onChange={this.bind}
                                required />
                                <button type="submit" className="btn btn-info pull-right m-2">
                                    <span className="fa fa-check"></span> Simpan
                                </button>
                            </form>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}
export default Produk;