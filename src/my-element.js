import { LitElement, html, css } from "lit";

export class ToDoList extends LitElement {
  static properties = {
    _tasks: { state: true },
    hideCompleted: {},
  };

  static styles = css`
    .completed {
      text-decoration-line: line-through;
      color: #777;
    }
  `;

  constructor() {
    super();
    this._tasks = [
      { name: "Drink water", completed: true },
      { name: "Study for the Lit exam", completed: false },
      { name: "Take medicaments", completed: true },
    ];
    this.hideCompleted = false;
  }

  render() {
    const tasks = this.hideCompleted
      ? this._tasks.filter((item) => !item.completed)
      : this._tasks;

    const todos = html`
      <ul>
        ${tasks.map(
          (task) =>
            html`<li
              class=${task.completed ? "completed" : ""}
              @click=${() => this.toggleCompleted(task)}
            >
              ${task.name}
            </li>`
        )}
      </ul>
    `;

    const caughtUpMessage = html` <p>You are all caught up!</p> `;
    const todosOrMessage = tasks.length > 0 ? todos : caughtUpMessage;

    return html`
      <h1>TODO List</h1>
      ${todosOrMessage}
      <input id="newTask" aria-label="New task" placeholder="Insert new task" />
      <button @click=${this.addNewTask}>Add</button>
      <br />
      <label>
        <input
          type="checkbox"
          @change=${this.setHideCompleted}
          ?checked=${this.hideCompleted}
        />
        Hide completed
      </label>
    `;
  }

  toggleCompleted(item) {
    item.completed = !item.completed;
    this.requestUpdate();
  }

  setHideCompleted(event) {
    this.hideCompleted = event.target.checked;
  }

  get input() {
    return this.renderRoot?.querySelector("#newTask") ?? null;
  }

  addNewTask() {
    if (this.input.value.length <= 0) return;
    this._tasks = [
      ...this._tasks,
      { name: this.input.value, completed: false },
    ];
    this.input.value = "";
  }
}

customElements.define("todo-list", ToDoList);
