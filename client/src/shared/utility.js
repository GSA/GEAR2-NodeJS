import * as _ from 'underscore';

export const removeDuplicates = (array, id) => {
    return array.filter(
        (item, pos, arr) => {
            return arr.map(
                mapObj => mapObj[id]).indexOf(item[id]) === pos;
        });
};

/**
 * Returns an array of sorted objects. Prop takes - if the order is descending;
 * prop value MUST be a string
 * @param array
 * @param prop
 */
export const sortArrayOfObjectByProp = (array, prop) => {
    return _.sortBy(array, function (i) { return i[prop].toLowerCase()});
};
