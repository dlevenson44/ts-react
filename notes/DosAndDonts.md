#### General Types
- Don't ever use the types Number, String, Boolean, Symbol, or Object, as these refer to non-primitive boxed objects that are never used appropriately in JS code
- Instead use types number, string, boolean, symbol, or object
- Don't ever have a generic type that doesn't use its type parameter

#### Callback Types
##### Return Types of Callbacks
- Don't use the return type `any` for callbacks whose values will be ignored
- Do use the return type `void` for callbacks whose values will be ignored
- Why: using `void` is safer because it prevents you from accidentally using the return value of x in an unchecked way
```
// BAD
function fn(x: () => any) {
  x();
}
// GOOD
function fn(x: () => void) {
  x();
}
// WHY IN ACTION
funciton fn(x: () => void) {
  var k = x(); // oops, meant to do something else
  k.doSomething(); //error, but would be okay if the return type had been any
}
```
##### Optional Parameters in Callbacks
- Don't use optional parameters in callbacks unless you really mean it-- the `done` callback might be invoked with 1 argument or with 2 arguments
- Do write callback parameters as non-optional
```
// BAD
interface Fetcher {
  getObject(done: (datA: any, elapsedTime?: number) => void): void;
}
// GOOD
interface Fetcher {
  getObject(done: (data: any, elapsedTime: number) => void): void;
}
```
##### Overloads and Callbacks
- Don't write separate overloads that differ only on callback arity
- Do write a single overload using the maximum arity
- Why: it's always legal for a callback to disregard a parameters so there's no need for shorter overload
- Providing a shorter callback first allows incorrectly-typed functions to be passed in because they match the first overload
```
// BAD
declare function beforeAll(action: () => void, timeout?: number): void;
declare function beforeAll(action: (done: DoneFn) => void, timeout?: number): void;
// GOOD
declare function beforeAll(action: (done: DoneFn) => void, timeout?: number): void;
```
#### Function Overloads
##### Ordering
- Don't put more general overloads before more specific overloads
- Do sort overloads by putting more general signatures after specific signatures
- Why: TS chooses the FIRST MATCHING OVERLOAD when resolving functions-- when an earlier overload is more general than a later one, the later one is effectively hidden and cannot be called
```
// BAD
declare function fn(x: any): any;
declare function fn(x: HTMLElement): number;
declare function fn(x: HTMLDivElement): string;
var myElem: HTMLDivElement;
var x = fn(myElem) //x: any???

// GOOD
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: any): any;

var myElem: HTMLDivElement;
var x = fn(myElem); //x: string :)
```
##### Use Optional Parameters
- Don't write several overloads that only differentiate in trailing parameters
- Do use optional parameters whenever possible-- this collapsing should only occur when all overloads have the same return type
```
// BAD
interface Example {
  diff(one: string): number;
  diff(one: string, two: string): number;
  diff(one: string, two: string, three: boolean): number;
}
// GOOD
interface Example {
  diff(one: string, two?: string, three?: boolean): number;
}
```
- Why: TWO REASONS
1. TS resolves signature compatibility by seeing if any signature of the target can be invoked with the arguments of the source, and extraneous arguments are allowed-- below code exposes a bug only when the signature is correctly written using optional parameters
```
function fn(x: (a: string, b: number, c: number) => void) { }
var x: Example
// when written with overloads OK-- used first overload
// when written with optionals, correctly errors
fn(x.diff)
```
2. When a consumer uses the strict null checking feature... because unspecified parameters appear as undefined in JS, it's usually okay to pass an explicit undefined to a function with optional arguments.  Below example would be OK under strict nulls
```
var x: Example;
// when written with overloads, incorrectly error because of passing undefined to string
// when written with optionals, correctly is OK
x.diff("something", true ? undefined : "hour");
```
##### Use Union Types
- Don't write overloads that differ by type in only one argument position
- Do use union types whenever possible
```
// BAD
interface Moment {
  utcOffset(): number;
  utsOffset(b: number): moment;
  utcOffset(b: string): moment;
}
// GOOD
// note: we don't make b optional because the return types of the signatures differ
interface Moment {
  utcOffset(): number;
  utcOffset(b: number|string): Moment;
}
```
- Why: important for people passing through a value to your function
```
function fn(x: string): void;
function fn(x: number): void;
function fn(x: number|string) {
  //when written with separate overloads incorrectly errors
  // when written with union types correctly is OK
  return moment().utcOffset(x);
}
```