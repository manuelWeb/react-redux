import React, { Component } from 'react'
import axios from 'axios'
import '../style/style.scss'

import SearchBar from '../components/SearchBar'
import VideoList from './VideoList'
import VideoDetail from '../components/VideoDetail'
import Video from '../components/Video'

const API_END_POINT = 'https://api.themoviedb.org/3/'
const POPULAR_MOVIE_URL = 'discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images'
const API_KEY = 'f526d226365b08ce1f6e296bff5c37db'

class App extends Component {
  constructor(props) {
    super(props)
    this.onClickListItem = this.onClickListItem.bind(this)
    this.state = {
      movieList: [],
      currentMovie: {}
    }
    this.initMovies()
  }
  // willMount is deprecated @see constructor to init request
  // componentWillMount() {
  //   this.initMovies()
  // }
  initMovies() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIE_URL}&api_key=${API_KEY}`)
      .then(
        function (response) {
          this.setState({
            movieList: response.data.results.slice(1, 11),
            currentMovie: response.data.results[0]
          }, function () {
            // function CB de setState
            this.applyVideoToCurrentMovie();
          }
          )
        }.bind(this)
      )
  }
  onClickListItem(movie) {
    // reciveCbPropsFromVideoList
    // movie est reçu de façon caché dans VideoList callbc={this.re..List}
    // console.log(movie);
    // pour bien bien maj le state on utilse la fn cb de setState
    this.setState({ currentMovie: movie }, function () {
      this.applyVideoToCurrentMovie()
      this.setRecommendation()
    })
  }
  onClickSearchMovie(searchValue) {
    // console.log(searchValue);
    const SEARCH_URL = 'search/movie?language=fr&include_adult=false'
    if (searchValue) {
      axios
        .get(`${API_END_POINT}${SEARCH_URL}&api_key=${API_KEY}&query=${searchValue}`)
        .then((resp) => {
          if (resp.data && resp.data.results[0]) {
            // console.log(resp.data.results.map(i => i.original_title));
            // verifier que search film n'est pas le currentmovie grace à son id
            if (resp.data.results[0].id !== this.state.currentMovie.id) {
              this.setState({ currentMovie: resp.data.results[0] }, () => {
                this.applyVideoToCurrentMovie()
                this.setRecommendation()
              })
            }
          }
        })
    }

  }
  applyVideoToCurrentMovie() {
    axios
      // .get(`${API_END_POINT}movie/${this.state.currentMovie.id}?api_key=${API_KEY}&append_to_response=videos&${DEFAULT_PARAM}`)
      .get(`${API_END_POINT}movie/${this.state.currentMovie.id}?api_key=${API_KEY}&append_to_response=videos&include_adult=false`)
      .then(
        // pas de bin(this) grace à arrow fn
        (resp) => {
          console.log(
            resp.data && resp.data
            // resp.data.videos.results && resp.data.videos.results);
            // resp.data.videos.results[0]
            // && resp.data.videos.results[0].key
          )

          if (resp.data.videos.results[0] && resp.data.videos.results[0].key) {
            const youtubeKey = resp.data.videos.results[0].key
            let newCurrentMovieState = this.state.currentMovie
            newCurrentMovieState.idVideo = youtubeKey
            this.setState({ currentMovie: newCurrentMovieState })
          }
        }//.bind(this)
      )
  }
  setRecommendation() {
    // use in search fn => update movies list
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?api_key=${API_KEY}&language=fr`)
      .then(
        function (response) {
          if (response.data && response.data.results.length > 10) {
            this.setState({ movieList: response.data.results.slice(0, 10) })
          }
        }.bind(this)
      )
  }

  render() {
    const renderVideoList = () => {
      if (this.state.movieList.length >= 10) {
        // + hype bind reciveCbPopsFromVideoList in constructor
        return <VideoList movieList={this.state.movieList} callback={this.onClickListItem} />
      }
    }
    return (
      <React.Fragment>
        <div className="search_bar">
          <SearchBar callback={this.onClickSearchMovie.bind(this)} />
        </div>
        <div className="row">
          <div className="col-md-8 video">
            <Video videoId={this.state.currentMovie.idVideo} />
            <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview} />
          </div>
          <div className="col-md-4 list">
            {renderVideoList()}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default App