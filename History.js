import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

export default class History extends Component {
  constructor(props){
    super(props);
    this.state = {
      sewa: [],
      id_sewa: "",
    }
  }

get_sewa = async() => {
  const id = localStorage.getItem('id')
  const url = "http://localhost/lapangan/public/myorder/"+id
  axios.get(url)
  .then(res => {
    this.setState({sewa: res.data.sewa})
  })
  .catch(error => {
    console.log(error)
  })
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

  componentDidMount = () => {
    this.get_sewa();
  }

  render(){
    return(
          <div className="container">
            <div>
            <div style={{ paddingTop: "1%" }}>
              <div className="#" >

                  <div>
                  <div>
                      { this.state.sewa.map((item) => {
                      return(
                        <div className="card shadow" style={{marginTop: "2%", marginBottom: "4%"}} key={item.id_order}>
                          <div>
                          <h4 className="card-header text-center text-light bg-warning">RIWAYAT SEWA</h4>
                          </div>
                        <div className="card-body card-1">
                        <div className="row">
                          <div className="card col-md-11" style={{marginLeft: "4%"}}>
                        <table className="table ">
                          <tbody>
                        <tr className="list-group list-group-flush">
                          <td className="list-group-item text-center card-header">Nama Lapangan: {item.nama_lapangan}</td>
                          <td className="list-group-item text-center card-header">Waktu Mulai: {item.wkt_mulai}</td>
                          <td className="list-group-item text-center card-header">Waktu Selesai: {item.wkt_selesai}</td>
                          <td className="list-group-item text-center card-header">Biaya: {item.biaya}</td>
                          <td className="list-group-item text-center card-header">Status: {item.status}</td>
                          <td className="list-group-item text-center card-header">
                          <button className="m-1 btn btn-sm btn-danger" onClick={() => this.Drop(item.id_sewa)}>
                            <span className="fa fa-trash"></span> Hapus Data
                          </button>
                          </td>
                        </tr>
                        </tbody>
                        </table>
                        </div>
                        </div>
                        </div>
                        </div>
                        );
                      })}
                       </div>
                       </div>
              </div>
            </div>
            </div>
            </div>

        );

      }
}
