import React, { Component } from 'react'
import axios from 'axios'

import SearchBar from '../components/SearchBar'
import VideoList from './VideoList'
import VideoDetail from '../components/VideoDetail'

const API_END_POINT = 'https://api.themoviedb.org/3/'
const POPULAR_MOVIE_URL = 'discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images'
const API_KEY = 'api_key=f526d226365b08ce1f6e296bff5c37db'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieList: {},
      currentMovie: {}
    }
  }

  componentWillMount() {
    this.initMovies()
  }

  initMovies() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIE_URL}&${API_KEY}`).then(
      function (response) {
        this.setState({
          movieList: response.data.results.slice(1, 6),
          currentMovie: response.data.results[0]
        })
      }.bind(this)
    )
  }

  render() {
    const renderVideoList = () => {
      if (this.state.movieList.length >= 5) {
        return <VideoList movieList={this.state.movieList} />
      }
    }
    return (
      <React.Fragment>
        <SearchBar />
        {renderVideoList()}
        <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview} />
      </React.Fragment>
    )
  }
}

export default App