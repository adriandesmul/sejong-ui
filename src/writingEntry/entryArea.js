import React from 'react';
import ReactQuill from 'react-quill';

class EntryArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }
    this.handleChange = this.handleChange.bind(this);
    this.modules = {
      toolbar: [
        ['bold', 'italic', 'underline'],
        ['clean']
      ]
    }
    this.formats = ['bold', 'italic', 'underline'];
  }

  handleChange(value) {
    this.setState({ text: value });
    this.props.onChange(this.state.text)
  }

  render() {
    return (
      <ReactQuill value={this.state.text}
                  onChange={this.handleChange}
                  modules={this.modules}
                  formats={this.formats} />
    )
  }
}

export default EntryArea;
