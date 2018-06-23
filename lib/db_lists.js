let path = require('path'),
fs = require('fs-extra'),
FileAsync = require('lowdb/adapters/FileAsync'),
low = require('lowdb'),
shortId = require('shortid');

// okay just do this for now.
let dir_db = 'db',
path_lists = path.join(dir_db, 'lists.json');

// ensure db folder, and default list.json
exports.ensureDB = function () {

    let listAdapter = new FileAsync(path_lists);

    return fs.ensureDir(dir_db).then(function () {

        return low(listAdapter).then(function (list) {

            return list.defaults({
                lists: []
            }).write();

        })

    });

};

// push new list
exports.pushList = function (meta) {

    let listAdapter = new FileAsync(path_lists);

    meta = meta || {};

    meta.name = meta.name || 'new list';

    return low(listAdapter).then(function (list) {

        return list.get('lists').push({

            name: meta.name,
            id: shortId.generate(),
            items: []

        }).write();

    });

};

// read the list
exports.readList = function () {

    let listAdapter = new FileAsync(path_lists);

    return low(listAdapter);

};

// getListById
exports.getListById = function (id) {

    return this.readList().then(function (list) {

        return list.get('lists').find({
            id: id
        });

    });

};
