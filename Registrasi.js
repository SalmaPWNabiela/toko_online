import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

class Registrasi extends Component{
    constructor(){
        super();
        this.state = {
            user: [],
            id_user:"",
            nama: "",
            email: "",
            password: "", 
            repassword: "",
            role: "user",
            action:"",
            find: "",
            massage: ""
        } 
    }

    bind = (e) => {
        this.setState({ [e.target.name] : e.target.value})
    }

    Save = (event) => {
        event.preventDefault();
        if(this.state.password === this.state.repassword){
            let url = "http://localhost/toko_online/toko_online/public/register";
            let form = new FormData();
            form.append("name", this.state.nama)
            form.append("email", this.state.email)
            form.append("password", this.state.password)
            axios.post(url, form)
            .then(response => {
                this.setState({massage: response.data.message})
                this.get_user()
                
            })
            .catch(error => {
                console.log(error);
                window.location = "/login";
            });
        }
        else{
            window.location = "/registrasi";
        }
    }

    render(){
        return(
            <div className="container width"
             style={{width: 24 + "rem", paddingTop: 6 + "rem"}}>
                <h2 className="mt-4 text-center">Registration</h2> <br/>
                <form onSubmit={this.Save}>
                    Username
                    <input type="text" className="form-control mt-2" name="nama" placeholder="Enter Username" 
                     value={this.state.nama} onChange={this.bind}
                     required />
                    Email
                    <input type="email" className="form-control mt-2" name="email" placeholder="Enter Email" 
                     value={this.state.email} onChange={this.bind}
                     required />
                    Password
                    <input type="password" className="form-control mt-2" name="password" placeholder="Enter Password" 
                     value={this.state.password} onChange={this.bind}
                     required />
                    Re-Enter Password
                    <input type="password" className="form-control mt-2" name="repassword" placeholder="Enter Username" 
                     value={this.state.repassword} onChange={this.bind}
                     required />
                    <div class="form-group form-check">
                        <label class="form-check-label">
                        <input class="form-check-input" onChange={this.bind} type="checkbox" name="remember" required /> I agree on this registration.
                            <div class="valid-feedback">Valid.</div>
                            <div class="invalid-feedback">Check this checkbox to continue.</div>
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary">Registrasi</button>
                </form>
                <p className="text-center mt-2">Already have any account? 
                 <Link to="/login">Login</Link></p>
                {/* <Link to="/login">Login</Link> */}
            </div>
        )
    }
}
export default Registrasi;