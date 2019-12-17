let Utils = (function(){

    const getCurrentDate = ()=>{
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        return `${yyyy}-${mm}-${dd}`;
    };

    const objectToArray = obj=>{
        return Object.keys(obj).map(i => obj[i]);
    };

    const addRecord = (obj) => {
        const date = new Date(obj.strdate);
        const month = date.getMonth() + 1;
        firebase.database().ref(`Thang${month}/${getCurrentDate()}`).set({
            date: getCurrentDate(),
            cuong: obj.cuong,
            dat:obj.dat,
            long: obj.long,
            ta: obj.ta,
            tung: obj.tung,
            totalmoney: obj.totalmoney,
            note: obj.note
    });
    };

    const formatPrie = strPrice=>{
        if(!strPrice) return '0';
        strPrice = typeof strPrice === 'string' ? strPrice.toString() : parseFloat(strPrice).toString();
        return strPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    };

    const getDateTime =() =>{
        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        if(month.toString().length == 1) {
             month = '0'+month;
        }
        if(day.toString().length == 1) {
             day = '0'+day;
        }   
        if(hour.toString().length == 1) {
             hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
             minute = '0'+minute;
        }
        if(second.toString().length == 1) {
             second = '0'+second;
        }   
        var dateTime = day+'/'+month+'/'+year+' '+hour+':'+minute+':'+second;   
         return dateTime;
    }

    return{
        objectToArray: objectToArray,
        getCurrentDate: getCurrentDate,
        addRecord: addRecord,
        formatPrie: formatPrie,
        getDateTime: getDateTime
    };
}());