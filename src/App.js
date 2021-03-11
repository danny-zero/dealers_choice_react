import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Splash from './Components/Splash';
import DeckSkater from './Components/DeckSkater';
import Video from './Components/Video';
import Team from './Components/Team';
import AddRider from './Components/AddRider';
import Footer from './Components/Footer';

class App extends Component {
    constructor() {
        super()
        this.state = {
            team: [],
            selectedRider: [{}]
        }

        this.selectRider = this.selectRider.bind(this)
    }

    async selectRider(id) {
        try {
            const selectedRider = (await axios.get(`/riders/${id}`)).data;
            this.setState({selectedRider})
        } catch (error) {
            console.error(error)
        }
    }

    async componentDidMount() {
        const team = (await axios.get('/team')).data;
        this.setState({team})
        // console.log(this.state.team)
    }
    render() {
        let { team, selectedRider } = this.state;
        selectedRider = selectedRider[0]
        // console.log("DID IT WORK", selectedRider[0])
        return (
            <Router>
                <div className="main-content">
                    <Splash />
                    <DeckSkater />
                    <Video />
                    <div className="team-header">
                        <img src="./assets/images/logo2.png" />
                        <h1>Meet the Team</h1>
                    </div>
                    <a id="add-rider" href="/#/add-rider">Add Rider</a>
                    <Route path="/add-rider">
                        <AddRider />
                    </Route>
                    <Team team={team} selectedRider={selectedRider} selectRider={this.selectRider}/>
                    <a id="back-to-top" href="/#splash"><i className="fa fa-arrow-up faa-bounce animated" aria-hidden="true"></i></a>
                    <Footer />
                </div>
            </Router>
        )
    }
}

export default App;