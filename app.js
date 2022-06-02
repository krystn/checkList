const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const list = document.querySelector('#todoList');
const completed = document.querySelector('#completed');
const doneCount = document.querySelector('#doneCount');
const todoCount = document.querySelector('#todoCount');

// function to count list items
function countLis(ulName) {
    let i = 0;
    let liCount = 0;
    while (ulName.getElementsByTagName('li') [i++]) liCount++;
    return liCount;
}

// event listener for clicking "add" button
form.addEventListener('submit', function (e) {
    e.preventDefault(); // prevent default

    // only adds to the list if input is not blank
    if (input.value === '') {
        alert('You must write something.');
        return;
    }
    
    // build list element with checkbox, input and delete
    const li = document.createElement('li');
    const text = input.value;

    const checkbox = document.createElement('input');
    checkbox.classList.add('checkbox');
    checkbox.type = 'checkbox';

    const item = document.createElement('p');
    item.classList.add('item');
    item.innerText = text;

    const remove = document.createElement('span');
    remove.classList.add('remove');
    remove.innerHTML = '&#9747;';

    li.append(checkbox);
    li.append(item);
    li.append(remove);

    list.append(li);

    // updates todo count
    todoCount.innerText = countLis(list);

    // returns input to default
    input.value = '';
    
    // is it better to have event listener inside an event 
    // listener or a function?
    // event listener for toggling the checkbox
    checkbox.addEventListener('change', function() {
        if(this.checked) {
            item.classList.add('completedItem');
            completed.append(li);
            doneCount.innerText = countLis(completed);
            todoCount.innerText = countLis(list);
        } else {
            list.append(li);
            item.classList.toggle('completedItem');
            doneCount.innerText = countLis(completed);
            todoCount.innerText = countLis(list);
        }
    })

    // for loop to remove list item
    const currentTodo = document.querySelectorAll('.remove');
    for(let i = 0; i < currentTodo.length; i++) {
        currentTodo[i].onclick = function () {
            this.parentNode.remove();
            doneCount.innerText = countLis(completed);
            todoCount.innerText = countLis(list);
        }
    }

    // count number of completed list items
    const completedLis = document.getElementById('completed').getElementsByTagName('li');

    if(countLis(completed) > 0){
        completed.classList.add('listBorder');
    } else {
        return;
    }
});




