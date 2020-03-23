import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";

export default class Alamat extends Component
{
    constructor(props){
        super(props);
        this.state = {
            alamat: [],
            action: "",
            id_alamat: "",
            nama_penerima: "",
            no_hp: "",
            provinsi: "",
            kota: "",
            kecamatan: "",
            detail_alamat: "",
            message: ""
        }
    }

    bind = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    // bindImage = (e) => {
    //     this.setState({image: e.target.files[0]})
    // }

    Add = () => {
        //fungsi untuk membuka form edit data
        //membuka modal
        $("#modal_alamat").modal("show");
        //mengosongkan data pada form
        this.setState({
            action: "insert",
            id_alamat: "",
            nama_penerima: "",
            no_hp: "",
            provinsi: "",
            kota: "",
            kecamatan: "",
            detail_alamat: ""
        });
        if (!localStorage.getItem("Token")) {
            //direct ke halaman login
            window.location = "/login";
        }
    }

    // Edit = (item) => {
    //     //membuka modal
    //     $("#modal_profil").modal("show");
    //     //mengisikan data pada form
    //     this.setState({
    //         profil: [],
    //         action: "update",
    //         id_user: item.id_user,
    //         ktp: item.ktp,
    //         nama_ktp: item.nama_ktp,
    //         ttl: item.ttl,
    //         jenis_kelamin: item.jenis_kelamin,
    //         alamat_ktp: item.alamat_ktp,
    //         no_hp: item.no_hp,
    //         // action: "",
    //         // find: "",
    //         message: ""
    //     });
    //     if(!localStorage.getItem("Token")){
    //         //direct ke halaman login
    //         window.location = "/login";
    //     }
    // }

