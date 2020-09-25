import React, { Component } from 'react'
import '/Users/Ben/sei/projects/practice/react/practice/src/css/SearchBar.css'

class SearchBar extends React.Component {
  state = { query: ''}

  onInputChange = (event) => {
    this.setState({ query: event.target.value })
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.history.push(`/search/${this.state.query}`);
    // this.props.userSubmit(this.state.val);
  }


  render () {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="flexContainer">
          <label htmlFor="search"><h2 className="imgSearch">Image Search: </h2></label>
          <div className="search-box">
            <input
              className="search-txt"
              placeholder="Type to search..."
              type="text"
              onChange={this.onInputChange}
            />
          </div>
        </form>
      </div>
    )

  }
}

export default SearchBar;
