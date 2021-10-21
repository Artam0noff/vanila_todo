const _todos = [];
const storageName = 'todos';
let length = 0;

const addTodo = (_task = undefined,_isDone = false) => {

    let textItem = _task || document.getElementById('todoText').value;
    if(textItem){
        let todoList = document.getElementById('todos');
        let todoItem = document.createElement("LI");
        todoItem.className = 'task';
        todoItem.index = length++;

        let isDone=document.createElement("input");
        isDone.type="checkbox";
        isDone.className = 'is-done';
        isDone.checked = _isDone;

        let textSpan = document.createElement('span');
        textSpan.className = _isDone?'done':'text-wrapper';
        let secondActionSpan = document.createElement('span');
        secondActionSpan.className = 'option-wrapper';



        let deleteItem = document.createElement('img');
        deleteItem.src = 'img/delete.png';

        deleteItem.className = 'delete-button';

        todoList.appendChild(todoItem);

        let todoText = document.createTextNode(textItem);
        textSpan.appendChild(todoText);

        secondActionSpan.appendChild(isDone);
        secondActionSpan.appendChild(deleteItem);

        todoItem.appendChild(textSpan);
        todoItem.appendChild(secondActionSpan);

        // todoItem.appendChild(todoText);
        // todoItem.appendChild(isDone);
        // todoItem.appendChild(deleteItem);
        document.getElementById('todoText').value = '';

        _todos.push({
            task:_task || textItem,
            isDone:_isDone,
        })
        console.log(_todos);
        localStorage.setItem(storageName, JSON.stringify(_todos));
    }

}

function onPageLoaded() {

    const data = JSON.parse(localStorage.getItem(storageName));
    console.log(data);
    try {
        data.forEach(element => {
            addTodo(element.task,element.isDone);
        });
    } catch (error) {
        console.log(error);
    }

    
    const input = document.querySelector("input[type='text']");
    let todoList = document.getElementById('todos');
    
    
    todoList.onclick = function(event){
        if (event.target.className !== 'delete-button' && 
        event.target.className !== 'is-done') return;
        
        if(event.target.className === 'delete-button') {
            let todoLi = event.target.closest('li');
            let index = todoLi.index;
            _todos.splice(index,1);
            length -= 1;
            todoLi.remove();
            let todos = todoList.children;
            for(let i = 0; i < length; i++){
                todos[i].index = i;
            }

            localStorage.setItem(storageName, JSON.stringify(_todos));

        }

        if(event.target.className === 'is-done' || event.target.className === 'option-wrapper'){

                let checked = event.target.checked;
                let todoLi = event.target.closest('li');

                _todos[todoLi.index].isDone = !_todos[todoLi.index].isDone;
                console.log(_todos);
 
                let textSpan =  todoLi.querySelector('.text-wrapper')  || todoLi.querySelector('.done');
                textSpan.className = 'done';
                if(!checked){textSpan.className = "text-wrapper";}

                localStorage.setItem(storageName, JSON.stringify(_todos));
        }
    }

    input.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            addTodo();
        }
    });
}

document.addEventListener("DOMContentLoaded", onPageLoaded);