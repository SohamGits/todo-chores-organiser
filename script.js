document.addEventListener('DOMContentLoaded', function() {
  // Section configs
  const sections = [
    { input: 'work-task', button: 'work-add', list: 'work-list' },
    { input: 'home-task', button: 'home-add', list: 'home-list' },
    { input: 'misc-task', button: 'misc-add', list: 'misc-list' }
  ];

  function createTodoItem(text, completed = false) {
    const li = document.createElement('li');
    li.className = 'todo-item' + (completed ? ' completed' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', function() {
      li.classList.toggle('completed', checkbox.checked);
      if (checkbox.checked) {
        li.style.transition = 'opacity 0.4s';
        li.style.opacity = '0';
        setTimeout(() => li.remove(), 400);
      }
    });

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.innerHTML = '&times;';
    delBtn.title = 'Delete task';
    delBtn.addEventListener('click', function() {
      li.classList.add('removing');
      li.style.transition = 'opacity 0.3s';
      li.style.opacity = '0';
      setTimeout(() => li.remove(), 300);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    return li;
  }

  // Attach logic for each section
  sections.forEach(({ input, button, list }) => {
    const inputEl = document.getElementById(input);
    const addBtn = document.getElementById(button);
    const todoList = document.getElementById(list);

    function addTask() {
      const text = inputEl.value.trim();
      if (text) {
        const item = createTodoItem(text);
        todoList.appendChild(item);
        inputEl.value = '';
        inputEl.focus();
      } else {
        inputEl.classList.add('shake');
        setTimeout(() => inputEl.classList.remove('shake'), 400);
      }
    }

    addBtn.addEventListener('click', addTask);
    inputEl.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') addTask();
    });
  });
});
