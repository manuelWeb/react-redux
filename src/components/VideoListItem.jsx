import React from 'react'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/'

const VideoListItem = (props) => {
  const { movie } = props
  return (
    <li onClick={callback}>
      <div className="media media-heading">
        <div className="media-left">
          <img className="media-object img-rounded" width="100" src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt="" />
        </div>
        <div className="media-body media-middle">
          <h5 className="title_list_item">{movie.title}</h5>
        </div>
      </div>
    </li>
  )
  function callback() {
    // magic react event is passed by default
    // console.log(movie);
    props.callback(movie)
  }
}

export default VideoListItem