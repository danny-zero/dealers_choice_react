import React from 'react'

export default function AddSponsors(props) {
    const { brands, selectedRider } = props
    console.log(props)
    console.log(brands.length)
    return (
        <form method='POST' action={`/riders/add-sponsor/${selectedRider.id}`}>
        <input type="text" name="sponsor" placeholder="enter sponsor name separated by commas" />
        {/* <input type="text" name="igUrl" placeholder="enter sponsor instagram @" /> */}
        <button className="sponsors-button">Add Sponsor(s)</button>
        </form>
    )
}
