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
      <div className="imgResult" style={{ gridRowEnd: `span ${this.state.spans}`}}>
        <Link to={`/ShowImage/${this.props.image.id}`}><img ref={this.imageRef} key={this.props.image.id}
            src={`${this.props.image.urls.thumb}&h=200&fit=crop`}
            alt={this.props.image.alt_description}
        />
      </Link>

    
      </div>
    )
  }
}

export default ImageCard
