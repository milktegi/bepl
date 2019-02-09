import React, { Component } from 'react';
import styles from './dashboard.css';
import FormFields from '../widgets/FormFields/formfields'

class Dashboard extends Component {

	state = {
		postError: '',
		loading: false,
		formdata: {
			email: {
				element: 'input',
				value: '',
				config: {
					name: 'author_input',
					type: 'text',
					placeholder: 'enter you email'
				},
				validation: {
					required: true
					// email: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			}
		},
		title: {
			element: 'input',
			value: '',
			config: {
				name: 'title_input',
				type: 'text',
				placeholder: 'enter title'
			},
			validation: {
				required: true
			},
			valid: false,
			touched: false,
			validationMessage: ''
		}
	}

	submitForm = () => {

	}

	render(){
		return(
			<div className={styles.postContainer}>
				<form onSubmit={this.submitForm}>
					<h2>add post</h2>

					dashboard
				</form>
			</div>
		)
	}
}

export default Dashboard;