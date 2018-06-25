// edit path client for 'landscape' theme

var reload = function (noListId) {

    var param = '';

    if (!noListId) {

        param = '?l=' + get('listid').innerHTML;

    }

    window.location.href = '/edit' + param;

};

// when a list item is clicked
var onItemClick = function () {

    console.log('li element clicked');

};

// when a done button is clicked
var onDoneClick = function (e, done) {

    console.log('Done button clicked');

    var li = e.target.parentElement,
    itemId = li.id.replace(/^item_/, ''),
    listId = get('listid').innerHTML;

    done = done || function () {};

    new lc.http({

        path: '/edit',
        method: 'POST',
        body: JSON.stringify({

            mode: 'edit_list_item',
            listId: listId,
            itemId: itemId,

            toggleDone: true

        }),
        onDone: done

    });

};

// when the delete button is clieck
var onDeleteClick = function (e, done) {

    var itemId = e.target.dataset.itemId,
    listId = get('listid').innerHTML;

    done = done || function () {};

    new lc.http({

        path: '/edit',
        method: 'POST',
        body: JSON.stringify({

            mode: 'delete_list_item',
            listId: listId,
            itemId: itemId

        }),
        onDone: done

    });

}

if (get('listid')) {

    // for each hard coded list item
    [].forEach.call(document.querySelectorAll('.button_done'), function (el) {

        el.addEventListener('click', function (e) {

            onDoneClick(e, function () {

                reload();

            });

        });

    });

    // for each delete button
    [].forEach.call(document.querySelectorAll('.button_delete'), function (el) {

        el.addEventListener('click', function (e) {

            onDeleteClick(e, function () {
                reload();
            });

        });

    });

    // if add item button is clicked
    get('newitem_submit').addEventListener('click', function () {

        var text = get('newitem_text').value;

        if (text !== '') {

            lc.addListItem({

                body: {
                    listId: get('listid').innerText,
                    item: {

                        name: text
                    }

                },
                onDone: function () {

                    var res = JSON.parse(this.response);

                    if (res.success) {

                        reload();

                    } else {

                        console.log(this.response);

                    }

                }

            });

        }

    });

} else {

    [].forEach.call(document.querySelectorAll('.list_delete'), function (el) {

        el.addEventListener('click', function (e) {

            var li = e.target.parentElement,
            listId = li.id.replace(/^list_/, '');

            console.log(listId);

            lc.delList({

                listId: listId,
                onDone: function () {

                    //console.log(this.response);
					reload(true);

                }

            });

        });

    });

}
