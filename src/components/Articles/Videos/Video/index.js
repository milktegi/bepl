import React, { Component } from 'react';
import axios from 'axios';
import { URL } from '../../../../config';
import styles from '../../articles.css';
import Header from './header';
import VideosRelated from '../../../widgets/VideosList/VideosRelated/videosRelated';
import { firebaseDB, 
firebaseTeams, firebaseLooper, firebaseVideos } from '../../../../firebase';

class VideoArticle extends Component {
  state = {
    article: [],
    team: [],
    teams: [],
    related: []
  };

  componentWillMount() {
    firebaseDB.ref(`videos/${this.props.match.params.id}`)
    .once('value')
    .then(snapshot=>{
      let article = snapshot.val();
      firebaseTeams.orderByChild('teamId')
      .equalTo(article.team)
      .once('value')
      .then(snapshot=>{
        const team = firebaseLooper(snapshot);
        this.setState({
          article,
          team
        })
      })
    })
    // axios
    //   .get(
    //     `
		// ${URL}/videos?id=${this.props.match.params.id}
		// `
    //   )
    //   .then(response => {
    //     let article = response.data[0];

    //     axios.get(`${URL}/teams?id=${article.team}`).then(response => {
    //       this.setState({
    //         article,
    //         team: response.data
    //       });
    //       this.getRelated();
    //     });
    //   });
  }

  getRelated = () => {

    firebaseTeams.once('value')
    .then(snapshot=>{
      const teams = firebaseLooper(snapshot);
      firebaseVideos
      .orderByChild('team')
      .equalTo(this.state.article.team)
      .limitToFirst(3).once('value')
      .then(snapshot=>{
        const related = firebaseLooper(snapshot);
        this.setState({
          teams,
          related
        })
      })

    })

    // axios.get(`${URL}/teams`).then(response => {
    //   let teams = response.data;
    //   axios
    //     .get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
    //     .then(res => {
    //       this.setState({
    //         teams,
    //         related: res.data
    //       });
    //     });
    // });
  };

  render() {
    const { article, team } = this.state;

    return (
      <div>
        <Header teamData={team[0]} />
        <div className={styles.videoWrapper}>
          <h1>{article.title}</h1>
          <iframe
            title="videoplayer"
            width="100%"
            height="300px"
            src={`https://www.youtube.com/embed/${article.url}`}
          />
        </div>
        <VideosRelated data={this.state.related} teams={this.state.teams} />
      </div>
    );
  }
}

export default VideoArticle;
