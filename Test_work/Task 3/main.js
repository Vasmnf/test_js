const fs=require ('fs');
const utils =require('util');

function kParent(arr,mid,max) {       ///выводим коеф родителя/нынешний
                            // сначала суммы до сиридины и до конца
                        // сумма начала        /     сумма конца         -        сумма конца       /        сумма начала
    return  Math.abs(total(arr.slice(0,mid))/total(arr.slice(mid,max))-total(arr.slice(mid,max))/total(arr.slice(0,mid))); //выводим коеф родителя/нынешний

}
function total(arr) {        //  суммa масива
    if(!Array.isArray(arr)) return;
    return arr.reduce((a, v)=>a + v);
}

function randomInteger(min, max) {      //Случайное целое число от min до max
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}


fs.readdir('data',function (err, fileName) {    // входящие обекты из папки ДАТА
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
        let arr=Array.from(obj.set);     //получаем  массив

         let mid=parseInt(arr.length/2), max=arr.length; // ишем длины масивов середину и конец чтоб каждый раз не вызывать фукцию length обращаться будем много
        //console.log(arr, ' ',mid,' ',max);
         for (let z=0;z<2;z++){
                  //Делаем еволюцию
        let arrC=[], r1,r2  ;           //масив детей
        for (let i=0; i<max; i++) {
            arrC[i] = arr.slice();    //набиваем детьми
                                    //"модифицируем 1 ген"
            r1=randomInteger(0,mid-1);
            r2=randomInteger(mid,max-1);
            let t=arrC[i][r1];
            arrC[i][r1]=arrC[i][r2];
            arrC[i][r2]=t;

        }
        //console.log(arrC);
        let arrGC=[];    //масив внуков
        for (let i=0; i<max; i++){
            arrGC = arrC[i].slice();    //берем строку детей
            //"модифицируем 1 ген"
            for (let j=0; j<max; j++){
                r1=randomInteger(0,mid-1);
                r2=randomInteger(mid,max-1);
                let t=arrGC[r1];
                arrGC[r1]=arrGC[r2];
                arrGC[r2]=t;
                // сравниваем с  дедом /текущим идеалом
                 if   (kParent(arr,mid,max)>kParent(arrGC,mid,max)){
                 arr=arrGC.slice();
                }
            }
        }
        }
            // изначально хотел сделати надмасив чтобы делать несколько выборок отец => внук, и добавить проверку детей вдруг и они еффективны
        // но потестил результаты достаточны и так (сколько я не перебирал массивы, в том числе и мой увеличенный в 95% результат идальный)
        // ладно)) 95 не 100 выполним дважды
        const resultData={"set_1":arr.slice(0,mid), "set_2":arr.slice(mid,max)}

       // console.log(resultData); // Проверяем обект с данными после обработки
        //запись файла
        console.log(resultData, ' kParent: ', kParent(arr,mid,max));
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

