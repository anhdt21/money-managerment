function addEventClick(){
   //Check box
   var toggler = $('.checkbox__toggle');
   var circle = $('.checkbox__checker');

   var time1 = 150;
   var time2 = 800;

toggler.click(function(){
  let that = $(this);
  
 circle.removeClass('anim--speed');
 if($(this).is(":checked")){
  $(this).attr('checked','checked');
   setTimeout(function(){
    that.parent()[0].children[1].classList.add('anim--speed');
   },10);
   setTimeout(function(){
    that.parent()[0].children[1].classList.add('anim--go-right');
   },time1);
 }
 else{
  $(this).removeAttr('checked');
   setTimeout(function(){
    that.parent()[0].children[1].classList.remove('anim--speed');
   },10);
   setTimeout(function(){
    that.parent()[0].children[1].classList.remove('anim--go-right');
   },time1);
 }
})

   //End Checkbox
};

let homeController = {
    initial: function(){
        homeController.registerEvent();
    },
    registerEvent: function(){
        let today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        $('#curent-mounth').text(mm);

        //Chọn tháng
        $('.dropdown-item').off('click').on('click', function(){
            const month = $(this).attr('data-id');
            const text = $(this).text();
            $('#dropdownMenuButton').text(text);

            firebase.database().ref(`Thang${month}`).on('value', (snapShot)=>{
                if(snapShot.val()){
                    const dataArr = Object.keys(snapShot.val()).map(i => snapShot.val()[i])

                    const template = $('#table-template').html();
                    let render = "";
                    if (dataArr.length > 0) {
                        let totalCuong = 0;
                        let totalDat = 0;
                        let totalTung = 0;
                        let totalTA = 0;
                        let totalLong = 0;

                        $.each(dataArr, function (i, item) {
                            const arrTrue = Object.values(item);
                            var avg = arrTrue.filter(item=>item === true).length;
                            totalCuong = item.cuong === true ? totalCuong+ (item.totalmoney/avg) : totalCuong;
                            totalDat = item.dat === true ? totalDat+ (item.totalmoney/avg) : totalDat;
                            totalTung = item.tung === true ? totalTung+ (item.totalmoney/avg) : totalTung;
                            totalTA = item.ta === true ? totalTA+ (item.totalmoney/avg) : totalTA;
                            totalLong = item.long === true ? totalLong+ (item.totalmoney/avg) : totalLong;

                            render += Mustache.render(template, {
                                Date : item.date,
                                Cuong: item.cuong === true ? ' anim--speed anim--go-right' : '',
                                CuongCheck: item.cuong === true ? 'checked' : null,
                                Dat: item.dat === true ? ' anim--speed anim--go-right' : '',
                                DatCheck: item.dat === true ? 'checked' : null,
                                Tung: item.tung === true ? ' anim--speed anim--go-right' : '',
                                TungCheck: item.tung === true ? 'checked' : null,
                                TA: item.ta === true ? ' anim--speed anim--go-right' : '',
                                TACheck: item.ta === true ? 'checked' : null,
                                Long: item.long === true ? ' anim--speed anim--go-right' : '',
                                LongCheck: item.long === true ? 'checked' : null,
                                TotalMoney: Utils.formatPrie(item.totalmoney),
                            
                            });
                        });

                        render += `<tr style="color: red;">
                        <td>Phải trả :</td>
                        <td>${Utils.formatPrie(totalCuong)}đ</td>
                        <td>${Utils.formatPrie(totalDat)}đ</td>
                        <td>${Utils.formatPrie(totalTung)}đ</td>
                        <td>${Utils.formatPrie(totalTA)}đ</td>
                        <td>${Utils.formatPrie(totalLong)}đ</td>
                        <td>${Utils.formatPrie(totalCuong + totalDat + totalTung + totalTA + totalLong)}đ</td>
                        </tr>`;
                        if (render !== undefined) {
                            $('#table-data').html(render);
                            addEventClick();
                        }
                    }
                    else {
                        $('#table-data').html('');
                    }
                }else{
                  $('#table-data').html('Làm loz gì có dữ liệu');
                }
              });
        });

        //Add record
        $('#addRecord').off('click').on('click', function(e){
            e.preventDefault();
            $('#add-note').val('');
            $('#frmAddRecord').show();
        });

//Insert to db
        $('#addRC').off('click').on('click', function(e){
          e.preventDefault();
          const strDate = $('#date-buy').val();
          const cuong = $('#cuong').attr('checked') === 'checked' ? true : false;
          const dat = $('#dat').attr('checked') === 'checked' ? true : false;
          const tung = $('#tung').attr('checked') === 'checked' ? true : false;
          const ta = $('#ta').attr('checked') === 'checked' ? true : false;
          const long = $('#long').attr('checked') === 'checked' ? true : false;
          const note = $('#add-note').val();
          const totalMoney = $('#total-money').val();
          const obj = {
            strdate: strDate,
            cuong: cuong,
            dat:dat,
            tung:tung,
            ta: ta,
            long:long,
            totalmoney:totalMoney,
            note: note
          }
          homeController.clearForm();
          $('#frmAddRecord').hide();
          Utils.addRecord(obj);
        });

        //First load
        const d= new Date();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        $('#dropdownMenuButton').text(`Tháng ${month}`);
        firebase.database().ref(`Thang${month}`).on('value', (snapShot)=>{
          if(snapShot.val()){
              const dataArr = Object.keys(snapShot.val()).map(i => snapShot.val()[i])

              const template = $('#table-template').html();
              let render = "";
              if (dataArr.length > 0) {
                let totalCuong = 0;
                let totalDat = 0;
                let totalTung = 0;
                let totalTA = 0;
                let totalLong = 0;
                  $.each(dataArr, function (i, item) {
                      const arrTrue = Object.values(item);
                    var avg = arrTrue.filter(item=>item === true).length;
                    totalCuong = item.cuong === true ? totalCuong+ (item.totalmoney/avg) : totalCuong;
                    totalDat = item.dat === true ? totalDat+ (item.totalmoney/avg) : totalDat;
                    totalTung = item.tung === true ? totalTung+ (item.totalmoney/avg) : totalTung;
                    totalTA = item.ta === true ? totalTA+ (item.totalmoney/avg) : totalTA;
                    totalLong = item.long === true ? totalLong+ (item.totalmoney/avg) : totalLong;
                      render += Mustache.render(template, {
                          Date : item.date,
                          Cuong: item.cuong === true ? ' anim--speed anim--go-right' : '',
                          CuongCheck: item.cuong === true ? 'checked' : null,
                          Dat: item.dat === true ? ' anim--speed anim--go-right' : '',
                          DatCheck: item.dat === true ? 'checked' : null,
                          Tung: item.tung === true ? ' anim--speed anim--go-right' : '',
                          TungCheck: item.tung === true ? 'checked' : null,
                          TA: item.ta === true ? ' anim--speed anim--go-right' : '',
                          TACheck: item.ta === true ? 'checked' : null,
                          Long: item.long === true ? ' anim--speed anim--go-right' : '',
                          LongCheck: item.long === true ? 'checked' : null,
                          TotalMoney: Utils.formatPrie(item.totalmoney)
                      });
                  });

                  render += `<tr style="color: red;">
                  <td>Phải trả :</td>
                  <td>${Utils.formatPrie(totalCuong)}đ</td>
                  <td>${Utils.formatPrie(totalDat)}đ</td>
                  <td>${Utils.formatPrie(totalTung)}đ</td>
                  <td>${Utils.formatPrie(totalTA)}đ</td>
                  <td>${Utils.formatPrie(totalLong)}đ</td>
                  <td>${Utils.formatPrie(totalCuong + totalDat + totalTung + totalTA + totalLong)}đ</td>
                  </tr>`;

                  if (render !== undefined) {
                      $('#table-data').html(render);
                      addEventClick();
                  }
              }
              else {
                  $('#table-data').html('');
              }
          }
        });

        //Phân người nấu cơm
        setInterval(function(){
            currentTime = Utils.getDateTime();
            $('#who-is-cook').text(currentTime);
        }, 1000);

        //Đóng form
        $('#close-modal').off('click').on('click',function(e){
            e.preventDefault();
            $('#frmAddRecord').hide();
        });
        //date picker
        $('[data-toggle="datepicker"]').datepicker({
            autoPick:true,
            format:"yyyy-mm-dd"
        });
    },
    clearForm : function(){
    //   $('#cuong').removeAttr('checked');
    //   $('#dat').removeAttr('checked');
    //   $('#tung').removeAttr('checked');
    //   $('#ta').removeAttr('checked');
    //   $('#long').removeAttr('checked');
    //   $('#add-note').val('');
    //   $('#total-money').val(0);
    }
};

$(document).ready(function(){
  addEventClick();
   $('#frmAddRecord').hide();
    homeController.initial();
});