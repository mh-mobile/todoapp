import { element, render } from "./view/html-util.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";

export class App {
  constructor() {
    this.todoListModel = new TodoListModel();
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");

    this.todoListModel.onChange(() => {
      const todoListView = new TodoListView();
      const todoListElement = todoListView.createElement(
        this.todoListModel.getTodoItems(),
        {
          onUpdateTodo: ({ id, completed }) => {
            this.handleUpdate({ id, completed });
          },
          onDeleteTodo: ({ id }) => {
            this.handleDelete({ id });
          },
        }
      );
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });

    let todoItemCount = 0;
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleAdd(inputElement.value);
      inputElement.value = "";
    });
  }

  handleAdd(title) {
    this.todoListModel.addTodo(
      new TodoItemModel({
        title: title,
        completed: false,
      })
    );
  }

  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
  }

  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id });
  }
}
