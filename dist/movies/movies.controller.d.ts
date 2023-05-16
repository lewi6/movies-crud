import { Movie, Review } from './movies.model';
import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    getMovies(): Movie[];
    searchMovies(title: string): Promise<any>;
    addMovie(id: string): Promise<any>;
    getMovieById(id: string): Movie;
    addReview(movieId: string, review: Review): Movie;
    updateReview(movieId: string, reviewId: string, updatedReview: Review): Movie;
    deleteReview(movieId: string, reviewId: string): Movie;
    deleteMovie(id: string): void;
    getSearchHistory(): {
        title: string;
        date: Date;
    }[];
    rankMovies(order: 'asc' | 'desc'): Movie[];
}
