import React, { Component } from 'react';
import { firebaseArticles, firebaseLooper } from '../../../firebase';
import SliderTemplates from './slider_template';


class NewsSlider extends Component {
  state = {
    news: []
  };

  componentWillMount() {

    firebaseArticles.limitToFirst(15)
    .once('value').then(snapshot => {
      const news = firebaseLooper(snapshot)
      this.setState({
        news
      })
    })

  //   axios
  //     .get(
  //       `
  //       ${URL}/articles?_start=${this.props.start}
	// 	&_end=${this.props.amount}
  //     `
  //     )
  //     .then((response) => {
  //       this.setState({
  //         news: response.data
  //       });
  //     });
  // }

  }

  render() {

    return (
      <SliderTemplates
        settings={this.props.settings}
        data={this.state.news}
        type={this.props.type}
      />
    );
  }
}

export default NewsSlider;
