import React from 'react';
import API from '../api/api';

const classNames = require('classnames');

class WritingPM extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		      title: '',
		      body: '',
		      msg: null,
		      haveData: false
		    }
    }

		render() {
	    return (
	      <div>
					<div class="tab" onClick={
						() => {this.setState((state) => {
							return {'hiphopOpen': !state.hiphopOpen}
					})}}>Hip-hop</div>
					<div class="tab" onClick={
						() => {this.setState((state) => {
							return {'jazzOpen': !state.jazzOpen}
					})}}>Jazz</div>
					<div class="tab" onClick={
						() => {this.setState((state) => {
							return {'classicalOpen': !state.classicalOpen}
					})}}>Classical</div>
					<div class="tab" onClick={
						() => {this.setState((state) => {
							return {'artOpen': !state.artOpen}
					})}}>Korean Art Songs</div>

					{this.state.hiphopOpen &&
						<div class="card">
							<div>
								<h1>Hip-hop</h1>
							</div>
						</div>
					}
					{this.state.jazzOpen &&
						<div class="card">
							<div>
								<h1>Jazz</h1>
							</div>
						</div>
					}
					{this.state.classicalOpen &&
						<div class="card">
							<div>
								<h1>Classical</h1>
							</div>
						</div>
					}
					{this.state.artOpen &&
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
