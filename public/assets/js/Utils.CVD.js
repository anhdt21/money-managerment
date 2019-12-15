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
        const date = new Date();
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


    return{
        objectToArray: objectToArray,
        getCurrentDate: getCurrentDate,
        addRecord: addRecord,
        formatPrie: formatPrie
    };
}());