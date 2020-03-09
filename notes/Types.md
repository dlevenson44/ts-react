# Typescript Notes
### Data Types
- Boolean: `let isDone: boolean = false;`
- Number: all numbers in TS are floating point values- floating point numbers get type number- TS supports hexadecimal, decimal, binary, and octal literals
```
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```
- Strings accepts single or double quotes or backticks:
```
let color: string = "blue";  color = 'red';
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello my name is ${ fullName }, I'll be ${ age + 1 } years old next month`;
```
- Arrays can be written in one of two ways, both ways you specify that it is an array and the element types of that array
```
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```
- Tuple types let you express an array with a fixed number of elements whose types are known, but don't need to be the same
- We need to declare the array element type in the same order in which we expect the data to be received
- ie declare string then number if you expect a string then a number in the tuple
- Can access element with a known index the correct type is retrieved
- Accessing an element outside the set of known indices fails with an error
```
// declare tuple type
let x: [string, number];
// initialize it properly
x = ["hello", 10]
// initialize it incorrectly
x = [10, "hello"]
// Accessing element with known index type
console.log(x[0].substring(1)) // This works because the first array element is a string
console.log(x[1].substring(1)) // This fails because the second array element in a number
// Accessing non-existent index
x[3] = "world"; // Error property '3' does not exist
console.log(x[5].toString()); // Error property '5' doesn't exist
```
- Enum gives more friendly names to sets of numeric values
- Enums begin numbering their members at 0 by default, this can be manually changed-- can also manually assign index to each value
- Enums can go from numeric value to the name of the value in the enum
- ie- we have value of 2 but don't know what that maps to in Color, can look up the name
```
enum Color {Red, Green, Blue}
let c: Color = Color.green;
// change the start numbering
enum Color {Red = 1, Green, Blue}
// set index number for each member
enum Color {Red = 1, Green = 2, Blue = 4}
// looking up the name of value 2
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];
console.log(colorName)  //value is 'Green' as a string
```
- Any describes type of variables when we don't know the type!
- This could be used when working with dynamic content... this allows us to opt-out of type checking and let values pass through compile-time checks
- Any is a powerful way to work with existing JS, allowing you to gradually opt-in and out of type checking during compilation
- Any type is handy if you know some part of the type but not all of it, such as an array with a mix of types
```
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; //All of these are valid because notSure has the type of any assigned to it
// mixed types array
let list: any[] = [1, "two", true]
list[1] = 100;  //valid because we have any set to element types
```
- Void is the opposite of Any: absence of having any type at all-- commonly used as return type of functions that don't return a value
- Declaring variables with void means you can only assign  them undefined and, if `strictNullChecks` isn't specified, null
```
// function not returning a value
function warnUser(): void {
  console.log("This is my warning message");
}
let unusable: void = undefined;
unusable = null; // ok
unusable = false; // not ok
```
- Null and Undefined have their own named types, similar to void, not much use on their own
- Null and Undefined are subtypes of all other types by default-- meaning you can assign them to another type such as a string or a number
- When using the `strictNullChecks` flag, null and undefined are only assignable to any and their respective types
- Using the flag helps avoid common errors
- In cases where you to pass either a string, null, or undefined, you can use the union type of `string | null | undefined`
```
let u: undefined = undefined;
let n: null = null;
```
- Never type represents thet type of values that never occur
- IE, never is the return type for a function expression or arrow expression that always throws an exception OR one that never returns
- Variables also get the never type when narrowed by the type guards that can never be true
- Never is a subtype of, and assignable to every tpye, BUT no type is a subtype of, or assignable to, never-- ANY isn't assignable to NEVER
- Funcitons returning never below:
```
// function returning never must have unreachable end point
function error(message: string): never {
  throw new Error(message);
}
// inferred return type is never
function fail() {
  return error("something failed");
}
// function returning never must have unreachable end point
function infiniteLoop(): never {
  while (true) {}
}
```
- Object/Any Crossover:  Object type only allows you to assign any value to them... cannot call arbitrary methods on them, even ones that exist
- Avoid using Object in favor of non-primitive object type
```
let notSure: any = 4;
notSure.ifItExists(); // ifItExists might exist at runtime
notSure.toFixed(); //toFixed exists (compiler doesn't check though)

let prettySure: Object = 4;
prettySure.toFixed() //Error toFixed doesn't exist on type Object
```
- object (different from Object with capital 'o') represents non-primitive type (ie anything that is not a number, string, bool, bigint, symbol, nul, or undefined)
- With object type, we can better represent apis like Object.create
```
declare function create(o: object | null): void;

create({ prop: 0});  // ok
create(null);  // ok

// errors below because of type mismatch
create(42) //num
create("string") //string
create(false) //bool
create(undefined) //undefined
```
- Type Assertions tell the compiler "I know more than you"-- used when we know more about a value than TypeScript does
- IE when you know the type of some entity could be more specific than its current type
- Type Assertion is a type cast in other languages, but performs no special checking or restructuring of data
- Has no runtime impact and is only used by the compiler
- Type assertions uses two different forms, angle-bracket syntax and as-syntax
##### We can only use as-syntax when using TypeScript with JSX!!!!!!
```
// angle-bracket syntax
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
// as-syntax
let otherValue: any = "this is a different string";
let newStrLength: number = (otherValue as string).length;
```
