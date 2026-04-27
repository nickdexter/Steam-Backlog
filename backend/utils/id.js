// Check if id is a full positive number.
function isNumericId(id) {
    return /^[1-9]\d*$/.test(id);

}

module.exports = isNumericId;