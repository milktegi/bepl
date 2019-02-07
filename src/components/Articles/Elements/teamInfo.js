import React from 'react';
import styles from '../articles.css';

const teamInfo = props => (
	<div className={styles.articleTeamHeader}>
		<div className={styles.left}
			style={{
				background:`url('/images/teams/${props.team.logo}')`
			}}
			>
		</div>
		<div className={styles.right}>
			<div>
				<span>
					{props.team.city} {props.team.name}
				</span>
			</div>
			<div>
				<strong>
					승점: {props.team.stats[0].games}
					승: {props.team.stats[0].wins} 
					무: {props.team.stats[0].draw}
					패: {props.team.stats[0].defeats}
					득실차: {props.team.stats[0].goaldifference}
				</strong>
			</div>
		</div>
	</div>
)

export default teamInfo;