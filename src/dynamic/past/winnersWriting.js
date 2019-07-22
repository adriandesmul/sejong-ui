import React from 'react';

class WinnersWritingTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedYear: '2019'
		}

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(e) {
		console.log(e.target)
		this.setState({selectedYear: e.target.id})
	}

	render() {
		return (
  			<div>
				<p>
					<a onClick={handleClick} href='#' id='2019'>2019</a> |
					<a onClick={handleClick} href='#' id='2018'>2018</a> |
					<a onClick={handleClick} href='#' id='2017'>2017</a>
				</p>
				<p>{this.state.selectedYear}</p>
			</div>
		)
	}
}

export default WinnersWritingTable;
