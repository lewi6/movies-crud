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
exports.Review = void 0;
const swagger_1 = require("@nestjs/swagger");
class Review {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The unique identifier of the review' }),
    __metadata("design:type", String)
], Review.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The comment for the review' }),
    __metadata("design:type", String)
], Review.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The rating for the movie',
        minimum: 0,
        maximum: 10,
    }),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
exports.Review = Review;
//# sourceMappingURL=review.model.js.map