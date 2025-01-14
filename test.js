setTimeout(() => console.log("A"), 10000);
setTimeout(() => console.log("B"), 0);

let promise1 = new Promise(() => {
  console.log("C");
});

promise1.then(() => {
  console.log("D");
});

let promise2 = new Promise(() => {
  console.log("E");

  fetch("https://jsonplaceholder.typicode.com/todos/1").then(() => console.log("F"));

  console.log("G");
});
