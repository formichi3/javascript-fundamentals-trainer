// UNIT I: ASYNC AND DOM MANIPULATION
// note: please do NOT use the async/await keywords

// EXERCISE 1: Async and callbacks
//  Define a function called writeLater().
// It should take as input a function. After .5s,
// writeLater should write the return value of the
// input function to the <p> element on the page.with
// class name "write-later"

export const writeLater = function(cb) {
  setTimeout(() => {
    document.querySelector("p.write-later").innerHTML = cb();
  }, 500);
};

// EXERCISE 2: Promises, async and callbacks
// Define a function called promisify()
// It should take as input a function.
// It should return a Promise that, after .75s,
// resolves with the return value of the input function.

export const promisify = cb => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cb());
    });
  });
};

// EXERCISE 3: Promises, async, and callbacks
// Define a function called fetchTodos()
// It should fetch a list of todo items from
// https://jsonplaceholder.typicode.com/todos
// and populate the <ul> element on the page
// with 20 <li> elements, each of which contains the `title`
// field of one of the first 20 todos returend by the API.
// note: fetchTodos() must return a promise that is resolved
// after the items have been written.

export const fetchTodos = () => {
  return fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response => response.json())
    .then(json => {
      var innerhtml = "";
      json.slice(0, 20).forEach(item => {
        innerhtml += `<li>${item.title}</li>`;
      });
      document.querySelector("ul").innerHTML = innerhtml;
    });
};

// UNIT II: CONTEXT BINDING AND THE `this` KEYWORD

// The following class is used to fetch data and
// track whether or not the asynchronous call to
// the data source has completed ...

export class Fetcher {
  constructor() {
    this.dataFetched = false;
  }

  fetchData(endpoint) {
    const updateFetchedProp = () => {
      this.dataFetched = true;
    };
    return fetch(endpoint).then(updateFetchedProp);
  }
}

// ... but something is wrong. It fails its test — the
// dataFetched property is not updated as it should be.

// EXERCISE 4: Context binding, code
// edit the code of `fetchData()` so that the test passes
// and the dataFetched property updates correctly.
// note that there are two approaches, and each should
// require a MINIMAL change.

// EXERCISE 5: Context binding, short answer
// In the multline string stored below under the variable
// name `contextBindingResponse`, do your best to articulate
// in your own words your responses to the following
// questions:

// Why did your fix in EXERCISE 4 work? Explain in terms
// of `this` and context binding.

// How are so-called arrow functions different, in their
// treatment of context, than classical JavaScript functions?
// What problem do they solve?

// How does the .bind() method solve the same problem?
// What exactly does .bind() do?

// Finally, are there cases in which we do NOT want to use
//  an arrow function?

export const contextBindingResponse = `
  My solution was to change the inner function, 'updateFetchedProp', from a regular funciton to an arrow funtion.
  This solved the issue of this.dataFetched being undefined, because an arrow function does not have its own 'this' context,
  so when 'this' is referenced, the function looks to the next closest lexigraphical context, which in this case does have a 
  property called 'dataFetched'.
`;

// UNIT III: IMPORTS AND EXPORTS

// EXERCISE 6: Exporting a named export
// Export a *named export* under the name `namedExport1`
// that stores the value 128.

let namedExport1 = 128;

export { namedExport1 };

// EXERCISE 7: Exporting a default export
// Export a default export that stores the value 256.

export default 256;

// EXERCISE 8: Importing a named export
// Import the named export from the provided module
// "otherModule.js". There is no need
// to edit the function provided. It is there for
// testing purposes.

import { namedExport } from "./otherModule";
export const getNamedExport = () => namedExport;

// EXERCISE 9: Importing a default export
// Import the default export fromt he provided module
// "otherModule.js". Import it under the name
// `defaultExportFromOtherModule`. There is no need
// to edit the function provided. It is there for
// testing purposes.

import defaultExportFromOtherModule from "./otherModule.js";

export const getDefaultExport = () => defaultExportFromOtherModule;

// UNIT IV: ES6 SYNTAX
// Because some of these exercises concern implementation,
// not functionality, they do not have tests.
// For those that do not have tests, Galvanize staff
// will review your responses to assess readiness.

