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

// getListById
exports.getListById = function (id) {

    return this.readList().then(function (list) {

        return list.get('lists').find({
            id: id
        });

    });

};
 
// push new list
exports.pushList = function (obj) {

    let listAdapter = new FileAsync(path_lists);

    obj = obj || {};

    obj.name = obj.name || 'new list';

    return low(listAdapter).then(function (list) {

        return list.get('lists').push({

            name: obj.name,
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

        console.log(item.value().done);

        // toggle done flag?
        if (obj.toggleDone) {

            console.log('toggle item done flag');

            return item.assign({
                done: !item.value().done
            }).write();

        } else {

            console.log('dirrect item update');

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
