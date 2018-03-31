import React, { Component } from 'react';
import './MovieGrid.css';
/* import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'; */
import MovieStore from '../store/MovieStore.js';
import * as movieAction from './MovieActions.js';
import {Link} from 'react-router-dom';


class MovieGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {movies: []};
        this.fetchMoviesType = this.fetchMoviesType.bind(this);
        this.getMovieList = this.getMovieList.bind(this);
        const url = window.location.href.split('/');
        const type = url[url.indexOf('popular')] || url[url.indexOf('newest')] || null;
        if(type !== null) {
            console.log("movie type: "+ type);
            this.fetchMoviesType(type);
        }
    }

    render() {
        const movies = this.state.movies;
        console.log(' --- In MovieGrid: --- ');
        console.log('--- Movies length: '+ movies.length);
        if(movies.length === 0) {
            return (<div className="text-center">No Movie Data Available</div>);
        }
        else {
            const row = [];
            const col = [];
            let count = 0;
            while(count < movies.length) {
                for(let j = 0; j <= 3, count < movies.length; j++) {
                    col[j] = <div className="col-3">
                               <Link to={'./summary/'+ movies[j].id}  exact="true" className="link-color"> 
                                <div className="css_card" key={movies[j].id}>
                                    <div className="movie-poster">    
                                        <img className="css_card_img" src={'https://image.tmdb.org/t/p/w154'+movies[j].poster_path} 
                                        alt={movies[j].title}/>
                                    </div>
                                    <div className="css_card_container">
                                        <div className="movie-title">
                                            <p className="text-center">{movies[j].title}</p>
                                        </div>
                                     </div>
                                    </div>
                                </Link>
                            </div>
                            
                            count += 1;
                }
                row.push(<div className="row">{col}</div>);
            }
            return (
                <div className="container">{row}</div>
            );
        }
    }

    componentWillMount() {
        MovieStore.on("fetch", this.getMovieList);
    }

    componentWillUnmount() {
        MovieStore.removeListener("fetch", this.getMovieList);
    }

    fetchMoviesType(type) {
        if((Date.now() - parseInt(localStorage.timestamp, 10)) < 86400000 &&
            localStorage.movies) {
                
                const moviesArr = JSON.parse(localStorage.movies);
                this.setState({
                    movies: moviesArr
                });
        }
        movieAction.fetchMovies(type);
    }

    getMovieList() {
        
        const moviesArr = MovieStore.getMovies();
        this.setState({
            movies: moviesArr
        });
        
        console.log('--- MovieGrid getMovieList --- ' + this.state.movies.length);
    }
}

export default MovieGrid;