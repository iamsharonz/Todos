const form = document.querySelector(".add");
const list = document.querySelector("ul");
const search = document.querySelector(".search input");

const generateTemplate = (todo) => {
  // adds each todos
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>`;

  list.innerHTML += html;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todo = form.add.value.trim(); // this trim method is used to remove the whitespaces both before and after the string

  if (todo.length) {
    // prevents user from adding a null value, i.e if the length of the entered value is positive (min 1) then only the function will be invoked
    generateTemplate(todo);
    form.reset(); // reset the input field of the form after submission, else the content which we have typed in the form will remain their even after submission
  }
});

// delete items

// the main ul tag contains all the li tags, so instead of adding an event listener to all the li tags we can simply add an event listener to the ul tag & from there target the trash can or delete button

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove(); // remove the li tag, which is the parent of the image containing i tag
  }
});

// searching for todos in the search bar

// function for searching the typed term among the todos

const filterTodos = (typedWord) => {

  Array.from(list.children) // here list refer to the ul tag & all the todos, i.e the li tags are the childrens, but this will be displayed as an HTML collection only, so we need to convert it into an array to perform the array methods like forEach(), filter etc
   .filter((todo) => !todo.textContent.toLowerCase().includes(typedWord)) // exclamatory sign is used coz we will get the opposite of it, i.e. we will get the list of todos which doesnt cotains the searched word or letter
   // toLowerCase() is used in this line, coz if a user saves a todo in CAPS & then if he tries to find that todo using small letter then the match wont be showing up due to the strict equality checking in js
   .forEach((todo) => todo.classList.add('filtered')); // arrow functions written without curly braces
      
   // but after removing the typed word/letter the added class i.e. filtered class is not removed, so we need to add one more filter method to it

  Array.from(list.children) 
  .filter((todo) => todo.textContent.toLowerCase().includes(typedWord)) // this filter method will catch the todos which contain the seached word or letter
  .forEach((todo) => todo.classList.remove('filtered'));
};

// on typing each word in the input field the event listener should listen for each. keyup event
search.addEventListener("keyup", () => {
  const typedWord = search.value.trim().toLowerCase(); // toLowerCase is given here as if the user searches for a todo in capitals then that todo wont show up due to the strict equality in js

  filterTodos(typedWord);
});
