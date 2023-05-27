import React from 'react'
import "./Comment.css"

function Comment({user, comment, date}) {
  return (
    <div className='one__comment'>
        <p style={{color: "rgba(255, 255, 255, 0.548)"}}>#user{user}</p>
        <p>{comment}</p>
        <p className='date'>{date}</p>
    </div>
  )
}

export default Comment