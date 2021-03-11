import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import EditSkaterForm from './EditSkaterForm';
import AddSponsors from './AddSponsors';

export default function Profile(props) {
    console.log("Profile", props)
    const { id, name, img, instagramUrl, deletable, brands } = props.selectedRider;
    console.log("THE SPONSORS", brands)
    return (
        <Router>
            <div className="profile">
                <div className="left">
                    <img className="profile-pic animate__animated animate__flipInY" src={img} />
                </div>
                <div className="right">
                    <a href={instagramUrl} target="_blank"><h2>{name}</h2></a>
                    {
                        deletable === true ? (
                            <form method='POST' action={`/riders/delete-rider/${id}?_method=DELETE`}
                            ><button>Delete Skater</button>
                            </form>
                        ) : (
                            ''
                        )
                    }
                    <h2>Sponsors:</h2>
                    <a href={`/#/pro/${id}/add-sponsor`}>Add Sponsor(s)</a>
                    <Route path="/pro/:id/add-sponsor">
                        <AddSponsors selectedRider={props.selectedRider} brands={brands} />
                    </Route>
                    <ul>
                        {
                            brands.map(brand => <li key={brand.id}>{brand.instagramUrl !== null ? (<a href={brand.instagramUrl} target="_blank">{brand.name}</a>): (brand.name)}</li>)
                        }
                    </ul>
                    <a href={`/#/pro/${id}/edit-skater`}>Edit Sponsor(s)</a>
                    <Route path="/pro/:id/edit-skater">
                        <EditSkaterForm selectedRider={props.selectedRider} brands={brands}/>
                    </Route>
                </div>
            </div>
        </Router>
    )
}
