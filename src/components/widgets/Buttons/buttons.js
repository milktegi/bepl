import React from 'react';
import { Link } from 'react-router-dom';

import styles from './buttons.css';

const buttons = props => {
		let template = null;

		switch(props.type){
			case 'loadmore':
			template = (
				<div 
				className={styles.blue_btn}
				onClick={props.loadMore}
				>
			  <strong>{props.cta}</strong>	
				</div>
			)
			break;
		case 'linkTo' :
		template = (
			<div>
				<Link className={styles.blue_btn} to={props.linkTo}>
					{props.cta}
				</Link>
			</div>
		)
		break;
			default: 
			template = null;

		}
		return template;
}

export default buttons;