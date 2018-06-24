
// use list clients createList Method to send the body


if (get('listid')) {

    /*
    lc.getList({

    listId: get('listid').innerText,
    onDone: function () {

    console.log('got list');
    console.log(this.response);

    }

    });
     */

    [].forEach.call(document.querySelectorAll('.button_delete'), function (el) {

        el.addEventListener('click', function (e) {

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

        });

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
