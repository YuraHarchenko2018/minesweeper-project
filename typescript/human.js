"use strict";
exports.__esModule = true;
exports.Human = void 0;
var Human = /** @class */ (function () {
    function Human(fName, sName, age) {
        this.firstName = fName;
        this.sureName = sName;
        this.age = age;
    }
    Human.prototype.getInfo = function () {
        return "\u0418\u043C\u044F: ".concat(this.firstName, ", \u0424\u0430\u043C\u0438\u043B\u0438\u044F: ").concat(this.sureName, ", \u0412\u043E\u0437\u0440\u0430\u0441\u0442: ").concat(this.age);
    };
    return Human;
}());
exports.Human = Human;
