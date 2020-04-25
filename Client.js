import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import Book from './Book';

export default class Client extends React.Component
{
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

componentDidMount() {
    this.get_lapangan()
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
      const renderData = this.state.lapangan.map((item, id) => {
        return (
          <Book item={item} key={id}/>
        )
      })
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

                <div className="row">
                    {renderData}
                    <hr></hr>

                    <br/><br/><br/>
                </div>
              </div>
            </div>
          </div>
      );
    }
}
