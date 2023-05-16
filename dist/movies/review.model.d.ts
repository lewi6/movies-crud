export declare class Review {
    id: string;
    comment?: string;
    rating: number;
}
export type ReviewInput = Omit<Review, 'id'>;
