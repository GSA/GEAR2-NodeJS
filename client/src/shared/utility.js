export const removeDuplicates = (array, id) => {
    return array.filter(
        (item, pos, arr) => {
            return arr.map(
                mapObj => mapObj[id]).indexOf(item[id]) === pos;
        });
};