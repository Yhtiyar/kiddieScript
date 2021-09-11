"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.KsMinus = exports.KsPlus = exports.BinaryOperator = exports.KsString = exports.KsNumber = exports.Value = void 0;
var Value = /** @class */ (function () {
    function Value() {
    }
    Value.prototype.evaluate = function () {
        return this;
    };
    return Value;
}());
exports.Value = Value;
var KsNumber = /** @class */ (function (_super) {
    __extends(KsNumber, _super);
    function KsNumber(inner_value) {
        var _this = _super.call(this) || this;
        _this.inner_value = inner_value;
        return _this;
    }
    KsNumber.prototype.display = function () {
        return "(Number: " + this.inner_value.toString() + ")";
    };
    KsNumber.prototype.toString = function () {
        return "" + this.inner_value.toString();
    };
    KsNumber.add = function (left, right) {
        return new KsNumber(left.inner_value + right.inner_value);
    };
    KsNumber.subtract = function (left, right) {
        return new KsNumber(left.inner_value - right.inner_value);
    };
    return KsNumber;
}(Value));
exports.KsNumber = KsNumber;
var KsString = /** @class */ (function (_super) {
    __extends(KsString, _super);
    function KsString(inner_value) {
        var _this = _super.call(this) || this;
        _this.inner_value = inner_value;
        return _this;
    }
    KsString.prototype.display = function () {
        return "(String: " + this.inner_value.toString() + ")";
    };
    KsString.prototype.toString = function () {
        return "\"" + this.inner_value.toString() + "\"";
    };
    KsString.add = function (left, right) {
        return new KsString(left.inner_value + right.inner_value);
    };
    return KsString;
}(Value));
exports.KsString = KsString;
var BinaryOperator = /** @class */ (function () {
    function BinaryOperator(left, right, operator_sign) {
        this.left = left;
        this.right = right;
        this.operator_sign = operator_sign;
    }
    BinaryOperator.prototype.display = function () {
        return "(" + this.left.display() + this.operator_sign + this.right.display() + ")";
    };
    BinaryOperator.prototype.toString = function () {
        return "(" + this.left.toString() + this.operator_sign + this.right.toString() + ")";
    };
    return BinaryOperator;
}());
exports.BinaryOperator = BinaryOperator;
var KsPlus = /** @class */ (function (_super) {
    __extends(KsPlus, _super);
    function KsPlus(left, right) {
        return _super.call(this, left, right, "+") || this;
    }
    KsPlus.prototype.evaluate = function () {
        var left_evaluated = this.left.evaluate();
        var right_evaluated = this.right.evaluate();
        if (left_evaluated instanceof KsNumber) {
            if (!(right_evaluated instanceof KsNumber)) {
                throw new Error("Cannot add number with" + right_evaluated);
            }
            return KsNumber.add(left_evaluated, right_evaluated);
        }
        if (left_evaluated instanceof KsString) {
            if (!(right_evaluated instanceof KsString)) {
                throw new Error("Cannot add string with" + right_evaluated);
            }
            return KsString.add(left_evaluated, right_evaluated);
        }
        throw new Error("unknown value:" + left_evaluated);
    };
    return KsPlus;
}(BinaryOperator));
exports.KsPlus = KsPlus;
var KsMinus = /** @class */ (function (_super) {
    __extends(KsMinus, _super);
    function KsMinus(left, right) {
        return _super.call(this, left, right, "-") || this;
    }
    KsMinus.prototype.evaluate = function () {
        var left_evaluated = this.left.evaluate();
        var right_evaluated = this.right.evaluate();
        if (left_evaluated instanceof KsNumber) {
            if (!(right_evaluated instanceof KsNumber)) {
                throw new Error("Cannot subtract number with" + right_evaluated);
            }
            return KsNumber.subtract(left_evaluated, right_evaluated);
        }
        if (left_evaluated instanceof KsString) {
            throw new Error("You cannot subtract strings");
        }
        throw new Error("unknown value:" + left_evaluated);
    };
    return KsMinus;
}(BinaryOperator));
exports.KsMinus = KsMinus;
var exp = new KsPlus(new KsPlus(new KsNumber(2), new KsNumber(4)), new KsMinus(new KsNumber(5), new KsNumber(3)));
//(2 + 4) + (5 - 3)
console.log(exp.display());
console.log(exp.evaluate());
console.log(exp.toString());
