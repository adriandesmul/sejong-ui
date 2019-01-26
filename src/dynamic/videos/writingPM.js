import React from 'react';
import API from '../api/api';

const classNames = require('classnames');

class WritingPM extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentOpen: 'hipHop'
		}

    this.changeContent = this.changeContent.bind(this);
  }

  changeContent(content) {
    this.setState({ contentOpen: content });
  }


		render() {
	    return (
	      <div>
					<div class="tab" onClick={() => {this.changeContent('hipHop')}}>Hip-hop</div>
          <div class="tab" onClick={() => {this.changeContent('jazz')}}>Jazz</div>
          <div class="tab" onClick={() => {this.changeContent('classical')}}>Classical</div>
          <div class="tab" onClick={() => {this.changeContent('art')}}>Korean Art Songs</div>

					{this.state.contentOpen == "hipHop" &&
						<div class="card">
							<div>
								<h1>Hip-hop</h1>
							</div>
						</div>
					}
					{this.state.contentOpen == "jazz" &&
						<div class="card">
							<div>
								<h1>Jazz</h1>
							</div>
						</div>
					}
					{this.state.contentOpen == "classical" &&
						<div class="card">
							<div>
								<h1>Classical</h1>
							</div>
						</div>
					}
					{this.state.contentOpen == "art" &&
						<div class="card">
							<div>
								<h1>Korean Art Songs</h1>
							</div>
						</div>
					}
				</div>
			)
		}
}

export default WritingPM;
