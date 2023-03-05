"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entriesToIncomeAndExpenseSumBarData = exports.entriesToIncomeAndExpenseSumBarDataKeys = exports.entriesToBarChartData = exports.entriesToBarChartKeys = exports.entriesByCategoryToIdAndValue = exports.categoriesToIdAndValue = void 0;
const categoriesToIdAndValue = (array) => array.reduce((obj, cat) => obj.concat({ id: cat.name, value: cat.monthlyBudget, type: cat.type }), []);
exports.categoriesToIdAndValue = categoriesToIdAndValue;
const entriesByCategoryToIdAndValue = (array) => {
    return array.reduce((arr, entry) => {
        const isSameCategoryAndType = (el) => el.id === (entry.category ? entry.category.name : "uncategorised") &&
            el.type === entry.type;
        // Check if category & type combination already exists and get index
        const catIndex = arr.findIndex(isSameCategoryAndType);
        // If index doesn't exist, use the next available one
        const index = catIndex === -1 ? arr.length : catIndex;
        // Get total for new sum or initialise to 0
        const total = arr[index] ? arr[index]["value"] : 0;
        arr[index] = {
            id: entry.category?.name ? entry.category.name : "uncategorised",
            value: total + entry.amount,
            type: entry.type,
        };
        return arr;
    }, []);
};
exports.entriesByCategoryToIdAndValue = entriesByCategoryToIdAndValue;
const entriesToBarChartKeys = (array) => Array.from(
// Remove duplicate values
new Set(array.reduce((arr, entry) => arr.concat(entry.name), [])));
exports.entriesToBarChartKeys = entriesToBarChartKeys;
const entriesToBarChartData = (array, keys) => array.reduce((data, entry) => {
    let index = keys.indexOf(entry.type);
    data[index] = {
        ...data[index],
        [entry.name]: entry.amount,
        type: entry.type,
    };
    return data;
}, []);
exports.entriesToBarChartData = entriesToBarChartData;
const entriesToIncomeAndExpenseSumBarDataKeys = (array) => Array.from(
// Remove duplicate values
new Set(array.reduce((arr, entry) => arr.concat(entry.type), [])));
exports.entriesToIncomeAndExpenseSumBarDataKeys = entriesToIncomeAndExpenseSumBarDataKeys;
const entriesToIncomeAndExpenseSumBarData = (array, keys) => array.reduce((data, entry) => {
    let index = keys.indexOf(entry.type);
    let sum = data[index] ? data[index]["total"] : 0;
    data[index] = {
        total: sum + entry.amount,
        [entry.type]: sum + entry.amount,
        type: entry.type,
    };
    return data;
}, []);
exports.entriesToIncomeAndExpenseSumBarData = entriesToIncomeAndExpenseSumBarData;
