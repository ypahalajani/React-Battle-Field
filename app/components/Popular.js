var React = require('react');
var PropTypes = require('prop-types');
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

function RepoGrid (props) {
	console.log(props);
	return (
		<ul className='popular-list'>
			{ 
			props.repos.map(function (repo, index) {
				return (
					<li key={repo.name} className='popular-item'>
						<div className='popular-rank'>#{index + 1}</div>
						<ul className='space-list-items'>
							<li>
								<img
									className='avatar'
									src={repo.owner.avatar_url}
									alt={'Avatar for ' + repo.owner.login} />
							</li>
							<li>@{repo.owner.login}</li>
							<li>{repo.stargazers_count} stars</li>
						</ul>
					</li>
					)
				})
			}
		</ul>
	)
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
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
				{!this.state.repos
					? <p> LOADING...</p>
					: <RepoGrid repos={this.state.repos} />}
			</div>
		);
	}
}
module.exports = Popular;