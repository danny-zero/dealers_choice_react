import React from 'react'

export default function RiderName(props) {
    // console.log("rider", props)
    const { selectRider } = props
    return (
        <div>
            <li onClick={() => selectRider(props.id)}><a href={`/#/pro/${props.id}`}><h2>{props.name}</h2></a></li>
        </div>
    )
}
