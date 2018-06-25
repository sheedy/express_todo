// end of the line.
module.exports = function (req, res) {

    req.postRes.mess = 'post recived, but nothing was done. Check the given body';
    res.json(req.postRes);

};
