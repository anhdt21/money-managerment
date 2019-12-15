firebase.database().ref('post').on('value', (snapShot)=>{
    if(snapShot.val()){
        const peopleArray = Object.keys(snapShot.val()).map(i => snapShot.val()[i])
        const content = peopleArray.map(item=>{
            return `<tr><td>${item.title}</td><td>${item.content}</td></tr>`;
        })

        document.getElementById('table-data').innerHTML = content.join('');
    }
  });


  /*

success: function (response) {
                    var template = $('#table-template').html();
                    var render = "";
                    if (response.RowCount > 0) {
                        $.each(response.Results, function (i, item) {
                            render += Mustache.render(template, {
                                Content: item.Content,
                                Id: item.ID,
                                CreatedDate: item.BackDate,
                                statusx: item.Status === 1 ? "done" : '',
                                check: item.Status === 1 ? 'checked' : '',
                                Status: item.Status
                            });
                        });

                        if (render !== undefined) {
                            $('#todo-list').html(render);
                        }
                    }
                    else {
                        $('#todo-list').html('');
                    }
                    //tedu.stopLoading();

                },
  */