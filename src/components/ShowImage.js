import React from 'react';
import ImageList from './ImageList';
import axios from 'axios';
import '/Users/Ben/sei/projects/practice/react/practice/src/css/ShowImage.css'
// import UNSPLASH_BASE_URL = 'https://api.unsplash.com/photos';
// import UNSPLASH_TOKENS = '/?client_id=8a5UR7gdFTOgRV9Mg9Z5L4TJrYeIMNaqocGx5aj83KE';

class ShowImage extends React.Component {

 state = {
   image: {},
   count: 0,
   showSaveImageButton: true

 };

fetchImageInfo(){
  console.log('fetchImageInfo');
  axios.get(`https://api.unsplash.com/photos/${this.props.match.params.image}?client_id=8a5UR7gdFTOgRV9Mg9Z5L4TJrYeIMNaqocGx5aj83KE`)
  .then( res => {
    console.log( 'image data:', res.data );
    this.setState({ image: res.data });
    this.isImageSaved();
  })
} // fetchImageInfo

handleSave = (ev) => {
  console.log('Clicked!');
  axios.post(`http://localhost:3000/images`, {
    description: this.state.image.description,
    alt_description: this.state.image.alt_description,
    unsplash_id: this.state.image.id,
    latitude: this.state.image.location.position.latitude,
    longitude: this.state.image.location.position.longitude,
    location_name: this.state.image.location.name,
    url: this.state.image.urls.thumb

  })
  .then(res => {
    console.log(res.data);
    this.setState({showSaveImageButton: false})
  })
  .catch(err => {
    console.warn(err)
  })
  ev.preventDefault();
 }


isImageSaved(){
  const images = this.props.currentUser.images
  console.log(images);
  for (var i = 0; i < images.length; i++) {
    if (images[i].unsplash_id === this.state.image.id) {
      this.setState({showSaveImageButton: false})
    }
  }
}


incrementLike = () => {
    let newCount = this.state.count + 1
    this.setState({
      count: newCount
    })
  }

componentDidMount (){
  console.log(this.props);
  this.fetchImageInfo();
}


render() {
  console.log(this.props.match.params.image);
  // Loop through the list of imgs and for each img check if the img unsplash_id = this.props.match.params.image
  // If matches then save a variable true which will determine what appears in the 'save image' button
  // If already in the list = already saved/disabled, otherwise user hasnt saved img yet and should appear
  return (
    <div className="displayImage">
      <h2>Image of: { this.state.image.description }</h2>
      <img src={this.state.image?.urls?.small} />
      <p>Alternative description: { this.state.image.alt_description }</p>
      <p>Location: { this.state.image.location?.name }</p>
      <p>Link: { this.state.image.links?.html }</p>
      <button onClick={this.incrementLike}> Likes: {this.state.count}</button>
      {
        this.state.showSaveImageButton &&
          <button onClick={this.handleSave}>Save Image</button>
      }
    </div>
  )
}

} // class ShowImage

export default ShowImage;
