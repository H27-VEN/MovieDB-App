import { EventEmitter } from "events";
import dispatcher from "../dispatcher.js";
import axios from 'axios'

class MovieStore extends EventEmitter {

    constructor() {
        super();
        this.movieData = {lastFetchedData: '', movies: []};//this.movies = [];
    }

    fetchMovies(movie) {
        console.log('--- MovieStore.js in fetch movies ---');
        console.log("movie type: ");
        console.log(movie.type);
        /* if(Date.now() -  parseInt(localStorage.timestamp) < 86400000) {
            if(localStorage.lastfetched === movie.type) {
                if(localStorage.movies) {
                    return JSON.parse(localStorage.movies);
                }
            }
        } */

        switch(movie.type) {

            case "FETCH_POPULAR_MOVIE":
                console.log("--- In FETCH_POPULAR_MOVIE ---");
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ef5fb28487a63a7710d54f51bd283658&include_adult=false&include_video=false&page=1");
                const self = this;
                
                xhr.onload = function() {
                    console.log("--- In onload ---");
                    const movieResponse = JSON.parse(this.responseText);
                    //console.log(movieResponse);
                    self.movieData.lastFetchedData = movie.type;
                    self.movieData.movies = movieResponse.results;
                    
                    console.log("---- In self.movieData.movies: ---");
                    console.log(self.movieData.movies);
                    localStorage.lastfetched = movie.type;
                    localStorage.timestamp = Date.now();
                    localStorage.movies = JSON.stringify(self.movieData.movies);
                    console.log("---- self.movieData.movies.length ----" + self.movieData.length);
                    if(self.movieData.movies.length > 0) {
                        console.log("will emit fetch event");
                        self.emit("fetch");
                    }    
                };
                
                xhr.onerror = function() {
                    console.log("--- In onerror ---");
                    console.log(this.responseText);
                };
                
                xhr.send();
                /* axios.get("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ef5fb28487a63a7710d54f51bd283658")
                .then(function (response) {
                    console.log('FETCH_POPULAR_MOVIE');
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                }); */
            break; 

            case "FETCH_NEWEST_MOVIE":
                let today = new Date();
                const lte = today.getFullYear()+'-'+('0' + (today.getMonth() + 1)).slice(-2)+'-'+('0' + today.getDate()).slice(-2);
                const gte = today.getFullYear()+'-'+('0' + ((today.getMonth() + 1) - 1)).slice(-2)+'-'+'01';
                console.log('lte: '+lte);
                console.log('gte: '+gte);
                const req_url = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=" + gte + "&primary_release_date.lte=" + lte +"&api_key=ef5fb28487a63a7710d54f51bd283658";
                console.log(req_url); 
                const mself = this;
                axios.get("https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=" + gte + "&primary_release_date.lte=" + lte +"&api_key=ef5fb28487a63a7710d54f51bd283658")
                .then(function (response) {
                    //console.log(response);
                    mself.movieData.movies = response.data.results;
                    console.log(' ---- this.movieData.movies ----');
                    console.log(mself.movieData.movies);
                    mself.emit("fetch");

                })
                .catch(function(error) {
                    console.log(error);
                });  
            break;
            default:
            
            break;
        }
    }

    getMovies() {
      console.log("--- In MovieStore.js --- getMovies()");
      console.log('---- In this.movieData.movies.length: ' + this.movieData.movies.length);
       return this.movieData.movies;
    }

    movieDetails(id) {
        console.log('---- this.movieData.movies.length --- :'+ this.movieData.movies.length);
        if(this.movieData.movies.length <= 0) {
            return null;
        }
        else{
            for(var i = 0; i < this.movieData.movies.length; i++) {
                if(this.movieData.movies[i].id == id) {
                    console.log(this.movieData.movies[i].id);
                    return this.movieData.movies[i];
                }
            }
           return null;
        }
    
    }



}

const movieStore = new MovieStore();
dispatcher.register(movieStore.fetchMovies.bind(movieStore));
export default movieStore;