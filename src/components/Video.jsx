import React from 'react'
const BASE_URL = 'https://www.youtube.com/embed/'

const Video = ({ videoId }) => {
  return (
    <div>
      <iframe src={`${BASE_URL}${videoId}`} title="currentMovieKey" />
    </div>
  )

}

export default Video