import { Injectable, NotFoundException } from '@nestjs/common';

import { Movie, Review, ReviewInput } from './movies.model';
import { v4 as uuid } from 'uuid';

const moviesUrl = process.env.MOVIES_ENDPOINT;
const moviesApiKey = process.env.MOVIES_API_KEY;
@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  // stores the history of search
  private searchHistory: { title: string; date: Date }[] = [];

  async getAllMoviesByTitle(title: string) {
    try {
      const res = await fetch(
        `${moviesUrl}/?apikey=${moviesApiKey}&s=${title}`,
      );

      this.searchHistory.push({ title: title, date: new Date() });

      const results = await res.json();

      return results.Search;
    } catch (e) {
      console.log('error', e);
    }
  }

  getHistory() {
    return this.searchHistory;
  }

  async addMovie(movieId: string) {
    try {
      const res = await fetch(
        `${moviesUrl}/?apikey=${moviesApiKey}&i=${movieId}`,
      );
      const result = await res.json();
      if (result?.Response === 'False') throw new Error(result.Error);
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
    } catch (error) {
      return error;
    }
  }

  getMovieById(id: string): Movie {
    try {
      return this.movies.find((movie) => movie.Id === id);
    } catch {
      throw new NotFoundException('Movie not found');
    }
  }

  getMovies(): Movie[] {
    return this.movies;
  }

  deleteMovie(id: string): Movie {
    const movieIndex = this.movies.findIndex((movie) => movie.Id === id);
    if (movieIndex === -1) {
      return null;
    }
    const deletedMovie = this.movies.splice(movieIndex, 1)[0];
    return deletedMovie;
  }

  addReview(movieId: string, review: ReviewInput): Movie {
    const movie = this.getMovieById(movieId);
    if (movie) {
      movie.Reviews.push({ id: uuid(), ...review });
      movie.AverageScore = this.calculateAverageScore(movie.Reviews);
    }
    return movie;
  }

  updateReview(
    movieId: string,
    reviewId: string,
    updatedReview: Review,
  ): Movie {
    const movie = this.getMovieById(movieId);
    const reviewIndex = movie.Reviews.findIndex(
      (review) => review.id === reviewId,
    );
    if (reviewIndex === -1) {
      throw new NotFoundException('Review not found');
    }
    movie.Reviews[reviewIndex] = { ...updatedReview, id: reviewId };
    movie.AverageScore = this.calculateAverageScore(movie.Reviews);
    return movie;
  }

  deleteReview(movieId: string, reviewId: string): Movie {
    const movie = this.getMovieById(movieId);
    const reviewIndex = movie.Reviews.findIndex(
      (review) => review.id === reviewId,
    );
    if (reviewIndex === -1) {
      throw new NotFoundException('Review not found');
    }
    movie.Reviews.splice(reviewIndex, 1);
    movie.AverageScore = this.calculateAverageScore(movie.Reviews);
    return movie;
  }

  rankMoviesByAverageScore(order: 'asc' | 'desc'): Movie[] {
    const rankedMovies = [...this.movies]; // Create a copy of the movies array

    rankedMovies.sort((a, b) => {
      if (order === 'asc') {
        return a.AverageScore - b.AverageScore;
      } else {
        return b.AverageScore - a.AverageScore;
      }
    });

    return rankedMovies;
  }
  private calculateAverageScore(reviews: Review[]): number {
    if (reviews.length === 0) {
      return 0;
    }
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return sum / reviews.length;
  }
}