// EXERCISE 10: Arrow Functions
// There are at least three syntax variations that are
// possible when using JavaScript arrow functions.
// In the space below, please demonstrate these
// three variations.

// EXERCISE 11: Object destructuring
// In one line, assign each property of the `exampleUser`
// object into its own variable, with the same name
// as the property, using object destructuring
// syntax.

const exampleUser = {
  email: "example@email.com",
  full_name: "User McPerson",
  registered_on: "2019-05-01"
};

let { email, full_name, registered_on } = exampleUser;

console.log(email, full_name, registered_on);

// EXERCISE 12: "Rest" syntax for objects
// In one line, assign the `company_name`, property to
// its own variable, and assign the rest of the
// keys and values, in the object to a new object
// called `company_details`. Use the same object
// from the above exercise.

const exampleCompany = {
  company_name: "Galvanize",
  service: "software training",
  headquarters: "Denver, CO",
  no_employees: 5000
};

let { company_name, ...company_details } = exampleCompany;

console.log(company_name, company_details);

// EXERCISE 13: Array destructuring and "rest" syntax
// for arrays
// In one line, assign the first two names into variables
// called `name1` & `name2`, and assign the remaining
// names as an array into a variable called `otherNames`

const names = [
  "Hans",
  "Lotte",
  "Jane",
  "Willi",
  "Suki",
  "Britt",
  "Adolf",
  "Enrico",
  "Chiang Ching",
  "Lin Tai Yu"
];
let [name1, name2, ...otherNames] = names;

console.log(name1, name2, otherNames);
// EXERCISE 14: Array structuring for variadic function
// behavior
// Define a function called `sum` that can take an
// INDEFINITE number of numerical inputs. That is,
// I can call sum(), sum(1,2), sum(8,100,4,0,-5), etc.
// use the rest/spread operator.

export const sum = (...nums) => {
  let result = 0;
  nums.forEach(num => (result += num));
  return result;
};

//expect 10
console.log(sum(1, 2, 3, 4));

// EXERCISE 15: Array destructuring with the "spread"
// operator
// Javascript's native `Math` module contains a method
// called `.max()`, which gives the maximum of a set
// of variadic inputs passed in as in EXERCISE 14.
// It does NOT work as intended if passed an array.
// Write a function called `arrayMax` which
// takes an array input, destructures that array
// using the spread operator, and passes the resulting
// numbers to Math.max().

export const arrayMax = arr => {
  return Math.max(...arr);
};

//expect 4
console.log(arrayMax([1, 2, 3, 4]));

// EXERCISE 16: variable declarations
// The code below does not work as intended. We want
// the `counters` variable to end up storing the values
// 0 - 4. Instead, we get a curious result.
// Fix this problem by changing no more than one keyword
// in the current code.

const ops = [];
for (let counter = 0; counter < 5; counter++) {
  ops.push(() => counter);
}

export const counters = ops.map(op => op());

// EXERCISE 17: variable declarations, short answer
// In the multline string stored below under the variable
// name `contextBindingResponse`, do your best to articulate
// in your own words your responses to the following
// questions:

// What kind of difference was made by your change to the
// code in EXERCISE 16? Why/how did it fix the problem?

// What is the distinction between var, let and const
// as variable declarations in JavaScript?

export const variableDeclarationsResponse = `
  Math.max(darr)Math.max(darr)Math.max(darr)Math.max(darr)Math.max(darr)Math.max(darr)
  Math.max(darr)Math.max(darr)Math.max(darr)Math.max(darr)Math.max(darr)Math.max(darr)
  Math.max(darr)Math.max(darr)Math.max(darr)Math.max(darr)Math.max(darr)Math.max(darr)
  Math.max(darr)Math.max(darr)Math.max(darr)Math.max(darr)Math.max(darr)Math.max(darr)
`;

//  EXERCISE 18: String template literals
// We'll end on an easy one. Probably the most
// straightforward and arguably the most sought-after
// improvement delivered in the JavaScript ES2015
// specification.
// Demonstrate your understanding of string template
// literals by writing a function called `literally`.
// Given an input string, literally() should return
// a string like "literally <INPUT_STRING>!".
// E.g., "starving" => "literally starving!"

export const literally = input => `literally ${input}!`;
