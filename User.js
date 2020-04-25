import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

export default class User extends Component {
  constructor(){
    super();
    this.state = {
      member: [],
      id: "",
      username: "",
      email: "",
      password: "",
      role: "",
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

  get_user = () => {
    let url = "http://localhost/lapangan/public/member";
    axios.get(url)
    .then(response => {
      this.setState({member: response.data.member});
    })
    .catch(error => {
      console.log(error);
    });
  }

  Add = () => {
    $("#modal_user").modal("show");
    // data form kosong
    this.setState({
      action: "insert",
      id: "",
      username: "",
      email: "",
      password: "",
      role: ""
    });
  }

  Edit = (item) => {
    $("#modal_user").modal("show");
    // data form kosong
    this.setState({
      action: "update",
      id: item.id,
      username: item.username,
      email: item.email,
      password: item.password,
      role: item.role
    });
  }

  Drop = (id) => {
    if (window.confirm("Apakah anda yakin ingin menghapus data member ini?")) {
      let url = "http://localhost/lapangan/public/member/drop/" + id;
      axios.delete(url)
      .then(response => {
        this.setState({message:response.data.message});
        this.get_user();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  Save = (event) => {
    event.preventDefault();
    // menutup form modal
    $("#modal_user").modal("hide");
    let url = "http://localhost/lapangan/public/member/save";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id", this.state.id);
    form.append("username", this.state.username);
    form.append("email", this.state.email);
    form.append("password", this.state.password);
    form.append("role", this.state.role);
    axios.post(url, form)
    .then(response => {
      this.setState({message: response.data.message});
      this.get_user();
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount = () => {
    this.get_user();
  }

  search = (event) => {
    if (event.keyCode === 13) {
      // keyCode 13 = tombol enter
      let url = "http://localhost/lapangan/public/member/find";
      let form = new FormData();
      form.append("find", this.state.find);
      axios.post(url, form)
      .then(response => {
        this.setState({member: response.data.member});
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  render(){
    return (
      <div className="container">
        <div className="card">
          <div className="card-header bg-warning">
            <div className="row">
              <div className="col-sm-8">
                <h4 className="text-white">Member</h4>
              </div>
              <div className="col-sm-4">
                <input type="text" className="form-control" name="find"
                  onChange={this.bind} value={this.state.find}
                  onKeyUp={this.search} placeholder="Pencarian..." />
                </div>
              </div>
            </div>
            {/* content card */}
            <div className="card-body bg-light">
              <Toast id="message" autohide="true" title="Informasi">
                {this.state.message}
              </Toast>
              <Toast id="loading" autohide="false" title="Informasi">
                <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
              </Toast>
              <table className="table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.member.map((item) => {
                    return(
                      <tr key={item.id}>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>
                          <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span> Edit
                          </button>
                          <button className="m-1 btn btn-sm btn-danger" onClick={() => this.Drop(item.id)}>
                            <span className="fa fa-trash"></span> Drop
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <button className="m-3 btn btn-sm btn-outline-warning" onClick={this.Add}>
                <span className="fa fa-plus"></span> Tambah Data Member
              </button>

              <Modal id="modal_user" title="Form Sewa" bg-header="warning" text_header="dark">
                <form onSubmit={this.Save}>
                  Username
                  <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.bind} required />
                  Email
                  <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.bind} required />
                  Password
                  <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.bind} required />
                  Role
                  <input type="text" className="form-control" name="role" value={this.state.role} onChange={this.bind} required />

                  <button type="submit" className="m-1 btn btn-sm btn-outline-warning">
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
