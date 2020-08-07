import React from 'react'
import VideoListItem from '../components/VideoListItem'

const VideoList = (props) => {
  const { movieList } = props
  return (
    <ul>
      {
        movieList.map(
          movie => <VideoListItem key={movie.id} movie={movie} callback={reciveCbFromVideoListItem} />
        )
      }
    </ul>
  )
  function reciveCbFromVideoListItem(movie) {
    // recup valeur du cb de VideoListItem
    // console.log(movie);

    // passer la props du cb à app
    props.callback(movie)
  }

}
export default VideoList