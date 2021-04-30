// // let a=[1,2,3];
// // let b=a;
// // b.push(4)
// // let c=[1,2,3,4];
// //
// // console.log('a',a);
// // console.log('b',b);
// // console.log(a==b);
// // console.log(a==c);
// let result=[]
// for (var i=0; i<5; i++)
//     (function (){
//         var j=i
//         result.push(function () {console.log(j)});
//
//     })()
// result[1]()
//
// function Cat( name, color) {
//     this.color = color;
//     this.name = name;
// }
// // const cat= new Cat('red',"tom");
// // console.log(cat)
// Cat.prototype.voice = function () {
//     console.log(`Cat ${this.name} says may`)
// }
//
// const cat = new Cat ('Tom','whihte')
// cat.voice();
// console.log(Cat.prototype)

function Person() {
}
Person.prototype.legs=2
Person.prototype.color='white'

const  person=new Person();
person.name = 'sdasd'
 console.log(person, ' ',person.legs )

