import React, { Component } from 'react';



class Summary extends Component {

    constructor(props) {
        super();
        const url = window.location.href.split('/');
        const id = url[url.length - 1].trim();
        console.log('In summary id: '+id);
        this.getMovieDetails = this.getMovieDetails.bind(this);
        this.movieDetails = this.getMovieDetails(id);
       console.log(this.movieDetails);
    }

    render() {

        const movie = this.movieDetails;
        console.log(movie);
        if(movie === null) {
            return(<div className="text-center">No Data Available for the movie</div>);
        }
        else {
        return(
              <div className="container">
                <div className="row">
                    <div className="cols-3">
                        <div className="poster_image">
                            <img src={'https://image.tmdb.org/t/p/w154'+movie.poster_path} alt={movie.title} />
                        </div>
                    </div>
                        <div className="cols-6">
                            <div className="movie-title">
                                <h2>{movie.title}</h2>
                            </div>

                            <div className="movie-summary">
                                <p>{movie.overview}</p>
                            </div>

                            <div className="movie-release-date">
                                <h3>Release Date</h3>
                                <p>{movie.release_date}</p>
                            </div>
                        </div>
                    </div>
                  </div>
        
                );
            }
    }

    getMovieDetails(id) {
        const movies = JSON.parse(localStorage.movies);
        console.log(movies);
        for(let i = 0; i < movies.length; i++) {
            if(movies[i].id == id) {
                return movies[i];
            }
        }
        return null;
        //return MovieStore.movieDetails(id);
    }
}

export default Summary;