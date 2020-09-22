import React from 'react';
import '/Users/Ben/sei/projects/practice/react/practice/src/css/ImageList.css';
import ImageCard from './ImageCard.js';
import axios from 'axios';

class ImageList extends React.Component {

  state = { images: [] }

  fetchSearchResults = async() => {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query: this.props.match.params.query },
      headers: {
        Authorization: 'Client-ID 8a5UR7gdFTOgRV9Mg9Z5L4TJrYeIMNaqocGx5aj83KE'
      }
    })
    console.log(response);
    this.setState({ images: response.data.results })
  }

  componentDidMount () {
    this.fetchSearchResults();
  } // componentDidMount

  componentDidUpdate ( prevProps, prevState ) {
    if (prevProps.match.params.query !== this.props.match.params.query) {
      // Only get the new search results if componentDidUpdate is being run because the query prop has changed. (Not because state has updated)
      this.fetchSearchResults();
    }
  } // componentDidUpdate

  render () {
    const imgs = this.state.images.map(img => {
      return <ImageCard image={img} />
    })

    return (
      <div className="image__list">{imgs}</div>
    )
  }


} // class ImageList

export default ImageList
