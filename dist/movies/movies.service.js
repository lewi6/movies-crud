"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const moviesUrl = process.env.MOVIES_ENDPOINT;
const moviesApiKey = process.env.MOVIES_API_KEY;
let MoviesService = class MoviesService {
    constructor() {
        this.movies = [];
        this.searchHistory = [];
    }
    async getAllMoviesByTitle(title) {
        try {
            const res = await fetch(`${moviesUrl}/?apikey=${moviesApiKey}&s=${title}`);
            this.searchHistory.push({ title: title, date: new Date() });
            const results = await res.json();
            return results.Search;
        }
        catch (e) {
            console.log('error', e);
        }
    }
    getHistory() {
        return this.searchHistory;
    }
    async addMovie(movieId) {
        try {
            const res = await fetch(`${moviesUrl}/?apikey=${moviesApiKey}&i=${movieId}`);
            const result = await res.json();
            if ((result === null || result === void 0 ? void 0 : result.Response) === 'False')
                throw new Error(result.Error);
            const { Title, Poster, Type, Year } = result;
            this.movies.push({
                Id: result.imdbID,
                Title,
                Poster,
                Type,
                Year,
                Reviews: [],
                AverageScore: 0,
            });
            return 'movie added successfully';
        }
        catch (error) {
            return error;
        }
    }
    getMovieById(id) {
        try {
            return this.movies.find((movie) => movie.Id === id);
        }
        catch (_a) {
            throw new common_1.NotFoundException('Movie not found');
        }
    }
    getMovies() {
        return this.movies;
    }
    deleteMovie(id) {
        const movieIndex = this.movies.findIndex((movie) => movie.Id === id);
        if (movieIndex === -1) {
            return null;
        }
        const deletedMovie = this.movies.splice(movieIndex, 1)[0];
        return deletedMovie;
    }
    addReview(movieId, review) {
        const movie = this.getMovieById(movieId);
        if (movie) {
            movie.Reviews.push(Object.assign({ id: (0, uuid_1.v4)() }, review));
            movie.AverageScore = this.calculateAverageScore(movie.Reviews);
        }
        return movie;
    }
    updateReview(movieId, reviewId, updatedReview) {
        const movie = this.getMovieById(movieId);
        const reviewIndex = movie.Reviews.findIndex((review) => review.id === reviewId);
        if (reviewIndex === -1) {
            throw new common_1.NotFoundException('Review not found');
        }
        movie.Reviews[reviewIndex] = Object.assign(Object.assign({}, updatedReview), { id: reviewId });
        movie.AverageScore = this.calculateAverageScore(movie.Reviews);
        return movie;
    }
    deleteReview(movieId, reviewId) {
        const movie = this.getMovieById(movieId);
        const reviewIndex = movie.Reviews.findIndex((review) => review.id === reviewId);
        if (reviewIndex === -1) {
            throw new common_1.NotFoundException('Review not found');
        }
        movie.Reviews.splice(reviewIndex, 1);
        movie.AverageScore = this.calculateAverageScore(movie.Reviews);
        return movie;
    }
    rankMoviesByAverageScore(order) {
        const rankedMovies = [...this.movies];
        rankedMovies.sort((a, b) => {
            if (order === 'asc') {
                return a.AverageScore - b.AverageScore;
            }
            else {
                return b.AverageScore - a.AverageScore;
            }
        });
        return rankedMovies;
    }
    calculateAverageScore(reviews) {
        if (reviews.length === 0) {
            return 0;
        }
        const sum = reviews.reduce((total, review) => total + review.rating, 0);
        return sum / reviews.length;
    }
};
MoviesService = __decorate([
    (0, common_1.Injectable)()
], MoviesService);
exports.MoviesService = MoviesService;
//# sourceMappingURL=movies.service.js.map