import React, { Component } from 'react';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import '../containers/App.css';

import ErrorBoundry from '../components/ErrorBoundry';


//state allows the child component to communicate with the parent component //
//super calls the constructor//

class App extends Component {
    constructor() {
        super()  
        this.state = {
            robots: [],
            searchfield: ''
        }
    
}
//the onSearchChange functions says; anytime the SearchBox component changes an should trigger an event, and the event will console log//

componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(users=> {this.setState({ robots: users})});

}
onSearchChange = (event) => {
    this.setState({searchfield: event.target.value })
    
    
}

    render() {
        const filteredRobots = this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })

        if (this.state.robots.length === 0) {
            return <h1>Loading</h1>
        } else {
            return (
                
            <div className='tc'>
                    <h1 className="f1">RoboFriends</h1>
                 <SearchBox searchChange={this.onSearchChange}/>
                 <Scroll>
                    <Cardlist robots={filteredRobots} />
                </Scroll>
                
            </div>
                );
        }
    
}
}

export default App;