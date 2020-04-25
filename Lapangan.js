import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

export default class Lapangan extends Component {
  constructor(){
    super();
    this.state = {
      lapangan: [],
      id: "",
      nama: "",
      harga: "",
      gambar: null,
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

  bindGambar = (e) => {
    this.setState({gambar: e.target.files[0]})
  }

  Add = () => {
    $("#modal_produk").modal("show");
    // data form kosong
    this.setState({
      action: "insert",
      id: "",
      nama: "",
      harga: "",
      gambar: null
    });
  }

  Edit = (item) => {
    $("#modal_produk").modal("show");
    // data form kosong
    this.setState({
      action: "update",
      id: item.id,
      nama: item.nama,
      harga: item.harga,
      gambar: item.gambar
    });
  }

  get_lapangan = () => {

    let url = "http://localhost/lapangan/public/lapangan";
    axios.get(url)
    .then(response => {
      this.setState({lapangan: response.data.lapangan});

    })
    .catch(error => {
      console.log(error);
    });
  }

  Drop = (id) => {
    if (window.confirm("Apakah anda yakin ingin menghapus data lapangan ini?")) {
      let url = "http://localhost/lapangan/public/lapangan/drop/" + id;
      axios.delete(url)
      .then(response => {
        this.setState({message:response.data.message});
        this.get_lapangan();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  componentDidMount = () => {
    this.get_lapangan();
  }

  Save = (event) => {
    event.preventDefault();
    console.log(this.state.gambar)
    // menutup form modal
    $("#modal_produk").modal("hide");
    let url = "http://localhost/lapangan/public/lapangan/save";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id", this.state.id);
    form.append("nama", this.state.nama);
    form.append("harga", this.state.harga);
    form.append("gambar", this.state.gambar, this.state.gambar.nama);
    axios.post(url, form)
    .then(response => {
      this.setState({message: response.data.message});
      this.get_lapangan();
    })
    .catch(error => {
      console.log(error);
    });
  }
  search = (event) => {
    if (event.keyCode === 13) {
      let url = "http://localhost/lapangan/public/lapangan/find";
      let form = new FormData();
      form.append("find", this.state.find);
      axios.post(url, form)
      .then(response => {
        this.setState({lapangan: response.data.lapangan});
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
                <h4 className="text-white">Lapangan</h4>
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
                    <th className="text-success">Nama Lapangan</th>
                    <th className="text-primary">Harga</th>
                    <th className="text-danger">Image</th>
                    <th className="text-secondary">Option</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.lapangan.map((item) => {
                    return(
                    <tr key={item.id}>
                      <td className="font-weight-bold text-danger">{item.nama}</td>
                      <td className="font-weight-bold text-secondary">{item.harga}</td>
                      <td>
                        <img src={'http://localhost/lapangan/public/images/' + item.gambar}
                        alt={item.gambar} width="200px" height="100px"/>
                      </td>
                      <td>
                        <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                          <span className="fa fa-edit"></span>
                        </button>
                        <button className="m-1 btn btn-sm btn-danger" onClick={() => this.Drop(item.id)}>
                          <span className="fa fa-trash"></span>
                        </button>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>

              <button className="m-3 btn btn-sm btn-outline-success font-weight-bold" onClick={this.Add}>
                <span className="fa fa-plus"></span> Tambah Data
              </button>

              <Modal id="modal_produk" title="Form Lapangan" bg-header="warning" text_header="dark">
                <form onSubmit={this.Save}>
                  Nama Lapangan
                  <input type="text" className="form-control" name="nama" value={this.state.nama} onChange={this.bind} required />
                  Harga
                  <input type="text" className="form-control" name="harga" value={this.state.harga} onChange={this.bind} required />
                    Image
                  <input type="file" className="form-control" name="gambar" onChange={this.bindGambar} required />

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
