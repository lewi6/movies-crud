"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const movies_model_1 = require("./movies.model");
const movies_service_1 = require("./movies.service");
class ReviewSchema {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReviewSchema.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReviewSchema.prototype, "rating", void 0);
let MoviesController = class MoviesController {
    constructor(moviesService) {
        this.moviesService = moviesService;
    }
    getMovies() {
        return this.moviesService.getMovies();
    }
    searchMovies(title) {
        return this.moviesService.getAllMoviesByTitle(title);
    }
    addMovie(id) {
        return this.moviesService.addMovie(id);
    }
    getMovieById(id) {
        const movie = this.moviesService.getMovieById(id);
        if (!movie) {
            throw new common_1.NotFoundException('Movie not found');
        }
        return movie;
    }
    addReview(movieId, review) {
        return this.moviesService.addReview(movieId, review);
    }
    updateReview(movieId, reviewId, updatedReview) {
        return this.moviesService.updateReview(movieId, reviewId, updatedReview);
    }
    deleteReview(movieId, reviewId) {
        return this.moviesService.deleteReview(movieId, reviewId);
    }
    deleteMovie(id) {
        const deletedMovie = this.moviesService.deleteMovie(id);
        if (!deletedMovie) {
            throw new common_1.NotFoundException('Movie not found');
        }
    }
    getSearchHistory() {
        return this.moviesService.getHistory();
    }
    rankMovies(order) {
        return this.moviesService.rankMoviesByAverageScore(order);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'see the selection of movie',
    }),
    openapi.ApiResponse({ status: 200, type: [require("./movies.model").Movie] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "getMovies", null);
__decorate([
    (0, common_1.Get)('/search/:title'),
    (0, swagger_1.ApiOperation)({
        summary: 'Search Movies from the movie api',
        description: 'Here you search movies by title ',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'bad request' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "searchMovies", null);
__decorate([
    (0, common_1.Post)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Add movie to my selection',
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "addMovie", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get movie by ID',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Retrieved movie successfully', type: movies_model_1.Movie }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Movie not found' }),
    openapi.ApiResponse({ status: 200, type: require("./movies.model").Movie }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", movies_model_1.Movie)
], MoviesController.prototype, "getMovieById", null);
__decorate([
    (0, common_1.Post)(':id/reviews'),
    (0, swagger_1.ApiOperation)({
        summary: 'Add review to a movie',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Review added successfully', type: movies_model_1.Movie }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Movie not found' }),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiBody)({ type: ReviewSchema }),
    openapi.ApiResponse({ status: 201, type: require("./movies.model").Movie }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", movies_model_1.Movie)
], MoviesController.prototype, "addReview", null);
__decorate([
    (0, common_1.Put)(':id/reviews/:reviewId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a movie review',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Review updated successfully', type: movies_model_1.Movie }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Movie or review not found' }),
    (0, swagger_1.ApiBody)({ type: ReviewSchema }),
    openapi.ApiResponse({ status: 200, type: require("./movies.model").Movie }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('reviewId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", movies_model_1.Movie)
], MoviesController.prototype, "updateReview", null);
__decorate([
    (0, common_1.Delete)(':id/reviews/:reviewId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a movie review',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Review deleted successfully', type: movies_model_1.Movie }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Movie or review not found' }),
    openapi.ApiResponse({ status: 200, type: require("./movies.model").Movie }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('reviewId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", movies_model_1.Movie)
], MoviesController.prototype, "deleteReview", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a movie',
    }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Movie deleted successfully' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Movie not found' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "deleteMovie", null);
__decorate([
    (0, common_1.Get)('seeHistory'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get search history',
    }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "getSearchHistory", null);
__decorate([
    (0, common_1.Get)('rank/:order'),
    (0, swagger_1.ApiOperation)({
        summary: 'Rank movies selected by average score',
    }),
    (0, swagger_1.ApiParam)({
        name: 'order',
        description: 'Order of ranking (asc or desc)',
        enum: ['asc', 'desc'],
        type: 'string',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Ranked movies retrieved successfully',
        type: movies_model_1.Movie,
        isArray: true,
    }),
    openapi.ApiResponse({ status: 200, type: [require("./movies.model").Movie] }),
    __param(0, (0, common_1.Param)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], MoviesController.prototype, "rankMovies", null);
MoviesController = __decorate([
    (0, swagger_1.ApiTags)('movies'),
    (0, common_1.Controller)('movies'),
    __metadata("design:paramtypes", [movies_service_1.MoviesService])
], MoviesController);
exports.MoviesController = MoviesController;
//# sourceMappingURL=movies.controller.js.map