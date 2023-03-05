"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYearMonth = exports.getCountOfDaysInMonth = exports.getYearMonthDay = void 0;
const getYearMonthDay = (date = new Date()) => {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${date.getFullYear()}-${month}-${day}`;
};
exports.getYearMonthDay = getYearMonthDay;
const getCountOfDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
exports.getCountOfDaysInMonth = getCountOfDaysInMonth;
const getYearMonth = ({ date = new Date(), addMonth = 0 }) => {
    return new Date(date.getFullYear(), date.getMonth() + addMonth);
};
exports.getYearMonth = getYearMonth;
