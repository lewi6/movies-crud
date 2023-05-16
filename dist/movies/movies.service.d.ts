import { Movie, Review, ReviewInput } from './movies.model';
export declare class MoviesService {
    private movies;
    private searchHistory;
    getAllMoviesByTitle(title: string): Promise<any>;
    getHistory(): {
        title: string;
        date: Date;
    }[];
    addMovie(movieId: string): Promise<any>;
    getMovieById(id: string): Movie;
    getMovies(): Movie[];
    deleteMovie(id: string): Movie;
    addReview(movieId: string, review: ReviewInput): Movie;
    updateReview(movieId: string, reviewId: string, updatedReview: Review): Movie;
    deleteReview(movieId: string, reviewId: string): Movie;
    rankMoviesByAverageScore(order: 'asc' | 'desc'): Movie[];
    private calculateAverageScore;
}
