import React from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ImageList from './components/ImageList';
import ShowImage from './components/ShowImage';
import Login from './components/Login'
import MyImages from './components/MyImages'
import { Route, Link, HashRouter as Router } from 'react-router-dom';
import '/Users/Ben/sei/projects/practice/react/practice/src/css/App.css'

const BASE_URL = 'https://searched-project.herokuapp.com'


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
                  <ul className="nav__links">
                    <li id="welcome">Welcome {this.state.currentUser.name}</li>
                    <li><a href="#">Home</a></li>
                    <li><Link to='/my_images'>My Saved Images</Link></li>
                    <li><Link onClick={this.handleLogout} to='/'>Logout</Link></li>
                  </ul>
                )
                :
                (
                  <ul className="nav__links">
                    <li><Link to='/login'>Login</Link></li>
                  </ul>
                )
              }
          </nav>
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
