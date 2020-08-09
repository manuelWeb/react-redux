import React, { Component } from 'react'

class SearchBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      searchText: "",
      placeHolder: "Titre du film…",
      intervalBeforeRequest: 1000,
      lockRequest: false,
    }

  }
  render() {
    return (
      <div className="row">
        <div className="col-md-8 input-group">
          <input className="form-control input-lg" type="text" onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder} />
          <span className="input-group-btn">
            <button className="btn btn-secondary" onClick={this.handleClick.bind(this)}>Search</button>
          </span>
        </div>
      </div>
    )
  }

  handleChange(event) {
    if (!this.state.lockRequest) {
      this.setState({ lockRequest: true })
      setTimeout(() => {
        this.search()
      }, this.state.intervalBeforeRequest);
    }
    this.setState({ searchText: event.target.value })
  }
  handleClick() {
    this.search()
  }
  search() {
    // recup input value state
    this.props.callback(this.state.searchText)
    // réouverture du verrou search request
    this.setState({ lockRequest: false })
  }
}

export default SearchBar