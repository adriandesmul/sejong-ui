import React from 'react';
import EntryArea from './entryArea';
import API from '../api/api';

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
      this.setState({
        title: data.title,
        body: data.body,
        haveData: true
      })
    });
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
        this.setState({ msg: 'Save error' });
      } else {
        this.setState({ msg: 'Save successful' });
      }
    })
  }

  render() {
    let msg = this.state.msg;
    return (
      <div>
        <p>SijoEntry</p>
        {msg &&
          <p>{msg}</p>
        }
        <label>Sijo title:</label>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleInputChange}
        />
        {this.state.haveData &&
        <EntryArea
          initialValue={this.state.body}
          onChange={this.handleBodyChange}
        />
        }
        <button onClick={this.handleSave}>Save</button>
      </div>
    )
  }
}

export default SijoEntry;