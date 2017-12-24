var React = require('react');

class PlayerInput extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			username: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		var value = event.target.value;

		this.setState(function () {
			return {
				username: value
			}
		})
	}
	handleSubmit(event) {
		event.preventDefault();
		this.props.handleSubmit(
			this.props.id,
			this.state.username
		);
	}
	render() {
		return (
			<form className='column' onSubmit={this.handleSubmit}>
				<label className='header' htmlFor='username'>
					{this.props.label}
				</label>
				<input id='username'
					placeholder='github username'
					type='text'
					autoComplete='off'
					value={this.state.username}
					onChange={this.handleChange}
				/>
				<button
					className='button'
					type='submit'
					disabled={!this.state.username}>
					Submit
				</button>
			</form>
		);
	}
}

class Battle extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			playerOneName: '',
			playerOneImg: null,
			playerTwoName: '',
			playerTwoImg: null
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(id, username) {
		this.setState(function () {
			var newState = {};
			newState[ id + 'Name' ] = username;
			newState[ id + 'Img' ] = 'https://www.github.com/' + username + '.png?size=200';
			return newState;
		});
	}
	render () {
		return (
			<div>
				<div className='row'>
					{ !this.state.playerOneName &&
						<PlayerInput 
							id='playerOne'
							label='Player One'
							handleSubmit={this.handleSubmit}/> }
					{ !this.state.playerTwoName &&
						<PlayerInput 
							id='playerTwo'
							label='Player Two'
							handleSubmit={this.handleSubmit}/> }
				</div>
			</div>
		);
	}
}

module.exports = Battle; 