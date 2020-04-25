import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

export default class Book extends React.Component{
  constructor(props){
    super(props);
      this.state = {
        lapangan: [],
        find: "",
        filter:""
        }
    }

    bind = (e) => {
      this.setState({[e.target.name]: e.target.value})
  }

  Book = () => {
    $("#modal_sewa").modal("show");
    // data form kosong
    this.setState({
      action: "insert",
      id_lapangan: "",
      id_user: "",
      tgl_book: "",
      wkt_mulai: "",
      wkt_selesai: "",
      biaya: ""
    });
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
    form.append("biaya", this.state.biaya);
    axios.post(url, form)
    .then(response => {
      this.setState({message: response.data.message});
      this.get_sewa();
    })
    .catch(error => {
      console.log(error);
    });
  }

  render(){
    const { item } = this.props;
    return (
        <div className="col-lg-4 col-md-6 mb-4">
        <div className="card h-100" style={{ marginBottom: "10px"}}>
            <a href="#"><img className="card-img-top" src={'http://localhost/lapangan/public/images/' + item.gambar} alt="" /></a>
                <div className="card-body">
                    <h4 className="card-title">
                        {item.nama}
                    </h4>
                    <h5>Rp. {item.harga}</h5>
                    <br />
                    <div>
                    <button className="font-weight-bold btn btn-outline-warning"
                        onClick={() =>this.Book(item)}>Book</button>
                    </div>
              <Modal id="modal_sewa" title="Form Sewa" bg-header="warning" text_header="dark">
                <form onSubmit={this.Save}>
                  Nama Lapangan
                  <input type="text" className="form-control" name="nama" value={this.state.nama} onChange={this.bind} required />
                  Tanggal Sewa
                  <input type="date" className="form-control" name="tgl_book" value={this.state.tgl_book} onChange={this.bind} required />
                  Waktu Mulai
                  <input type="time" className="form-control" name="wkt_mulai" value={this.state.wkt_mulai} onChange={this.bind} required />
                  Waktu Selesai
                  <input type="time" className="form-control" name="wkt_selesai" value={this.state.wkt_selesai} onChange={this.bind} required />
                  Biaya
                  <input type="text" className="form-control" name="biaya" value={this.state.biaya} onChange={this.bind} required />
                  <button type="submit" className="m-1 btn btn-sm btn-outline-warning" onClick={this.Save}>
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal>
            </div>
        </div>
        </div>
   )
}
}
