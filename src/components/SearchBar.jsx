import React, { Component } from 'react'

class SearchBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      searchText: "",
      placeHolder: "Titre du film…"
    }

  }
  render() {
    return (
      <>
        <input type="text" onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder} />
      </>
    )
  }
  handleChange(event) {
    this.setState({ searchText: event.target.value })
  }
}

export default SearchBar