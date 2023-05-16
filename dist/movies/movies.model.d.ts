export declare class Movie {
    Title: string;
    Year: string;
    Id: string;
    Type: string;
    Poster: string;
    Reviews: Review[];
    AverageScore: number;
    constructor(Id: string, Title: string, Year: string, Type: string, Poster: string);
}
export interface Review {
    id: string;
    comment?: string;
    rating: number;
}
export type ReviewInput = Omit<Review, 'id'>;
