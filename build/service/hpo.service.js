"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HPO = void 0;
var crawler_service_1 = require("./crawler.service");
var Announcement_1 = require("../entity/Announcement");
var typeorm_1 = require("typeorm");
var HPO = /** @class */ (function () {
    function HPO() {
        this.annoucementRepository = typeorm_1.getRepository(Announcement_1.Announcement);
    }
    ;
    HPO.prototype.startCrawling = function () {
        return __awaiter(this, void 0, void 0, function () {
            var initialPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initialPage = 1;
                        console.info("Crawler starts");
                        return [4 /*yield*/, this.crawlPage(initialPage)
                                .then(function () { return console.info("Crawler finishes"); })
                                .catch(function (e) { return console.error(e); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HPO.prototype.crawlPage = function (pageNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var crawledAnnouncements, crawler, links, ids, _loop_1, this_1, index;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        crawledAnnouncements = 0;
                        console.info("\n>>>>> Starting to Crawl restuls page " + pageNumber + " \n");
                        crawler = new crawler_service_1.Crawler();
                        return [4 /*yield*/, crawler.crawlResultsPage(pageNumber)];
                    case 1:
                        links = _a.sent();
                        console.debug(links.join('\n'));
                        if (!(links.length > 0)) return [3 /*break*/, 5];
                        ids = this.extractAnnouncementIds(links);
                        _loop_1 = function (index) {
                            var id, existingAnnouncement;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        id = ids[index];
                                        return [4 /*yield*/, this_1.annoucementRepository.findOne({ where: { externalId: id } })];
                                    case 1:
                                        existingAnnouncement = _a.sent();
                                        if (!(existingAnnouncement === null || existingAnnouncement === void 0 ? void 0 : existingAnnouncement.externalId)) return [3 /*break*/, 2];
                                        console.info("\nSkipping announcment ID = " + id + " because already exists \n");
                                        return [3 /*break*/, 4];
                                    case 2:
                                        console.info("\n>>>>> Starting to Crawl announcment page ID = " + id + " \n");
                                        return [4 /*yield*/, crawler.crawlAnnouncementPage(id)
                                                .then(function (announcementData) {
                                                if (announcementData) {
                                                    console.debug('\nCrawled data: ', JSON.stringify(announcementData) + "\n");
                                                    _this.saveAnnouncement(announcementData);
                                                }
                                                else {
                                                    console.log("ERROR: Unable to extract data from announcement ID = " + id);
                                                }
                                            })];
                                    case 3:
                                        _a.sent();
                                        console.info("\n>>>>> Finished to Crawl announcment page ID = " + id + " \n");
                                        crawledAnnouncements++;
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < links.length)) return [3 /*break*/, 5];
                        return [5 /*yield**/, _loop_1(index)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 2];
                    case 5:
                        console.info("\n<<<<< Finished to Crawl page " + pageNumber + " with " + crawledAnnouncements + " new announcements \n");
                        if (!(crawledAnnouncements > 0)) return [3 /*break*/, 7];
                        pageNumber++;
                        return [4 /*yield*/, this.crawlPage(pageNumber)
                                .catch(function (e) { return console.error(e); })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    HPO.prototype.saveAnnouncement = function (announcementData) {
        return __awaiter(this, void 0, void 0, function () {
            var announcement;
            return __generator(this, function (_a) {
                announcement = new Announcement_1.Announcement();
                announcement.externalId = announcementData.id;
                announcement.description = announcementData.description;
                announcement.documentUrl = announcementData.document_url;
                announcement.url = announcementData.url;
                announcement.publishedAt = this.datify(announcementData.date);
                this.annoucementRepository.save(announcement)
                    .then(function (r) { return console.log("Saved a new Announcement with id: " + r.id); })
                    .catch(function (e) { return console.error(e); });
                return [2 /*return*/];
            });
        });
    };
    HPO.prototype.datify = function (field) {
        var dateFields = field.trim().split('/');
        return new Date(Number(dateFields[2]), (Number(dateFields[1]) - 1), Number(dateFields[0]));
    };
    /**
     * Extracts each 'idNoticia' from the URL of the links.
     *
     * Example of URL: http://www.registresolicitants.cat/registre/noticias/03_noticias_detalle.jsp?idNoticia=3804
     *
     * @param links
     */
    HPO.prototype.extractAnnouncementIds = function (links) {
        return links.map(function (element) {
            return Number(element.split('=')[1]);
        });
    };
    return HPO;
}());
exports.HPO = HPO;
