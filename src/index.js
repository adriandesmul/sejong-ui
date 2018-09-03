import _ from 'lodash';
//import 'froala-design-blocks';
import './style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Auth from './auth/auth';

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

    fetch(API_URL + '/user', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((result) => {
      return result.text();
    }).then((data) => {
      console.log(data);
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

const Index = () => {
  return <div>Hello react!</div>;
}

ReactDOM.render(<Index />, document.getElementById('index'));
