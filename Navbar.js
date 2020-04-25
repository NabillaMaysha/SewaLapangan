import React, {Component} from "react";
import {Link} from "react-router-dom";
export default class Navbar extends Component {
  Logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("role");
    localStorage.removeItem("users");
    window.location = "/";
  }

  navGuest = () => {
    return(
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/client" className="nav-item nav-link text-light mr-4">Produk</Link>
          </li>
          <li>
            <Link to="/" className="nav-item nav-link text-light mr-4">Login</Link>
          </li>
        </ul>
      </div>
    )
  }

  navAdmin = () => {
    return(
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/lapangan" className="nav-item nav-link text-success mr-3">Lapangan</Link>
          </li>
          <li className="nav-item">
            <Link to="/user" className="nav-item nav-link text-primary mr-4">User</Link>
          </li>
          <li className="nav-item">
            <Link to="/sewa" className="nav-item nav-link text-secondary mr-4">Sewa</Link>
          </li>
          <li className="nav-item">
            <Link to="/profil" className="nav-item nav-link text-warning mr-4">Profil</Link>
          </li>
          <li className="nav-item">
            <a className="nav-item nav-link text-danger mr-4" onClick={this.Logout}>Logout</a>
          </li>
        </ul>
      </div>
    )
  }

  navUser = () => {
    return(
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/client" className="nav-item nav-link text-success mr-4">Daftar Lapangan</Link>
          </li>
          <li className="nav-item">
            <Link to="/history" className="nav-item nav-link text-secondary mr-4">History</Link>
          </li>
          <li className="nav-item">
            <Link to="/profil" className="nav-item nav-link text-primary mr-4">Profil Member</Link>
          </li>
          <li className="nav-item">
            <a className="nav-item nav-link text-danger mr-4" onClick={this.Logout}>Logout</a>
          </li>
        </ul>
      </div>
    )
  }

  render(){
    let auth = localStorage.getItem("Token")
    let role = JSON.parse(localStorage.getItem("role"))
      return(
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-tranparent">
            <a className="navbar-brand ml-12 text-warning" href="#">Sewa Lapangan</a>
            <button className="navbar-toggler btn-light" type="button" data-toggle="collapse"
            data-target="#navbarNav" aria-contols="navbarNav" aria-expanded="false"
            aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            { !auth ? this.navGuest() : role === "admin" ? this.navAdmin() : this.navUser() }
          </nav>
        </div>
      );
  }
}
