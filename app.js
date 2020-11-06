const form = document.querySelector('form');
const todos = document.querySelector('#todos');
let todoTasks = JSON.parse(localStorage.getItem('todos')) || [];
todoTasks.forEach(todo => {
    addToList(todo);
});

lastID = todoTasks.length;
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTodo = {
        text: e.target.todotext.value,
        date: dayjs().format('YYYY-MM-DD hh:mm:ss A'),
        id: lastID++
    }
    todoTasks.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todoTasks));
    addToList(newTodo);
    e.target.todotext.value = null;
});

function addToList(todo) {
    let todoContainer = document.createElement('div');
    let todoText = document.createElement('p');
    let todoDate = document.createElement('small');

    todoContainer.classList.add('todo');
    todoText.classList.add('todoText');
    todoDate.classList.add('todoDate');

    todoContainer.dataset.containerid = todo.id;
    todoContainer.id = "id_" + todo.id;
    todoContainer.dataset.id = todo.id;
    todoText.dataset.id = todo.id;
    todoDate.dataset.id = todo.id;
    todoText.innerText = todo.text;
    todoDate.innerText = todo.date;

    todoContainer.appendChild(todoText);
    todoContainer.appendChild(todoDate);
    todoContainer.addEventListener('click', (e) => {
        removeTask(e.target.dataset.id);
    });
    todos.prepend(todoContainer);
}

function removeTask(taskId) {
    todoTasks = todoTasks.filter(task => task.id != taskId);
    localStorage.setItem('todos', JSON.stringify(todoTasks));
    todos.removeChild(document.querySelector(`#id_${taskId}`));
}