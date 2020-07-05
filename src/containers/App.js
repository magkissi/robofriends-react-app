import React, { Component } from "react";
import { connect } from "react-redux";
import Cardlist from "../components/Cardlist";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "../containers/App.css";
import { setSearchField } from "../actions";

import ErrorBoundry from "../components/ErrorBoundry";

//state allows the child component to communicate with the parent component //
//super calls the constructor//

const mapStateToProps = (state) => {
  return {
    searchField: state.searchField,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
  };
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
    };
  }
  //the onSearchChange functions says; anytime the SearchBox component changes an should trigger an event, and the event will console log//

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        this.setState({ robots: users });
      });
  }

  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filteredRobots = robots.filter((robots) => {
      return robots.name.toLowerCase().includes(searchField.toLowerCase());
    });

    if (robots.length === 0) {
      return <h1>Loading</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <Cardlist robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
