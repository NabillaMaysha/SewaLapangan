import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

export default class Sewa extends Component {
  constructor(){
    super();
    this.state = {
      sewa: [],
      id: "",
      id_lapangan: "",
      id_user: "",
      tgl_book: "",
      wkt_mulai: "",
      wkt_selesai: "",
      durasi: "",
      biaya: "",
      status: "",
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

  get_sewa = () => {
    let url = "http://localhost/lapangan/public/sewa";
    axios.get(url)
    .then(response => {
      this.setState({sewa: response.data.sewa});
    })
    .catch(error => {
      console.log(error);
    });
  }

  Add = () => {
    $("#modal_sewa").modal("show");
    // data form kosong
    this.setState({
      action: "insert",
      id_lapangan: "",
      id_user: "",
      tgl_book: "",
      wkt_mulai: "",
      wkt_selesai: ""
    });
  }

  Edit = (item) => {
    $("#modal_sewa").modal("show");
    // data form kosong
    this.setState({
      action: "update",
      id_lapangan: item.id_lapangan,
      id_user: item.id_user,
      tgl_book: item.tgl_book,
      wkt_mulai: item.wkt_mulai,
      wkt_selesai: item.wkt_selesai
    });
  }

  Drop = (id_sewa) => {
    if (window.confirm("Apakah anda yakin ingin menghapus data sewa ini?")) {
      let url = "http://localhost/lapangan/public/sewa/drop/" + id_sewa;
      axios.delete(url)
      .then(response => {
        this.setState({message:response.data.message});
        this.get_sewa();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  Save = (event) => {
    event.preventDefault();
    // menutup form modal
    $("#modal_sewa").modal("hide");
    let url = "http://localhost/lapangan/public/sewa/save";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id_lapangan", this.state.id_lapangan);
    form.append("id_user", this.state.id_user);
    form.append("tgl_book", this.state.tgl_book);
    form.append("wkt_mulai", this.state.wkt_mulai);
    form.append("wkt_selesai", this.state.wkt_selesai);
    axios.post(url, form)
    .then(response => {
      this.setState({message: response.data.message});
      this.get_sewa();
    })
    .catch(error => {
      console.log(error);
    });
  }

  Used = (id_sewa) => {
    if (window.confirm("Apakah anda yakin dengan pilihan ini?")) {
      let url = "http://localhost/lapangan/public/sewa/used/" + id_sewa;
      axios.post(url)
      .then(response => {
        this.get_sewa();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  Done = (id_sewa) => {
    if (window.confirm("Apakah anda yakin dengan pilihan ini?")) {
      let url = "http://localhost/lapangan/public/sewa/done/" + id_sewa;
      axios.post(url)
      .then(response => {
        this.get_sewa();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  componentDidMount = () => {
    this.get_sewa();
  }

  search = (event) => {
    if (event.keyCode === 13) {
      // keyCode 13 = tombol enter
      let url = "http://localhost/lapangan/public/sewa/find";
      let form = new FormData();
      form.append("find", this.state.find);
      axios.post(url, form)
      .then(response => {
        this.setState({sewa: response.data.sewa});
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
                <h4 className="text-white">Sewa</h4>
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
                    <th>Nama Lapangan</th>
                    <th>Nama User</th>
                    <th>Tgl Sewa</th>
                    <th>Mulai</th>
                    <th>Selesai</th>
                    <th>Biaya</th>
                    <th>Status</th>
                    <th className="text-center">Option</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.sewa.map((item) => {
                    return(
                      <tr key={item.id}>
                        <td>{item.nama_lapangan}</td>
                        <td>{item.username}</td>
                        <td>{item.tgl_book}</td>
                        <td>{item.wkt_mulai}</td>
                        <td>{item.wkt_selesai}</td>
                        <td>{item.biaya}</td>
                        <td>{item.status}</td>
                        <td>
                          <button className="m-1 btn btn-sm btn-info" onClick={() => this.Used(item.id_sewa)}>
                            <span className="fa fa-check-circle"></span> Used
                          </button>
                          <button className="m-1 btn btn-sm btn-danger" onClick={() => this.Done(item.id_sewa)}>
                            <span className="fa fa-times-circle"></span> Done
                          </button>
                          <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span> Edit
                          </button>
                          <button className="m-1 btn btn-sm btn-danger" onClick={() => this.Drop(item.id_sewa)}>
                            <span className="fa fa-times-circle"></span> Drop
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <button className="m-3 btn btn-sm btn-outline-warning" onClick={this.Add}>
                <span className="fa fa-plus"></span> Tambah Data Sewa
              </button>

              <Modal id="modal_sewa" title="Form Sewa" bg-header="warning" text_header="dark">
                <form onSubmit={this.Save}>
                  ID Lapangan
                  <input type="text" className="form-control" name="id_lapangan" value={this.state.id_lapangan} onChange={this.bind} required />
                  ID User
                  <input type="text" className="form-control" name="id_user" value={this.state.id_user} onChange={this.bind} required />
                  Tanggal Sewa
                  <input type="date" className="form-control" name="tgl_book" value={this.state.tgl_book} onChange={this.bind} required />
                  Waktu Mulai
                  <input type="time" className="form-control" name="wkt_mulai" value={this.state.wkt_mulai} onChange={this.bind} required />
                  Waktu Selesai
                  <input type="time" className="form-control" name="wkt_selesai" value={this.state.wkt_selesai} onChange={this.bind} required />
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
