import React from 'react'
import VideoListItem from '../components/VideoListItem'

const VideoList = ({ movieList }) => {
  return (
    <ul>
      {
        movieList.map(movie => <VideoListItem key={movie.id} movie={movie} />)
      }
    </ul>
  )

}
export default VideoList