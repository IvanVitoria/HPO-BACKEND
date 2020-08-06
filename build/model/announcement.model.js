"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Annoucement = void 0;
var Annoucement = /** @class */ (function () {
    function Annoucement(id, externalId, url, publishedAt, description, document_url, createdAt, updatedAt) {
        this.id = id;
        this.externalId = externalId;
        this.url = url;
        this.publishedAt = publishedAt;
        this.description = description;
        this.document_url = document_url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.createdAt = new Date();
        this.updatedAt = this.createdAt;
    }
    return Annoucement;
}());
exports.Annoucement = Annoucement;
