import React, { Component } from 'react'
// import { HashRouter as Router, Route } from 'react-router-dom';

export default function EditSkaterForm(props) {
    const { brands, selectedRider } = props;
    return (
        <div className="edit-skater">
          <ul>
              {
                  brands.map((brand) => {
                      return (
                          <li 
                          className="sponsor" 
                          key={brand.id}
                          >{brand.name}
                          {brand.deletable === true ? <form method="POST" action={`/riders/${selectedRider.id}/delete-sponsor/${brand.id}?_method=DELETE`}><div id='name' value={selectedRider.name}></div><button>X</button></form> : ``}
                          </li>
                          )
                      })
              }
          </ul>
        </div>
    )
}