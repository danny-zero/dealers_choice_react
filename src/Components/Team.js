import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Profile from './Profile'; 
import RiderName from './RiderName';

export default function Team(props) {
    // console.log("Team props", props)
    const { team, selectedRider, selectRider } = props
    return (
        <Router>
            <div className="the-team">
                <ul>
                {
                    team.map((rider) => {
                        return (
                            <RiderName key={rider.id} name={rider.name} id={rider.id} selectedRider={selectedRider} selectRider={selectRider}/>
                        )
                    })
                    
                }
                </ul>
                {
                    selectedRider.id ? (
                        <Route path="/pro/:id">
                    <Profile selectedRider={selectedRider}/>
                </Route>
                    ) : (
                        ''
                    )
                }
                
            </div>
        </Router>
    )
}
