const fs=require ('fs');
const utils =require('util');

fs.readdir('data',function (err, fileName) {    // входязие обекты из папки ДАТА
    if (err) {
        console.log(err);
        return;
    }
    //console.log(fileName); //Проверяем файлы
    fileName.forEach( (element) => {fs.readFile('./data/'+element, {encoding: 'utf-8'}, function (err,data) {
        if (err) {
            console.log(err);
            return;
        }
        const obj = JSON.parse(data); //Читаем обекты файлы
        let oData=obj.data;     //получаем обект с данными подлежащие обработке
        for (const [key,value] of Object.entries(obj.condition)) {  //Ищем условие
           // console.log(value);
            let module = require('./modules/'+key); //Подключаем модули
           // console.log(module.func) //Проверяем подключеные функции
           module.func(oData,value[0]);
        }

        const resultData={"result":oData}
        console.log(resultData); // Проверяем обект с данными после обработки
        //запись файла
        fs.writeFile('./result/'+element, utils.format('%j', resultData),function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('file '+element+' was write');
        });

    });
});
});
