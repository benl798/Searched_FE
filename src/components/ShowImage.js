import React from 'react';
import ImageList from './ImageList';
import axios from 'axios';
// import UNSPLASH_BASE_URL = 'https://api.unsplash.com/photos';
// import UNSPLASH_TOKENS = '/?client_id=8a5UR7gdFTOgRV9Mg9Z5L4TJrYeIMNaqocGx5aj83KE';

class ShowImage extends React.Component {

 state = {
   image: {}
 };

fetchImageInfo(){
  console.log('fetchImageInfo');

  // const infoUrl= `${ UNSPLASH_BASE_URL }/${ this.props.match.params.user }${ UNSPLASH_TOKENS }`;
  axios.get(`https://api.unsplash.com/photos/${this.props.match.params.image}?client_id=8a5UR7gdFTOgRV9Mg9Z5L4TJrYeIMNaqocGx5aj83KE`)
  .then( res => {
    console.log( 'image data:', res.data );
    this.setState({ image: res.data });
  })

} // fetchImageInfo

componentDidMount (){
  console.log(this.props);
  this.fetchImageInfo();
}


render() {
  return (
    <div>
      Show Page
      <h2>image of { this.state.image.alt_description }</h2>
      <img src={this.state.image?.urls?.small} />
    </div>
  )
}

} // class ShowImage

export default ShowImage;
