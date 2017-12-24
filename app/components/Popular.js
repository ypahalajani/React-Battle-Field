var React = require('react');
var api = require('../utils/api');

function SelectedComponent(props) {
	var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
	return (
		<ul className="languages">
			{
				languages.map(function (lang, index){
					return (
						<li
							style={props.selectedLanguage === lang ? {
								color: '#d0021b' }: null}
							onClick={props.onSelected.bind(null, lang)} 
							key={index}>
							{lang}
						</li>
					)
				}, this)
			}
		</ul>
	)
}

class Popular extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedLanguage: 'All',
			repos: null
		}
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(lang) {
		this.setState(function () {
			return {
				selectedLanguage: lang,
				repos: null
			}
		})

		api.fetchPopularRepos(lang)
			.then(function (repos) {
				this.setState(function () {
					return {
						repos: repos
					}
				})
			}.bind(this));
	}

	render() {
		return (
			<div>
				<SelectedComponent 
					selectedLanguage={this.state.selectedLanguage}
					onSelected={this.updateLanguage}>
				</SelectedComponent>
			</div>
		);
	}
}
module.exports = Popular;