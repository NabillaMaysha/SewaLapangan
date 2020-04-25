import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

export default class Profil extends Component {
  constructor(){
    super();
    this.state = {
      profil: [],
      id_user: "",
      username: "",
      email: "",
      password: "",
      role: "",
      first_name: "",
      last_name: "",
      gender: "",
      date_birth: "",
      no_hp: "",
      alamat:"",
      image: null,
      action: "",
      find: "",
      message: ""
    }
    if(!localStorage.getItem("Token")){
      window.location = "/";
    }
  }

  bind = (event) => {
    this.setState({[event.target.name] : event.target.value});
  }

  bindImage = (e) => {
    this.setState({image: e.target.files[0]})
  }

  get_profil = () => {
    let id = JSON.parse(localStorage.getItem('id'))
    let url = "http://localhost/lapangan/public/myprofil/" + id;
    axios.get(url)
    .then(response => {
      this.setState({profil: response.data.profil});
    })
    .catch(error => {
      console.log(error);
    });
  }

  Edit = (item) => {
    $("#modal_profil").modal("show");
    // data form kosong
    this.setState({
      action: "update",
      id: item.id,
      username: item.username,
      email: item.email,
      password: item.password,
      first_name: item.first_name,
      last_name: item.last_name,
      gender: item.gender,
      date_birth: item.date_birth,
      no_hp: item.no_hp,
      alamat: item.alamat,
    });
  }

  Save = (event) => {
    event.preventDefault();
    // menutup form modal
    $("#modal_profil").modal("hide");
    let url = "http://localhost/lapangan/public/myprofil/save";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id", this.state.id);
    form.append("username", this.state.username);
    form.append("email", this.state.email);
    form.append("password", this.state.password);
    form.append("first_name", this.state.first_name);
    form.append("last_name", this.state.last_name);
    form.append("gender", this.state.gender);
    form.append("date_birth", this.state.date_birth);
    form.append("no_hp", this.state.no_hp);
    form.append("alamat", this.state.alamat);
    axios.post(url, form)
    .then(response => {
      this.setState({message: response.data.message});
      this.get_profil();
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount = () => {
    this.get_profil();
  }

  render(){
    const { users, profil } = this.state;
    return (
      <div className="container">
        <div className="card">
              <div className="row">
                  <div className="col-sm-12">
                    <div className="card-body">
                      <h1 className="card-title text-center text-white bg-warning" style={{ fontWeight: "500" }}>- P R O F I L E -</h1>
                      <table className="table table-borderless">
                        {profil.map((item, index) => {
                          return (
                            <ul class="list-group" key={index}>
                              <li class="list-group-item"> Username : {item.username} </li>
                              <li class="list-group-item"> Email : {item.email} </li>
                              <br />
                              <li class="list-group-item"> Nama Lengkap : {item.first_name} {item.last_name} </li>
                              <li class="list-group-item"> Gender : {item.gender} </li>
                              <li class="list-group-item"> Tanggal Lahir : {item.date_birth} </li>
                              <button className="m-1 btn btn-sm btn-outline-warning" onClick={() => this.Edit(item)}>
                              <span className="fa fa-edit"></span>Edit
                              </button>
                            </ul>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                  <Modal id="modal_profil" title="Form Profil" bg_header="warning">
                    <form onSubmit={this.Save}>
                      Username
                      <input type="text" className="form-control" name="username"
                      value={this.state.username} onChange={this.bind} required />
                      Email
                      <input type="text" className="form-control" name="email"
                      value={this.state.email} onChange={this.bind} required />
                      Password
                      <input type="text" className="form-control" name="password"
                      value={this.state.password} onChange={this.bind} required />
                      First Name
                      <input type="text" className="form-control" name="first_name"
                      value={this.state.first_name} onChange={this.bind} required />
                      Last Name
                      <input type="text" className="form-control" name="last_name"
                      value={this.state.last_name} onChange={this.bind} required />
                      Gender
                      <input type="text" className="form-control" name="gender"
                      value={this.state.gender} onChange={this.bind} required />
                      Tanggal Lahir
                      <input type="date" className="form-control" name="date_birth"
                      value={this.state.date_birth} onChange={this.bind} required />
                      No HP
                      <input type="text" className="form-control" name="no_hp"
                      value={this.state.no_hp} onChange={this.bind} required />
                      Alamat
                      <input type="text" className="form-control" name="alamat"
                      value={this.state.alamat} onChange={this.bind} required />
                      <button type="submit" className="btn btn-warning pull-right m-2">
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
