import React from 'react'

export default function AddRider() {
    return (
        <div>
            <form className="add-rider-form" method="POST" action={"/riders/add-rider"}>
                <label htmlFor="name">Name: </label>
                <input id="name" name="name" type="text" autoComplete="off"/>
                <label htmlFor="igUrl">Instagram @: </label>
                <input id="igUrl" name="igUrl" type="text" autoComplete="off"/>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}
