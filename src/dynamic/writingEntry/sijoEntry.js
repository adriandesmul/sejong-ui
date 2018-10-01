import React from 'react';
import EntryArea from './entryArea';
import API from '../api/api';
import './writingEntry.scss';

const classNames = require('classnames');

class SijoEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      msg: null,
      haveData: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    API.get('/writing/sijo', (err, data) => {
      !this.isCancelled && this.setState({
        title: data ? data.title : '',
        body: data ? data.body : '',
        haveData: true
      })
    });
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleBodyChange(content) {
    this.setState({
      body: content
    });
  }

  handleSave() {
    var payload = {
      title: this.state.title,
      body: this.state.body,
      entryType: 'sijo'
    }

    API.post('/writing/save', payload, (status) => {
      if (status != '200') {
        this.setState({ msg: {
          body: 'Save error',
          type: 'error'
        }});
      } else {
        this.setState({ msg: {
          body: 'Save successful',
          type: 'success'
        }});
      }
    })
  }

  render() {
    let msg = this.state.msg;
    let msgClass;
    if (msg) { msgClass = classNames(['scs-message', msg.type]) }

    return (
      <div className="scs-module">
        <div className="scs-header">Sijo Entry</div>
        {msg &&
          <div className={msgClass}>{msg.body}</div>
        }
        {this.state.haveData &&
        <input
          type="text"
          name="title"
          placeholder="Sijo title"
          className="scs-input"
          value={this.state.title}
          onChange={this.handleInputChange}
        />
        }
        {this.state.haveData &&
        <EntryArea
          initialValue={this.state.body}
          onChange={this.handleBodyChange}
        />
        }
        <a className="scs-button" onClick={this.handleSave}>Save</a>
      </div>
    )
  }
}

export default SijoEntry;
