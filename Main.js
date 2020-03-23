import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import Navbar from "./component/Navbar";
import Produk from "./page/Produk";
import User from "./page/User";
import Products from "./client/Products";
// import ProductItem from "./client/ProductItem";
import Cart from "./client/Cart";
import Login from "./page/Login";
import Registrasi from "./page/Registrasi";
import Profil from "./client/Profil";
import ListOrder from "./page/ListOrder";

class Main extends Component{
    render = () => {
        return(
            <Switch>
                {/* load component tiap halaman */}
                {/* <Route path="/login" component={Login} /> */}
                <Route path="/produk">
                    <Navbar />
                    <Produk />
                </Route>
                <Route path="/user">
                    <Navbar />
                    <User />
                </Route>
                <Route path="/products">
                    <Navbar />
                    <Products />
                </Route>
                <Route path="/cart">
                    <Navbar />
                    <Cart />
                </Route>
                <Route path="/profil">
                    <Navbar />
                    <Profil />
                </Route>
                <Route path="/login">
                    <Navbar />
                    <Login />
                </Route>
                <Route path="/registrasi">
                    <Navbar />
                    <Registrasi />
                </Route>
                <Route path="/listOrder">
                    <Navbar />
                    <ListOrder />
                </Route>
            </Switch>
        );
    }
}
export default Main;