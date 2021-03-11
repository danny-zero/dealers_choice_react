import React from 'react'

export default function Video() {
    return (
        <div className="video-container">
            <h1>Magic Board from</h1>
            <img src='./assets/images/yeahright.png' />
            <iframe className="magicBoard" width="800" height="452" src="https://www.youtube.com/embed/8zsBNCABRzU" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    )
}
