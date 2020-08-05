"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Annoucement = void 0;
var Annoucement = /** @class */ (function () {
    function Annoucement(id, externalId, publishedAt, createdAt, updatedAt) {
        this.id = id;
        this.externalId = externalId;
        this.publishedAt = publishedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    return Annoucement;
}());
exports.Annoucement = Annoucement;
