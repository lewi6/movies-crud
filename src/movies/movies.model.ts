import { ApiProperty } from '@nestjs/swagger';

export class Movie {
  @ApiProperty({ description: 'The title of the movie', example: 'Hire me !' })
  Title: string;

  @ApiProperty({
    description: 'The year the movie was released',
    example: '2023',
  })
  Year: string;

  @ApiProperty({ description: 'The unique identifier of the movie' })
  Id: string;

  @ApiProperty({ description: 'The type of the movie', example: 'great dev' })
  Type: string;

  @ApiProperty({ description: 'The URL of the movie poster' })
  Poster: string;

  @ApiProperty({
    description: 'This is a review of movie',
    example: { comment: 'iss gonna be great', rating: 10 },
  })
  Reviews: Review[];

  @ApiProperty({ description: 'Average score according to reviews' })
  AverageScore: number;

  constructor(
    Id: string,
    Title: string,
    Year: string,
    Type: string,
    Poster: string,
  ) {
    this.Title = Title;
    this.Poster = Poster;
    this.Type = Type;
    this.Year = Year;
    this.Id = Id;
  }
}

export interface Review {
  id: string;
  comment?: string;
  rating: number;
}

export type ReviewInput = Omit<Review, 'id'>;
