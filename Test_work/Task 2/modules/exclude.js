module.exports.func = func;


function func(Data, sortBy) {
   // console.log(sortBy);

    for (let i = Data.length; i--; ) {
        for (const [key, value] of Object.entries(Data[i]))
        { for (const [k, v] of Object.entries(sortBy))
            if ((key===k)&&(v===value))
                Data.splice(i, 1);
            //console.log(Data[i] );

        }}

}