    get_alamat = () => {
        let id = JSON.parse(localStorage.getItem("id_alamat"))
        let url = "http://localhost/toko_online/toko_online/public/alamat/"+id;
        axios.get(url)
        .then(response => {
            this.setState({alamat: response.data.alamat})
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.get_alamat();
    }

    // Drop = (id_user) => {
    //     if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
    //         $("#loading").toast("show");
    //         let url = "http://localhost/toko_online/toko_online/public/profil/drop/"+id_user;
    //         axios.delete(url)
    //         .then(response => {
    //             $("#loading").toast("hide");
    //             this.setState({message: response.data.message});
    //             $("#message").toast("show");
    //             this.get_profil();
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    //     }
    // }

    Save = (event) => {
        event.preventDefault();
            //menampilkan proses loading
            // $("#loading").toast("show");
            //menutup form modal
            $("#modal_alamat").modal("hide");
            let url = "http://localhost/toko_online/toko_online/public/alamat/save";
            let form = new FormData();
            form.append("action", "update");
            form.append("id_alamat", this.state.id_alamat);
            form.append("nama_penerima", this.state.nama_penerima);
            form.append("no_hp", this.state.no_hp);
            form.append("provinsi", this.state.provinsi);
            form.append("kota", this.state.kota);
            form.append("kecamatan", this.state.kecamatan);
            form.append("detail_alamat", this.state.detail_alamat);
            axios.post(url, form)
            .then(response => {
                // $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_alamat();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { alamat, email } = this.state;
        console.log(alamat)
        console.log(email);
        return(
            <div className="container">
                <div className="card mt-2">
                    <h4 className="card-title text-center p-2 mb-1 bg-dark text-warning" style={{ fontWeight: "700" }}>Profile</h4>
                    <div style={{ paddingTop: "3%", paddingLeft: "5%" }}>
                        <div className="#" style={{ maxWidth: "200px" }}>
                            {/* <div className="row no-gutters"> */}
                                <div className="col-md-4">
                                    <img className="rounded float-left" src={Image} style={{ height: "240px", width: "200px" }} />
                                    <input aria-hidden="true" type="file" className="fa fa-upload" name="image" onChange={this.bindImage} required />
                                </div>
                                <div style={{ paddingTop: "2%", paddingLeft: "0%" }}>
                                    <div className="card-body">
                                        <table className="table table-borderless" style={{ paddingTop: "3%", paddingRight: "0%" }}>
                                            {profil.map((item,index) => {
                                                return(
                                                    <ul className="list-group" key={index}>
                                                        <li className="list-group-item">No.KTP : {item.ktp}</li>
                                                        <li className="list-group-item">Username : {item.nama_ktp}</li>
                                                        <li className="list-group-item">TTL : {item.ttl}</li>
                                                        <li className="list-group-item">Jenis Kelamin : {item.jenis_kelamin}</li>
                                                        <li className="list-group-item">Alamat : {item.alamat_ktp}</li>
                                                        <li className="list-group-item">No.HP : {item.no_hp}</li>
                                                        <button className="m-1 btn btn-outline-dark" onClick={() => this.Edit(item)}>
                                                            <span className="fa fa-edit"></span> Edit
                                                        </button>
                                                    </ul>
                                                );
                                            })}
                                        </table>
                                    </div>
                                </div>
                                <Modal id="modal_profil" title="Form Profile" bg_header="success" text_header="white">
                                    <form onSubmit={this.Save}>
                                        No.KTP
                                        <input type="text" className="form-control" name="ktp" value={this.state.ktp}
                                         onChange={this.bind} required />
                                        Username
                                        <input type="text" className="form-control" name="nama_ktp" value={this.state.nama_ktp}
                                         onChange={this.bind} required />
                                        TTL
                                        <input type="date" className="form-control" name="ttl" value={this.state.ttl}
                                         onChange={this.bind} required />
                                        Jenis Kelamin
                                        <input type="enum" className="form-control" name="jenis_kelamin" value={this.state.jenis_kelamin}
                                         onChange={this.bind} required />
                                        Alamat
                                        <input type="text" className="form-control" name="alamat_ktp" value={this.state.alamat_ktp}
                                         onChange={this.bind} required />
                                        No.HP
                                        <input type="text" className="form-control" name="no_hp" value={this.state.no_hp}
                                         onChange={this.bind} required />
                                        <button type="submit" className="btn btn-info pull-right m-2">
                                            <span className="fa fa-check"></span> Simpan
                                        </button>
                                    </form>
                                </Modal>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}

// <div className="container">
            //     <div className="card mt-2">
            //         <div className="col-lg-12">
            //             <br/>
            //             <h2 className="text-center p-2 mb-1 bg-info text-white">Client Profil</h2>
            //             <br/>
            //             <div id="col-md-4">
            //                 <img src={admin}
            //                 width="250px" height="250px" />
                        
            //             <div className="col-md-8 float-right">
            //                 <table className="table">
            //                 {this.state.profil.map((item) => {
            //                     return(
            //                     <ul className="list-group">
            //                         <li className= "list-group-item">Id : {item.id_user}</li>
            //                         <li className="list-group-item">No.KTP : {item.ktp}</li>
            //                         <li className="list-group-item">Nama : {item.nama_ktp}</li>
            //                         <li className="list-group-item">TTL : {item.ttl}</li>
            //                         <li className="list-group-item">Jenis Kelamin : {item.jenis_kelamin}</li>
            //                         <li className="list-group-item">Alamat : {item.alamat_ktp}</li>
            //                         <li className="list-group-item">No.HP : {item.no_hp}</li>
            //                         {/* <li className="list-group-item">Id : {item.id_user}</li> */}
            //                     </ul>
            //                         );
            //                     })}
            //                 </table>
            //                 <Link to="#">
            //                     <button className="mt-3 btn float-right btn-info">
            //                         <span className="fa fa-edit"></span> Edit
            //                     </button>
            //                 </Link>

            //                 <Modal id="modal_profil" title="Form Profil" bg_header="success"
            //                  text_header="white">
            //                 <form onSubmit={this.Save}>
            //                     Id Produk
            //                     <input type="number" className="form-control" name="id_user"
            //                     value={this.state.id_user} onChange={this.bind}
            //                     />
            //                     No.KTP
            //                     <input type="text" className="form-control" name="ktp"
            //                     value={this.state.ktp} onChange={this.bind}
            //                     />
            //                     Nama
            //                     <input type="text" className="form-control" name="nama_ktp"
            //                     value={this.state.nama_ktp} onChange={this.bind}
            //                     />
            //                     TTL
            //                     <input type="text" className="form-control" name="ttl"
            //                     value={this.state.ttl} onChange={this.bind}
            //                     />
            //                     Jenis Kelamin
            //                     <input type="text" className="form-control" name="jenis_kelamin"
            //                     value={this.state.jenis_kelamin} onChange={this.bind}
            //                     />
            //                     Alamat
            //                     <input type="text" className="form-control" name="alamat_ktp"
            //                     value={this.state.alamat_ktp} onChange={this.bind}
            //                     />
            //                     No.HP
            //                     <input type="text" className="form-control" name="no_hp"
            //                     value={this.state.no_hp} onChange={this.bind}
            //                     />
            //                     <button type="submit" className="btn btn-dark pull-right m-2">
            //                         <span className="fa fa-check"></span> Simpan
            //                     </button>
            //                 </form>
            //                 </Modal>
            //             </div>
            //             </div>
            //         </div>
            //     </div>
            //     <hr/>
            //     <h2 className="text-center p-2 mb-1 bg-dark text-warning">Data Pengiriman</h2>
            //     <table className="table">
            //         <ul className="list-group">
            //             <li className="list-group-item">Nama Penerima : {this.state.nama_penerima}</li>
            //             <li className="list-group-item">Kode Pos : {this.state.kode_pos}</li>
            //             <li className="list-group-item">Jalan : {this.state.jln}</li>
            //             <li className="list-group-item">RT : {this.state.rt}</li>
            //             <li className="list-group-item">RW : {this.state.rw}</li>
            //             <li className="list-group-item">Kecamatan : {this.state.kecamatan}</li>
            //             <li className="list-group-item">Kota : {this.state.kota}</li>
            //             <li className="list-group-item">Provinsi : {this.state.provinsi}</li>
            //         </ul>
            //     </table>
            //     <Link to="#">
            //         <button className="mt-3 btn btn-warning">
            //             <span className="fa fa-plus"></span> Tambah Alamat
            //         </button>
            //     </Link>

                
            // </div>