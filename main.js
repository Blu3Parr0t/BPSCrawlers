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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var querystring = require("querystring");
var RedditPoster = /** @class */ (function () {
    function RedditPoster(clientId, clientSecret, username, password) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.username = username;
        this.password = password;
    }
    RedditPoster.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var authData, res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authData = Buffer.from("".concat(this.clientId, ":").concat(this.clientSecret)).toString('base64');
                        return [4 /*yield*/, fetch('https://www.reddit.com/api/v1/access_token', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'Authorization': "Basic ".concat(authData)
                                },
                                body: querystring.stringify({
                                    grant_type: 'password',
                                    username: this.username,
                                    password: this.password
                                })
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data.access_token];
                }
            });
        });
    };
    RedditPoster.prototype.post = function (content, title) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, postData, res, responseData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAccessToken()];
                    case 1:
                        accessToken = _a.sent();
                        postData = querystring.stringify({
                            sr: "u_".concat(this.username), // Posting to your own profile
                            kind: 'self',
                            text: content,
                            title: title,
                        });
                        return [4 /*yield*/, fetch('https://oauth.reddit.com/api/submit', {
                                method: 'POST',
                                headers: {
                                    'Authorization': "Bearer ".concat(accessToken),
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'User-Agent': 'nodejs/1.0'
                                },
                                body: postData
                            })];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        responseData = _a.sent();
                        return [2 /*return*/, responseData];
                }
            });
        });
    };
    return RedditPoster;
}());
// Usage
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var redditPoster, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                redditPoster = new RedditPoster('T_E6WsmMqqSY0t1-Pq870g', 'dqYdnjZGdc9atGLiCl4P7IB0UR8nKA', 'Human_Sea_9061', 'Lm025197!');
                return [4 /*yield*/, redditPoster.post('Example post', 'Hopefullt this works!')];
            case 1:
                response = _a.sent();
                console.log('Post submitted:', response);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error:', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
