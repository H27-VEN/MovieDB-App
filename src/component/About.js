import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
        <div className="container">
            <div className="text-center">
                <p>The App is powered By TMDB API and relies on it for all the data</p>
                <img src="images/tmdb_logo.png" alt="tmdb logo" width="100px" height="100px" />
            </div>
        </div>
        );
    }
}

export default About;