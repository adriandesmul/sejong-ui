import React from 'react';
import EntryArea from './entryArea';
import API from '../api/api';
import './writingEntry.scss';
import ButtonOptions from '../common/buttonOptions';
import DropdownOptions from '../common/dropdownOptions';
import constants from '../common/constants';

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
    this.handlePreview = this.handlePreview.bind(this);
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
      if (status !== 200) {
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

  handlePreview() {
    API.get('/writing/generate/essay', (error, data) => {
      console.log(data)
      var newBlob = new Blob([data], {type: "application/pdf"})

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      const url = window.URL.createObjectURL(newBlob);
      var link = document.createElement('a');
      link.href = url;
      link.download="preview.pdf";
      link.click();
      setTimeout(() => window.URL.revokeObjectURL(url), 100)
    })
  }

  render() {
    let msg = this.state.msg;
    let msgClass;
    if (msg) { msgClass = classNames(['scs-message', msg.type]) }

    return (
      <div className="scs-module essay">
        <div className="scs-header">
          <p>Essay Entry</p>
          {this.state.unsavedChanges && <p className="unsaved">Unsaved changes</p>}
        </div>
        {msg &&
          <div className={msgClass}>{msg.body}</div>
        }
        <div className="scs-module-element">
          <label>Title: </label>
          <input
            type="text"
            name="title"
            placeholder="Essay title optional"
            className="scs-input"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="scs-module-element">
          <label>Division: </label>
          <ButtonOptions options={constants.essayDivisions}
                         onUpdate={this.selectDivison}
                         value={this.state.division} />
        </div>
        {this.state.division === 'Junior' &&
        <div className="scs-module-element">
          <label>Folktale: </label>
          <ButtonOptions options={constants.juniorFolktales}
                         onUpdate={this.selectFolktale}
                         value={this.state.folktale} />
        </div>
        }
        {this.state.haveData &&
        <div className="scs-entry-area essay">
					<EntryArea
          	initialValue={this.state.body}
          	onChange={this.handleBodyChange}
          	type='essay'
        	/>
				</div>
        }
        <a className="scs-button save" onClick={this.handleSave}>Save</a>
        <a className="scs-button preview" onClick={this.handlePreview}>Preview</a>
      </div>
    )
  }
}

export default EssayEntry;
