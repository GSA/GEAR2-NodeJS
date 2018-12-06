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
    array.sort(compare(prop))
};

const compare = (prop) => {
    let sortOrder = 1;
    if (prop[0] === "-") {
        sortOrder = -1;
        prop = prop.substr(1);
    }

    return function (a, b) {
        let result = (a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0;
        return result * sortOrder;
    };
}