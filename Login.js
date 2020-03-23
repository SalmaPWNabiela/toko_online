import React, {Component} from "react";
import axios from "axios";
import Toast from "../component/Toast";
import $ from "jquery";
import {Link} from "react-router-dom";

class Login extends Component{
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            role: "",
            massage: "",
        } 
    }
    
    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    Login = (event) => {
        event.preventDefault();
        let url = "http://localhost/toko_online/toko_online/public/user/auth";
        let form = new FormData();
        // form.append("name", this.state.name);
        form.append("email", this.state.email);
        form.append("password", this.state.password);
        // form.append("role", this.state.role);
        axios.post(url, form)
        .then(response => {
            let logged = response.data.status;
            if(logged) {
                let role = localStorage.getItem("role")
                { role === "admin" ? window.location = "/produk" : window.location = "/" }
                this.setState({message: "Login Berhasil"});
                localStorage.setItem("Token", response.data.token);
                localStorage.setItem("role", JSON.stringify(response.data.role));
                localStorage.setItem("id_user", JSON.stringify(response.data.user.id_user));
                window.location = "/products";
            }
            else{
                this.setState({message: "Login Gagal"});
            }
            $("#message").toast("show");
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        return(
            <div className="container width" 
             style={{width: 24 + "rem", paddingTop: 6 + "rem"}}>
                <div className="card my-2">
                    <div className="card-header bg-dark">
                        <h3 className="text-white text-center">Login User</h3>
                    </div>
                    <div className="card-body">
                        <Toast id="message" autohide="false" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <form onSubmit={this.Login} className="mt-4">
                            <div className="form-group">
                                <input type="email" className="form-control" name="email"
                                 value={this.state.email} onChange={this.bind}
                                placeholder="Enter Email" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password"
                                 value={this.state.password} onChange={this.bind}
                                 required placeholder="Enter Password" />
                            </div>
                            
                            <button className="mt-2 btn btn-block btn-dark" type="submit">
                                <span className="fa fa-sign-in"></span> Login
                            </button>
                        </form>
                        <p className="text-center mt-2">Don't have an account?
                        <Link to="/registrasi">Registration</Link></p>
                        {/* <Link to='/registrasi'>Registrasi</Link> */}
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;