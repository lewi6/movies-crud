import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { Review } from './movies.model';

describe('MoviesService', () => {
  let service: MoviesService;
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  describe('getMovies', () => {
    it('should return an array of movies', () => {
      const movies = [
        {
          Id: '1',
          Title: 'Movie 1',
          Year: '2004',
          Type: 'serrie',
          Poster: 'abc.png',
          Reviews: [],
          AverageScore: 12,
        },
        {
          Id: '2',
          Title: 'Movie 2',
          Year: '2004',
          Type: 'serrie',
          Poster: 'abc.png',
          Reviews: [],
          AverageScore: 12,
        },
      ];
      jest.spyOn(service, 'getMovies').mockReturnValueOnce(movies);

      const result = controller.getMovies();

      expect(result).toEqual(movies);
    });
  });

  describe('getAllMoviesByTitle', () => {
    it('should return an array of movies when a valid title is provided', async () => {
      const title = 'Avengers';
      const movies = [
        { Id: '1', Title: 'Avengers: Endgame' },
        { Id: '2', Title: 'Avengers: Infinity War' },
      ];
      jest.spyOn(service, 'getAllMoviesByTitle').mockResolvedValueOnce(movies);

      const result = await controller.searchMovies(title);
      expect(result).toEqual(movies);
    });

    it('should add the search history', async () => {
      const title = 'Movie 1';
      const movies = [{ id: '1', title: 'Movie 1' }];
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ Search: movies }),
      } as unknown as Response);

      await service.getAllMoviesByTitle(title);

      expect(service.getHistory()).toContainEqual(
        expect.objectContaining({ title, date: expect.any(Date) }),
      );
    });

    it('should handle errors', async () => {
      const title = 'Movie 1';
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('API Error'));

      const result = await service.getAllMoviesByTitle(title);

      expect(result).toBe('error Error: API Error');
    });
  });

  describe('addMovie', () => {
    it('should add a movie to the list', async () => {
      const movieId = 'tt1837492';
      const movie = {
        Id: 'tt1837492',
        Title: '13 Reasons Why',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BYmRhZjkyMjEtNjRkMS00MDQ0LTg2NGMtMTQ3ZjE0NjJmMjM2L2ltYWdlXkEyXkFqcGdeQXVyNTY0MTkxMTg@._V1_SX300.jpg',
        Type: 'series',
        Year: '2017–2020',
        Reviews: [],
        AverageScore: 0,
      };
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(movie),
      } as unknown as Response);

      const result = await service.addMovie(movieId);

      expect(result).toBe('movie added successfully');
      expect(service.getMovies()).toContainEqual(
        expect.objectContaining(movie),
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`i=${movieId}`),
      );
    });

    it('should handle API errors', async () => {
      const movieId = '1';
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({
          Response: 'False',
          Error: 'Movie not found',
        }),
      } as unknown as Response);

      const result = await service.addMovie(movieId);

      expect(result).toBeInstanceOf(Error);
      expect(service.getMovies()).toHaveLength(0);
    });

    it('should handle general errors', async () => {
      const movieId = '1';
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('API Error'));

      const result = await service.addMovie(movieId);

      expect(result).toBeInstanceOf(Error);
      expect(service.getMovies()).toHaveLength(0);
    });
  });

  describe('getMovieById', () => {
    it('should return the movie with the given ID', () => {
      const movieId = 'tt1837492';
      const movie = {
        Id: 'tt1837492',
        Title: '13 Reasons Why',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BYmRhZjkyMjEtNjRkMS00MDQ0LTg2NGMtMTQ3ZjE0NjJmMjM2L2ltYWdlXkEyXkFqcGdeQXVyNTY0MTkxMTg@._V1_SX300.jpg',
        Type: 'series',
        Year: '2017–2020',
        Reviews: [],
        AverageScore: 0,
      };
      service['movies'] = [movie];

      const result = service.getMovieById(movieId);

      expect(result).toBe(movie);
    });

    it('should throw NotFoundException if the movie is not found', () => {
      const movieId = '1';
      service['movies'] = [];

      expect(() => {
        service.getMovieById(movieId);
      }).toThrowError(NotFoundException);
    });
  });

  describe('getSearchHistory', () => {
    it('should return the search history', () => {
      const searchHistory = [
        { title: 'Avengers', date: new Date() },
        { title: 'Batman', date: new Date() },
      ];
      jest.spyOn(service, 'getHistory').mockReturnValueOnce(searchHistory);

      const result = controller.getSearchHistory();

      expect(result).toEqual(searchHistory);
    });
  });

  describe('rankMovies', () => {
    const rankedMovies = [
      {
        Id: '1',
        Title: 'Movie 1',
        AverageScore: 4,
        Poster:
          'https://m.media-amazon.com/images/M/MV5BYmRhZjkyMjEtNjRkMS00MDQ0LTg2NGMtMTQ3ZjE0NjJmMjM2L2ltYWdlXkEyXkFqcGdeQXVyNTY0MTkxMTg@._V1_SX300.jpg',
        Type: 'series',
        Year: '2017–2020',
        Reviews: [],
      },
      {
        Id: '2',
        Title: 'Movie 2',
        AverageScore: 3,
        Poster:
          'https://m.media-amazon.com/images/M/MV5BYmRhZjkyMjEtNjRkMS00MDQ0LTg2NGMtMTQ3ZjE0NjJmMjM2L2ltYWdlXkEyXkFqcGdeQXVyNTY0MTkxMTg@._V1_SX300.jpg',
        Type: 'series',
        Year: '2017–2020',
        Reviews: [],
      },
      {
        Id: '3',
        Title: 'Movie 3',
        AverageScore: 2,
        Poster:
          'https://m.media-amazon.com/images/M/MV5BYmRhZjkyMjEtNjRkMS00MDQ0LTg2NGMtMTQ3ZjE0NjJmMjM2L2ltYWdlXkEyXkFqcGdeQXVyNTY0MTkxMTg@._V1_SX300.jpg',
        Type: 'series',
        Year: '2017–2020',
        Reviews: [],
      },
    ];
    it('should return movies ranked by average score in ascending order', () => {
      const order = 'asc';

      jest
        .spyOn(service, 'rankMoviesByAverageScore')
        .mockReturnValueOnce(rankedMovies);

      const result = controller.rankMovies(order);

      expect(result).toEqual(rankedMovies);
    });

    it('should return movies ranked by average score in descending order', () => {
      const order = 'desc';

      jest
        .spyOn(service, 'rankMoviesByAverageScore')
        .mockReturnValueOnce(rankedMovies);

      const result = controller.rankMovies(order);
      expect(result).toEqual(rankedMovies);
    });
  });

  describe('addReview', () => {
    it('should add a review to a movie', () => {
      const movieId = '1';
      const review: Review = {
        id: 'review-1',
        rating: 4.5,
        comment: 'Great movie!',
      };
      const movieWithReview = {
        Id: '1',
        Title: 'Movie 1',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BYmRhZjkyMjEtNjRkMS00MDQ0LTg2NGMtMTQ3ZjE0NjJmMjM2L2ltYWdlXkEyXkFqcGdeQXVyNTY0MTkxMTg@._V1_SX300.jpg',
        Type: 'series',
        Year: '2012',
        AverageScore: 0,
        Reviews: [review],
      };
      jest.spyOn(service, 'addReview').mockReturnValueOnce(movieWithReview);

      const result = controller.addReview(movieId, review);

      expect(result).toEqual(movieWithReview);
      expect(service.addReview).toHaveBeenCalledWith(movieId, review);
    });

    it('should return null if the movie is not found', () => {
      const movieId = '1';
      const review: Review = {
        id: 'review-1',
        rating: 4.5,

        comment: 'Great movie!',
      };
      jest.spyOn(service, 'addReview').mockReturnValueOnce(null);

      const result = controller.addReview(movieId, review);

      expect(result).toBeNull();
      expect(service.addReview).toHaveBeenCalledWith(movieId, review);
    });
  });

  describe('updateReview', () => {
    it('should update a movie review', () => {
      const movieId = '1';
      const reviewId = 'review-1';
      const updatedReview: Review = {
        id: 'review-1',
        rating: 4.5,
        comment: 'Updated review',
      };
      const movieWithUpdatedReview = {
        Id: '1',
        Title: 'Movie 1',
        Reviews: [updatedReview],
        Poster:
          'https://m.media-amazon.com/images/M/MV5BYmRhZjkyMjEtNjRkMS00MDQ0LTg2NGMtMTQ3ZjE0NjJmMjM2L2ltYWdlXkEyXkFqcGdeQXVyNTY0MTkxMTg@._V1_SX300.jpg',
        Type: 'series',
        Year: '2012',
        AverageScore: 0,
      };
      jest
        .spyOn(service, 'updateReview')
        .mockReturnValueOnce(movieWithUpdatedReview);

      const result = controller.updateReview(movieId, reviewId, updatedReview);

      expect(result).toEqual(movieWithUpdatedReview);
      expect(service.updateReview).toHaveBeenCalledWith(
        movieId,
        reviewId,
        updatedReview,
      );
    });

    it('should throw NotFoundException if the movie or review is not found', () => {
      const movieId = '1';
      const reviewId = 'review-1';
      const updatedReview: Review = {
        id: 'review-1',
        rating: 4.5,
        comment: 'Updated review',
      };
      jest.spyOn(service, 'updateReview').mockImplementationOnce(() => {
        throw new NotFoundException('Movie or review not found');
      });

      expect(() => {
        controller.updateReview(movieId, reviewId, updatedReview);
      }).toThrow(NotFoundException);
      expect(service.updateReview).toHaveBeenCalledWith(
        movieId,
        reviewId,
        updatedReview,
      );
    });
  });
});
