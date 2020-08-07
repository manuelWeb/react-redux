import React, { Component } from 'react'
import axios from 'axios'
import '../style/style.scss'

import SearchBar from '../components/SearchBar'
import VideoList from './VideoList'
import VideoDetail from '../components/VideoDetail'
import Video from '../components/Video'

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
    this.initMovies()
  }

  // componentWillMount() {
  //   this.initMovies()
  // }

  initMovies() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIE_URL}&${API_KEY}`)
      .then(
        function (response) {
          this.setState({
            movieList: response.data.results.slice(1, 6),
            currentMovie: response.data.results[0]
          }, function () {
            // function CB de setState
            this.applyVideoToCurrentMovie();
          }
          )
        }.bind(this)
      )
  }

  applyVideoToCurrentMovie() {
    axios
      .get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`)
      .then((resp) => {
        const youtubeKey = resp.data.videos.results[0].key
        let newCurrentMovieState = this.state.currentMovie
        newCurrentMovieState.idVideo = youtubeKey
        this.setState({ currentMovie: newCurrentMovieState })
      })
  }



  render() {
    const renderVideoList = () => {
      if (this.state.movieList.length >= 5) {
        return <VideoList movieList={this.state.movieList} />
      }
    }
    return (
      <React.Fragment>
        <div className="search_bar">
          <SearchBar />
        </div>
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.idVideo} />
            <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview} />
          </div>
          <div className="col-md-4">
            {renderVideoList()}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default App