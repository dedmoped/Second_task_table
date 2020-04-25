
module.exports.last = function () { 
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var hh =String(today.getHours());
    var min =String(today.getMinutes());
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy+" "+ hh +":"+min;
    return today;
};

    

