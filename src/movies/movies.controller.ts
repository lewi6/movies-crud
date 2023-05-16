import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';

import { Movie, Review } from './movies.model';
import { MoviesService } from './movies.service';

//this just for swagger to capture json schema for Review
class ReviewSchema {
  @ApiProperty()
  comment: string;

  @ApiProperty()
  rating: number;
}

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({
    summary: 'see the selection of movie',
  })
  getMovies() {
    return this.moviesService.getMovies();
  }

  @Get('/search/:title')
  @ApiOperation({
    summary: 'Search Movies from the movie api',
    description: 'Here you search movies by title ',
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  searchMovies(@Param('title') title: string) {
    return this.moviesService.getAllMoviesByTitle(title);
  }

  @Post(':id')
  @ApiOperation({
    summary: 'Add movie to my selection',
  })
  addMovie(@Param('id') id: string) {
    return this.moviesService.addMovie(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get movie by ID',
  })
  @ApiOkResponse({ description: 'Retrieved movie successfully', type: Movie })
  @ApiNotFoundResponse({ description: 'Movie not found' })
  getMovieById(@Param('id') id: string): Movie {
    const movie = this.moviesService.getMovieById(id);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  @Post(':id/reviews')
  @ApiOperation({
    summary: 'Add review to a movie',
  })
  @ApiOkResponse({ description: 'Review added successfully', type: Movie })
  @ApiNotFoundResponse({ description: 'Movie not found' })
  @ApiConsumes('application/json')
  @ApiBody({ type: ReviewSchema })
  addReview(@Param('id') movieId: string, @Body() review: Review): Movie {
    return this.moviesService.addReview(movieId, review);
  }

  @Put(':id/reviews/:reviewId')
  @ApiOperation({
    summary: 'Update a movie review',
  })
  @ApiOkResponse({ description: 'Review updated successfully', type: Movie })
  @ApiNotFoundResponse({ description: 'Movie or review not found' })
  @ApiBody({ type: ReviewSchema })
  updateReview(
    @Param('id') movieId: string,
    @Param('reviewId') reviewId: string,
    @Body() updatedReview: Review,
  ): Movie {
    return this.moviesService.updateReview(movieId, reviewId, updatedReview);
  }

  @Delete(':id/reviews/:reviewId')
  @ApiOperation({
    summary: 'Delete a movie review',
  })
  @ApiOkResponse({ description: 'Review deleted successfully', type: Movie })
  @ApiNotFoundResponse({ description: 'Movie or review not found' })
  deleteReview(
    @Param('id') movieId: string,
    @Param('reviewId') reviewId: string,
  ): Movie {
    return this.moviesService.deleteReview(movieId, reviewId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a movie',
  })
  @ApiNoContentResponse({ description: 'Movie deleted successfully' })
  @ApiNotFoundResponse({ description: 'Movie not found' })
  deleteMovie(@Param('id') id: string): void {
    const deletedMovie = this.moviesService.deleteMovie(id);
    if (!deletedMovie) {
      throw new NotFoundException('Movie not found');
    }
  }

  @Get('seeHistory')
  @ApiOperation({
    summary: 'Get search history',
  })
  getSearchHistory() {
    return this.moviesService.getHistory();
  }

  @Get('rank/:order')
  @ApiOperation({
    summary: 'Rank movies selected by average score',
  })
  @ApiParam({
    name: 'order',
    description: 'Order of ranking (asc or desc)',
    enum: ['asc', 'desc'],
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Ranked movies retrieved successfully',
    type: Movie,
    isArray: true,
  })
  rankMovies(@Param('order') order: 'asc' | 'desc'): Movie[] {
    return this.moviesService.rankMoviesByAverageScore(order);
  }
}
