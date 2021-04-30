const fs=require ('fs');
const utils =require('util');

function total(arr) {       //сумма ел массива
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

        arr.sort(function(a, b) {//сортируем  массив
            return a - b;
        });
         console.log(arr);

        let arr1=[], arr2=[];       // обявляем наши массивы
        let k=0, j=0;

        if(arr.length % 2 != 0) {   //если массив нечетный отрежем минимальный елемент во второй
            arr2[k++]=arr[0];
            arr.splice(0,1);
        }

      //  console.log('arr1: ', arr1,' j: ',j, ' arr2: ', arr2,' k: ',k);

        for (let i=0; i<parseInt(arr.length/2); i++){ //делим на 2 массива

            if(i % 2 != 0)
            {
                arr2[k++]=arr[i];
                arr2[k++]=arr[arr.length-i-1];
            } else {
                arr1[j++]=arr[i];
                arr1[j++]=arr[arr.length-i-1];
            }
        }
       // console.log('arr1: ', arr1,' j: ',j, ' arr2: ', arr2,' k: ',k);
       let kParent=Math.abs(total(arr1)/total(arr2)-total(arr2)/total(arr1)); //выводим коеф родителя
                  //Делаем еволюцию
        // for (let i=0; i<arr.lengthgth; i++){
        //    // let r1=randomInteger(0,arr1.length);
        //     //let r2=randomInteger(0,arr2.length);
        //     //let t=arr1[r1];
        //     arr1[r1]=arr2[r2];
        //
        //
        // }
        const resultData={"set_1":arr1, "set_2":arr2}

       // console.log(resultData); // Проверяем обект с данными после обработки
        //запись файла
        console.log(resultData, ' kParent: ', kParent);
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
