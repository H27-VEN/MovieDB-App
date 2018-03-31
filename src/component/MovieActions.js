import dispatcher from "../dispatcher.js";

export function fetchMovies(type) {
    console.log('--- MovieAction.js: In fetchMovies ---');
    switch(type) {  
        
        case 'popular':
            dispatcher.dispatch({
                type: "FETCH_POPULAR_MOVIE"
            });
        break;

        case 'newest':
            dispatcher.dispatch({
                type: "FETCH_NEWEST_MOVIE"
            });
        break;

        default:

        break;
    }
};