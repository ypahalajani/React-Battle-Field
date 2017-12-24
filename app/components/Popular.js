var React = require('react');

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
		return (
			<div>
				<SelectedComponent 
					selectedLanguage={this.state.selectedLanguage}
					onSelected={this.onLanguageSelected}>
				</SelectedComponent>
			</div>
		);
	}
}
module.exports = Popular;