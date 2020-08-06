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
var HPO = /** @class */ (function () {
    function HPO() {
    }
    ;
    HPO.prototype.startCrawling = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, ind;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _loop_1 = function (ind) {
                            var crawler, links, ids;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.info("\n>>>>> Starting to Crawl restuls page " + ind + " \n");
                                        crawler = new crawler_service_1.Crawler();
                                        return [4 /*yield*/, crawler.crawlResultsPage(ind)];
                                    case 1:
                                        links = _a.sent();
                                        console.debug(links.join('\n'));
                                        if (links.length > 0) {
                                            ids = this_1.extractAnnouncementIds(links);
                                            ids.forEach(function (id) { return __awaiter(_this, void 0, void 0, function () {
                                                var announcementData;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            console.info("\n>>>>> Starting to Crawl announcment page ID = " + id + " \n");
                                                            return [4 /*yield*/, crawler.crawlAnnouncementPage(id)];
                                                        case 1:
                                                            announcementData = _a.sent();
                                                            /*                    const announcement: Annoucement = new Annoucement(
                                                                                    announcementData.id,
                                                                                    announcementData.url,
                                                                                    announcementData.date,
                                                                                    announcementData.description,
                                                                                    announcementData.document_url
                                                                                    );
                                                                                    */
                                                            console.log(JSON.stringify(announcementData));
                                                            console.info("\n>>>>> Finished to Crawl announcment page ID = " + id + " \n");
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        }
                                        console.info("\n<<<<< Finished to Crawl page " + ind + " \n");
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        ind = 0;
                        _a.label = 1;
                    case 1:
                        if (!(ind < 2)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(ind)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ind++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
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
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var hpo;
    return __generator(this, function (_a) {
        hpo = new HPO();
        hpo.startCrawling();
        return [2 /*return*/];
    });
}); })();
