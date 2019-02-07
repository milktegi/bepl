import React from 'react';
import FontAwesome from 'react-fontawesome';
import styles from './cardInfo.css'
import moment from 'moment';

const CardInfo = (props) => {

	const teamName = (teams, team) => {
		
		// find는 항상 
		// 일치하는 데이터의 싱글 데이터를
		// 반환하는 목적
		let data = teams.find((item) => {
			return item.teamId === team
		});
		if(data){
			return data.name;
		}
	}

	const formatDate = date => {
		moment.locale();
		return moment(date).format(' YYYY-MM-DD')
	}


	return (  
		<div className={styles.cardInfo}>
			<span className={styles.teamName}>
				{teamName(props.teams, props.team)}
			</span>
			<span className={styles.date}>
				<FontAwesome name="clock-o"/>
				{formatDate(props.date)}
			</span>
		</div>
	);
}
 
export default CardInfo;