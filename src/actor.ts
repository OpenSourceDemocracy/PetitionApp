// import {BaseRoom,PubSubMessage} from "./room";
// // import {Ipfs} from "./ipfs";


// class Actor {

//   constructor(public peerId:ipfs.PeerId) {

//   }

//   public ping(message: PubSubMessage){

//   }

//   public pong(message: PubSubMessage) {
    
//   }


// }

// interface Message {
//   from:ipfs.PeerId;
//   method:string;
//   args:any
// }

// type FunctionName  = string | symbol;
// type Instance = [Function, Object];



// class Room {

//   static methods:Map<FunctionName, Instance> = new Map<FunctionName, Instance>();

//   static logMethod(target: Object, propertyKey: FunctionName, descriptor: TypedPropertyDescriptor<any>){
//       // save a reference to the original method this way we keep the values currently in the
//       // descriptor and don't overwrite what another decorator might have done to the descriptor.
//       if(descriptor === undefined) {
//         descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) as TypedPropertyDescriptor<any>;
//       }
//       var originalMethod = descriptor.value;
//       debugger;


//       //editing the descriptor/value parameter
//       descriptor.value =  function()  {
//           var args = [];
//           for (var _i = 0; _i < arguments.length; _i++) {
//               args[_i - 0] = arguments[_i];
//           }
//           var a = args.map(function (a) { return JSON.stringify(a); }).join();
//           // note usage of originalMethod here

//           Room.methods.set(propertyKey, [originalMethod, this])
//           var result = originalMethod.apply(this, args);
//           var r = JSON.stringify(result);
//           console.log("Call: " + (propertyKey as string) + "(" + a + ") => " + r);
//           return result;
//       };

//       // return edited descriptor as opposed to overwriting the descriptor
//       return descriptor;
//   }

//   static triggerMethod(name:FunctionName, args:Array<any>) {
//     if (Room.methods.has(name)){
//       debugger;
//       var x = Room.methods.get(name);
//       let fn = x![0];
//       let obj = x![1];
//       return fn.apply(obj, args)
//   }

//   }
// }


// let r = new Room();
// debugger;
// class Person {

//   public name: string;
//   public surname: string;

//   constructor(name : string, surname : string) {
//     this.name = name;
//     this.surname = surname;
//   }

//   @Room.logMethod
//   public saySomething(something : string, somethingElse : string) : string {
//     return this.name + " " + this.surname + " says: " + something + " " + somethingElse;
//   }
// }

// var p = new Person("remo", "jansen");
// p.saySomething("I love playing", "halo");
// console.log(Room.triggerMethod("saySomething", ["I love you", "Opal"]));
