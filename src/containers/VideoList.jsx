import React from 'react'
import VideoListItem from '../components/VideoListItem'

const VideoList = ({ movieList }) => {
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
    console.log(movie);
  }

}
export default VideoList