import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ImageCard extends Component {
  constructor(props){
    super(props);
    this.state = { spans: 0 }
    this.imageRef = React.createRef();
  }



  componentDidMount() {
    console.log(this.props.image.id);
    // console.log(this.imageRef.current.clientHeight);
    this.imageRef.current.addEventListener('load', this.setSpans);
  }

  setSpans = () => {
    // console.log(this.imageRef.current.clientHeight);
    const height = this.imageRef.current.clientHeight;
    const spanRows = Math.ceil(height / 10);
    this.setState({ spans: spanRows })
  }

  render() {
    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}`}}>
        <img ref={this.imageRef} key={this.props.image.id}
            src={this.props.image.urls.regular}
            alt={this.props.image.alt_description}
        />
      
      <Link to={`/ShowImage/${this.props.image.id}`}>
         <button>More info</button>
       </Link>
      </div>
    )
  }
}

export default ImageCard
