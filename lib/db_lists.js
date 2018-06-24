let path = require('path'),
fs = require('fs-extra'),
FileAsync = require('lowdb/adapters/FileAsync'),
low = require('lowdb'),
shortId = require('shortid');

// okay just do this for now.
let dir_db = 'db',
path_lists = path.join(dir_db, 'lists.json');

/********* ********** **********
HELPER
 ********** ********** *********/

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

/********* ********** **********
LIST
 ********** ********** *********/

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

/********* ********** **********
ITEM
 ********** ********** *********/

// get an item by list and item id
exports.getItemById = function (obj) {

    return this.getListById(obj.listId).then(function (list) {

        return list.get('items').find({
            id: obj.itemId
        });

    });

};

// edit an item by list and item id

exports.editItemById = function (obj) {

    return this.getListById(obj.listId).then(function (list) {

        var item = list.get('items').find({
                id: obj.itemId
            });

        // toggle done flag?
        if (obj.toggleDone) {

            return item.assign({
                done: !!item.done
            }).write();

        } else {

            // then direct edit
            return item.write();

        }

return item.write();

    });

};


// get an item by list and item id
exports.deleteItemById = function (obj) {

    return this.getListById(obj.listId).then(function (list) {

        return list.get('items').remove({
            id: obj.itemId
        }).write(); ;

    });

};

// push a new item to a list
exports.pushItem = function (obj) {

    return this.getListById(obj.listId).then(function (list) {

        obj.item.id = shortId.generate();
        obj.item.done = false;

        return list.get('items').push(obj.item).write();

    });

};
