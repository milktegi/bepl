import React from 'react';
import styles from '../articles.css';
import moment from 'moment';


const formatDate = date => {
	return moment(date).format(' YYYY-MM-DD');
}

const postData = (props) => {
	return ( 
		<div className={styles.articlePostData}>
			<div>
				기사입력:
				<span>{formatDate(props.data.date)}</span>
			</div>
			<div>
				기자: 
				<span>  {props.data.author}</span>
			</div>
		</div>
	 );
}
 
export default postData;