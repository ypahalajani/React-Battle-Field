var React = require('react');

class Popular extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedLanguage: 'All'
		}
		this.onLanguageSelected = this.onLanguageSelected.bind(this);
	}
	onLanguageSelected(lang) {
		this.setState(function () {
			return {
				selectedLanguage: lang
			}
		})
	}
	render() {
		var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
		return (
			<ul className="languages">
				{
					languages.map(function (lang, index){
						return (
							<li
								style={this.state.selectedLanguage === lang ? {
									color: '#d0021b' }: null}
								onClick={this.onLanguageSelected.bind(null, lang)} 
								key={index}>
								{lang}
							</li>
						)
					}, this)
				}
			</ul>
		);
	}
}
module.exports = Popular;