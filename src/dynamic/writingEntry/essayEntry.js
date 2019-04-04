import React from 'react';
import EntryArea from './entryArea';
import API from '../api/api';
import './writingEntry.scss';
import ButtonOptions from '../common/buttonOptions';

const classNames = require('classnames');

class EssayEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      division: null,
      folktale: null,
      unsavedChanges: false,
      msg: null,
      haveData: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.selectDivison = this.selectDivison.bind(this);
    this.selectFolktale = this.selectFolktale.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    API.get('/writing/essay', (err, data) => {
      !this.isCancelled && this.setState({
        title: data ? data.title : '',
        body: data ? data.body : '',
        division: data ? data.division : null,
        folktale: data ? data.folktale : null,
        unsavedChanges: false,
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
      [target.name]: target.value,
      unsavedChanges: true
    });
  }

  handleBodyChange(content) {
    if (content === this.state.body) { return; }
    this.setState({
      body: content,
      unsavedChanges: true
    });
  }

  selectDivison(division) {
    if (division === "Junior") {
      this.setState({ division: division, unsavedChanges: true })
    } else {
      this.setState({
        division: division,
        folktale: null,
        unsavedChanges: true
      })
    }
  }

  selectFolktale(folktale) {
    this.setState({ folktale: folktale, unsavedChanges: true })
  }

  handleSave() {
    var payload = {
      title: this.state.title,
      body: this.state.body,
      division: this.state.division,
      folktale: this.state.folktale,
      entry_type: 'essay'
    }

    API.post('/writing/save', payload, (status) => {
      if (status != '200') {
        this.setState({ msg: {
          body: 'Save error',
          type: 'error'
        }});
      } else {
        this.setState({
          msg: {
            body: 'Save successful',
            type: 'success'
          }, unsavedChanges: false
        });
      }
    })
  }

  render() {
    let msg = this.state.msg;
    let msgClass;
    if (msg) { msgClass = classNames(['scs-message', msg.type]) }

    return (
      <div className="scs-module">
        <div className="scs-header">
          <span>Essay Entry</span>
          {this.state.unsavedChanges && <span>Unsaved changes</span>}
        </div>
        {msg &&
          <div className={msgClass}>{msg.body}</div>
        }
        <div className="scs-module-element">
          <label>Title: </label>
          <input
            type="text"
            name="title"
            placeholder="Essay title"
            className="scs-input"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="scs-module-element">
          <label>Division: </label>
          <ButtonOptions options={['Junior', 'Senior', 'Adult']}
                         onUpdate={this.selectDivison}
                         value={this.state.division} />
        </div>
        {this.state.division === 'Junior' &&
        <div className="scs-module-element">
          <label>Folktale: </label>
          <ButtonOptions options={['Folktale A', 'Folktale B', 'Folktale C', 'Folktale D',
                          'Folktale E', 'Folktale F', 'Folktale G', 'Folktale H']}
                         onUpdate={this.selectFolktale}
                         value={this.state.folktale} />
        </div>
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

export default EssayEntry;
