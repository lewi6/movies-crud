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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const swagger_1 = require("@nestjs/swagger");
class Movie {
    constructor(Id, Title, Year, Type, Poster) {
        this.Title = Title;
        this.Poster = Poster;
        this.Type = Type;
        this.Year = Year;
        this.Id = Id;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The title of the movie', example: 'Hire me !' }),
    __metadata("design:type", String)
], Movie.prototype, "Title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The year the movie was released',
        example: '2023',
    }),
    __metadata("design:type", String)
], Movie.prototype, "Year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The unique identifier of the movie' }),
    __metadata("design:type", String)
], Movie.prototype, "Id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The type of the movie', example: 'great dev' }),
    __metadata("design:type", String)
], Movie.prototype, "Type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The URL of the movie poster' }),
    __metadata("design:type", String)
], Movie.prototype, "Poster", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'This is a review of movie',
        example: { comment: 'iss gonna be great', rating: 10 },
    }),
    __metadata("design:type", Array)
], Movie.prototype, "Reviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Average score according to reviews' }),
    __metadata("design:type", Number)
], Movie.prototype, "AverageScore", void 0);
exports.Movie = Movie;
//# sourceMappingURL=movies.model.js.map