module.exports.func = func;


function func(Data, sortBy) {

    let sort_by = function (field, reverse, primer) { //функция сортировки по ключу

        let key = primer ?
            function (x) {
                return primer(x[field])
            } :
            function (x) {
                return x[field]
            };

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }

    // Проверка ключа сортировки число или строка?... тут может длинновато))
    for (const [key, value] of Object.entries(Data))
        if (typeof(value[sortBy]) == 'string') {
            Data.sort(sort_by(sortBy, false, function(a){return a.toUpperCase()}));//сортируем как строку
            break;
        }else {
            Data.sort(sort_by(sortBy, false, parseInt)); //сортируем как число
            break;
        }

  // console.log(Data);

}
