import _ from 'lodash';
//import 'froala-design-blocks';
import './style.scss';
import 'react-quill/dist/quill.snow.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Auth from './dynamic/auth/auth';
//import User from './user/user';
import SijoEntry from './dynamic/writingEntry/sijoEntry';

class AuthorizedRequest extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.state = {
      data: null
    }
  }

  getData() {
    var token = localStorage.getItem('loginToken');
    if (!token) {
      this.setState({data: "Not logged in"});
      return;
    }

    fetch(API_URL + '/demographics', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((result) => {
      return result.text();
    }).then((data) => {
      this.setState({data: data});
    })
  }

  render() {
    return (
      <div>
        <p>{this.state.data}</p>
        <button onClick={this.getData}>Get Data!</button>
      </div>
    )
  }
}

ReactDOM.render(<Auth />, document.getElementById('auth'));
ReactDOM.render(<AuthorizedRequest />, document.getElementById('request'));
ReactDOM.render(<SijoEntry />, document.getElementById('sijo'));

const Index = () => {
  return <div>Hello react!</div>;
}

ReactDOM.render(<Index />, document.getElementById('index'));
