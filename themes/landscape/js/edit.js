// edit path client for 'landscape' theme

var onItemClick = function () {

    console.log('li element clicked');

};

var onDoneClick = function (e) {

    console.log('Done button clicked');

    var li = e.target.parentElement,
    itemId = li.id.split('_')[1],
    listId = get('listid').innerHTML;
	
	console.log(listId,itemId);

};

var onDeleteClick = function (e) {

    console.log('delete button clicked');

    var itemId = e.target.dataset.itemId,
    listId = get('listid').innerHTML;

    new lc.http({

        path: '/edit',
        method: 'POST',
        body: JSON.stringify({

            mode: 'delete_list_item',
            listId: listId,
            itemId: itemId

        }),
        onDone: function () {

            var res = JSON.parse(this.response);

            if (res.success) {

                get('item_' + itemId).remove();

            }

        }

    });

}

if (get('listid')) {

    // for each hard coded list item
    [].forEach.call(document.querySelectorAll('.button_done'), function (el) {

        el.addEventListener('click', onDoneClick);

    });

    // for each delete button
    [].forEach.call(document.querySelectorAll('.button_delete'), function (el) {

        el.addEventListener('click', onDeleteClick);

    });

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

                        var li = document.createElement('li');

                        li.innerHTML = res.body.item.name;

                        get('list_current').appendChild(li);

                    } else {

                        console.log(this.response);

                    }

                }

            });

        }

    });

}
