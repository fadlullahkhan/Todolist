const addActivity = document.querySelector("#add-activity");
const ov = document.querySelector(".overlay");
const activityList = document.querySelector(".activity-list");
let aktivitas = [];

document.addEventListener("DOMContentLoaded", () => {
  king();
  if (localStorage.getItem("activity") != undefined) {
    aktivitas = JSON.parse(localStorage.getItem("activity"));
  }else {
    aktivitas = [];
  }
  renderData();
});

addActivity.addEventListener("submit", e => {
  const textValue = document.querySelector("#activity-input");
  let todosData = [];
  
  e.preventDefault();
  const newActivity = objActivity(textValue.value, generateID());
  ov.classList.remove("show");
  
  aktivitas.push(newActivity);
  localStorage.setItem("activity", JSON.stringify(aktivitas));
  localStorage.setItem(textValue.value, JSON.stringify(todosData));
  
  renderData();
  textValue.value = "";
});

const renderData = () => {
  const data = JSON.parse(localStorage.getItem("activity"));
  const kosong = `<div class="kosong">Di sini masih kosong!</div>`;
  let dataList = "";
  
  if(data != "" && data != undefined){
    for (let d of data) {
      const amountItem = JSON.parse(localStorage.getItem(d.name));
      dataList = dataList + `<li class="list" id="${d.id}"><span class="fas fa-folder list-icon"></span><span class="description"><span class="tl-title">${d.name}</span><span class="amount">${amountItem.length} todolist</span></span><span class="fi-br-trash btn"></span></li>`;
    }
    activityList.innerHTML = dataList;
  }else {
    activityList.innerHTML = kosong;
  }
  
}

activityList.addEventListener("click", e => {
  if (e.target.classList.contains("list") || e.target.classList.contains("fas") || e.target.classList.contains("description")) {
    let titleText;
    if (e.target.classList.contains("list")) {
      titleText = e.target.childNodes[1].childNodes[0].textContent;
    }else if (e.target.classList.contains("fas")) {
      titleText = e.target.nextSibling.childNodes[0].textContent;
    }else if (e.target.classList.contains("description")) {
      titleText = e.target.childNodes[0].textContent;
    }
    
    const todosTitle = todos.querySelector(".tl");
    todosTitle.textContent = titleText;
    
    renderTodos();
    openTodos();
  }
  
  if(e.target.classList.contains("fi-br-trash")){
    const tl = document.querySelectorAll(".tl-title")
    const i = aktivitas.findIndex(a => {
      return a.id == e.target.parentElement.id
    });
    const strgName = tl[i].textContent;
    const cfrm = confirm("Hapus aktivitas ini?");
    if (cfrm == true) {
      localStorage.removeItem(strgName);
      aktivitas.splice(i, 1)
      localStorage.setItem("activity", JSON.stringify(aktivitas));
      renderData();
    }
  }
});

const addTodo = document.getElementById("add-todo");
const todosTitle = document.querySelector(".todos .tl");

addTodo.addEventListener("submit", e => {
  e.preventDefault();
  const todoInput = document.getElementById("todo-input");
  
  const newTodos = objTodos(todoInput.value, generateTime(), false);
  todosData.push(newTodos);
  localStorage.setItem(todosTitle.textContent, JSON.stringify(todosData));
  renderTodos();
  todoInput.value = "";
});

const todos = document.querySelector(".todos");
const todoUl = todos.querySelector(".todo-list");
  
const renderTodos = () => {
  const todosTitle = todos.querySelector(".tl");
  const text = todosTitle.textContent;
  const data = JSON.parse(localStorage.getItem(text));
  
  if (data != undefined && data != "") {
      todosData = data
  } else {
      todosData = [];
  }
  
  let undone = "",done = "";
  const kosong = `<div class="kosong">Di sini masih kosong!</div>`;
  
  if (data != "" && data != undefined) {
    for (let td of data) {
      if(td.isDone == false){
        undone = undone + `<li><span class="fas fa-lightbulb list-icon"></span><span class="description"><span class="tl-title">${td.name}</span><span class="time">${td.time}</span></span><span class="fi fi-br-check btn"></span></li>`
      }else {
        done = done + `<li class="done"><span class="fas fa-lightbulb list-icon"></span><span class="description"><span class="tl-title">${td.name}</span><span class="time">${td.time}</span></span><i>Selesai</i></li>`
      }
    }
    todoUl.innerHTML = undone + done;
  } else {
    todoUl.innerHTML = kosong;
  }
}

todoUl.addEventListener("click", e => {
  const check = e.target.classList.contains("fi-br-check");
  const todosTitle = todos.querySelector(".tl");
  const text = todosTitle.textContent;
  if (check) {
    let i = todosData.findIndex(x => x.name == e.target.previousSibling.childNodes[0].textContent)
    todosData[i].isDone = true;
    localStorage.setItem(text, JSON.stringify(todosData));
    renderTodos();
  }
})

const objActivity = (name, id) => {
  return {
    name: name,
    id: id
  }
}

const objTodos = (name, time, isDone) => {
  return {
    name: name,
    time: time,
    isDone: isDone
  }
}

const generateTime = () => {
  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }
  const t = new Date();
  const jam = addZero(t.getHours());
  const mnt = addZero(t.getMinutes());
  
  return `${jam}:${mnt}`
}

const generateID = () => {
  return + new Date();
}

const addBtn = document.querySelector("#add-btn");
const cancelBtn = document.querySelector(".cancel");

addBtn.addEventListener("click", () => {
  ov.classList.add("show");
});

cancelBtn.addEventListener("click", el => {
  ov.classList.remove("show")
});

const openTodos = () => {
  todos.classList.add("show")
}

const closeTodos = document.getElementById("close-todos");

closeTodos.addEventListener("click", () => {
  todos.classList.remove("show");
  renderData();
  todosData = [];
});

const nightModeBtn = document.getElementById("nm-btn");

nightModeBtn.addEventListener("click", () => {
  if (nightModeBtn.classList.contains("fi-br-sun")) {
    localStorage.setItem("nightMode", true);
  } else {
    localStorage.setItem("nightMode", false);
  }
  king();
});

const king = () => {
  const data = JSON.parse(localStorage.getItem("nightMode"));
  const r = document.querySelector(":root");
  if (data == true) {
    nightModeBtn.classList.remove("fi-br-sun");
    nightModeBtn.classList.add("fi-br-moon");
    r.style.setProperty("--bg", "#000");
    r.style.setProperty("--bg2", "#1b1c1e");
    r.style.setProperty("--clr", "#ffffff");
    r.style.setProperty("--bdr", "rgba(255, 255, 255, .5");
    r.style.setProperty("--lightI", "#000");
    r.style.setProperty("--darkI", "#fff");
  } else {
    nightModeBtn.classList.remove("fi-br-moon");
    nightModeBtn.classList.add("fi-br-sun");
    r.style.setProperty("--bg", "#f0f0f0");
    r.style.setProperty("--bg2", "#ffffff");
    r.style.setProperty("--clr", "#000000");
    r.style.setProperty("--bdr", "rgba(0, 0, 0, .5");
    r.style.setProperty("--lightI", "#fff");
    r.style.setProperty("--darkI", "#000");
  }
}