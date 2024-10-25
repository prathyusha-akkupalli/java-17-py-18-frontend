// Objects

let user = {
    id: 1,
    name: "Akhil",
    email: "akhil@gmail.com",
    mobile: "9876543210",
    isVerified: false,
    lastLogin: Date(),
};

user.name = "Akhil B";
delete user.lastLogin;
// console.log(user);

// function myFunction(a, b, ...rest) {
//     console.log("Function Called", a, b, rest);

// }

// let myNewFunc = function (a, b, ...rest) {
//     console.log("Function Called", a, b, rest);

// }

// let myNewFunc = (a, b, ...rest) => {
//     console.log("Function Called", a, b, rest);
// }

// myNewFunc(1, 2)

let add = a => a ** 2;
let res = add(3);
console.log(res);