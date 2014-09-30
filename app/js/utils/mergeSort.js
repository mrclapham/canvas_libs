/*
For merge sorting an array of objects on a particular proerty of the object
 */
function mergeSortObj(arr, value)
{
    if (arr.length < 2)
        return arr;

    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);

    return mergeObj(mergeSortObj(left, value), mergeSortObj(right, value), value);
}
/**
 * A sub function used by the mergeSortObj function.
 * @param left
 * @param right
 * @param value
 * @returns {Array}
 */
function mergeObj(left, right, value)
{
var value = value
    var result = [];
    while (left.length && right.length) {
        if (left[0][value] <= right[0][value]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}


// A plain old merge sort


function mergeSort(arr)
{
    if (arr.length < 2)
        return arr;

    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}
