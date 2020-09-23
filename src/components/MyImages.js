import React from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

class MyImages extends React.Component{
  state = {
    images: []
  }

  componentDidMount(){
    // let token = "Bearer " + localStorage.getItem("jwt");
    axios.get(`${BASE_URL}/my_saved_images`
      // {
      // headers: {
      //   'Authorization': token
      // }
    //}
  )
    .then(res => {
      console.log('data', res.data);
      this.setState({images: res.data})
    })
    .catch(err => console.warn(err))
  }

  render(){
    return(
      <div>
        {
          this.state.images.map(image => {
            return(
              <div>
                <p>Image of {image.description}</p>
                <p>{image.location_name}</p>
                <p>{image.alt_description}</p>
                <p>{image.latitude}</p>
                <p>{image.longitude}</p>
                <img src={image.url}/>
              </div>
            )
          })
        }
      </div>
    );
  }//render

}//class MyImages


export default MyImages
