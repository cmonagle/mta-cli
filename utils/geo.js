/**
 * 
 * @param {number[]} point1 
 * @param {number[]} point2 
 * 
 * @returns {number}
 */
function distance(point1, point2) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.sqrt(a * a + b * b);
};

module.exports = {
    distance
}