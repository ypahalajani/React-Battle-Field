var React = require('react');
var PropTypes = require('prop-types');

function PlayerPreview(props) {
	return (
		<div>
			<div className='column'>
				<img
					className='avatar'
					src={props.avatar}
					alt={'Avatar for ' + props.username}
				/>
				<h2 className='username'>@{props.username}</h2>
			</div>
			<button
				className='reset'
				onClick={props.onReset.bind(null, props.id)}>
				Reset
			</button>
		</div>
	);
}

PlayerPreview.propTypes = {
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	onReset: PropTypes.func.isRequired
}

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
		this.handleReset = this.handleReset.bind(this);
	}
	handleSubmit(id, username) {
		this.setState(function () {
			var newState = {};
			newState[ id + 'Name' ] = username;
			newState[ id + 'Img' ] = 'https://www.github.com/' + username + '.png?size=200';
			return newState;
		});
	}
	handleReset(id) {
		this.setState(function () {
				var newState = {};
				newState[ id + 'Name' ] = '';
				newState[ id + 'Img' ] = null;
				return newState;
		});
	}
	render () {
		var playerOneName = this.state.playerOneName;
		var playerTwoName = this.state.playerTwoName;
		var playerOneImg = this.state.playerOneImg;
		var playerTwoImg = this.state.playerTwoImg;
		return (
			<div>
				<div className='row'>
					{ !playerOneName &&
						<PlayerInput 
							id='playerOne'
							label='Player One'
							handleSubmit={this.handleSubmit}/> }
					
					{ playerOneImg !== null &&
						<PlayerPreview
							avatar={playerOneImg}
							username={playerOneName}
							onReset={this.handleReset}
							id='playerOne'
						/>}		

					{ !playerTwoName &&
						<PlayerInput 
							id='playerTwo'
							label='Player Two'
							handleSubmit={this.handleSubmit}/> }
				
					{ playerTwoImg !== null &&
						<PlayerPreview
							avatar={playerTwoImg}
							username={playerTwoName}
							onReset={this.handleReset}
							id='playerTwo'
						/>}

				</div>
			</div>
		);
	}
}

module.exports = Battle; 