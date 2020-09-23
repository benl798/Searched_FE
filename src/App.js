import React from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ImageList from './components/ImageList';
import ShowImage from './components/ShowImage';
import Login from './components/Login'
import MyImages from './components/MyImages'
import { Route, Link, HashRouter as Router } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000'


class App extends React.Component {

  state = {
    currentUser: {
      images: []
    }
  }


  componentDidMount(){
    this.setCurrentUser();
  }

  setCurrentUser = () => {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios.get(`${BASE_URL}/users/current`, {
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      this.setState({currentUser: res.data})
    })
    .catch(err => console.warn(err))
  }

  handleLogout = () => {
    this.setState({currentUser: undefined})
    localStorage.removeItem("jwt");
    axios.defaults.headers.common['Authorization'] = undefined;
  }

  render() {
    return (
      <Router>
        <header>
          <nav>
              {
                this.state.currentUser !== undefined
                ?
                (
                  <ul>
                    <li>Welcome {this.state.currentUser.name} | </li>
                    <li><Link to='/my_images'>My Saved Images</Link></li>
                    <li><Link onClick={this.handleLogout} to='/'>Logout</Link></li>
                  </ul>
                )
                :
                (
                  <Link to='/login'>Login</Link>
                )
              }
          </nav>
          <hr/>
        </header>
        <Route
          exact path='/login'
          render={(props) => <Login setCurrentUser={this.setCurrentUser}{...props}/>}
          />
        <Route path="/" render={(props) => <SearchBar userSubmit={this.onSearchSubmit} {...props} />} />
        <Route exact path="/search/:query" component={ ImageList } />
        <Route exact path="/ShowImage/:image"
          render={(props) => <ShowImage currentUser={this.state.currentUser} {...props}/>}  />
        <Route exact path='/my_images' component={MyImages}/>

      </Router>
    ); // return
  } // render

} // class App

export default App;
