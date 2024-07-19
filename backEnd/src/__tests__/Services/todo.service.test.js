const {
  getTodosService,
  getTodoByIdService,
  getTodosByUserIdService,
  updateTodoService,
  deleteTodoService,
  createTodoService,
} = require("../../Services/todo.services");

const {
  createTodoQuery,
  getTodosQuery,
  getTodosByUserIdQuery,
  getTodoByIdQuery,
  updateTodoQuery,
  deleteTodoQuery,
} = require("../../Infrastructure/todo.queries");

jest.mock("../../Infrastructure/todo.queries.js", () => ({
  createTodoQuery: jest.fn().mockResolvedValue({
    id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
    task: "sleep",
    status: false,
    userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
  }),

  getTodosQuery: jest.fn().mockResolvedValue([
    {
      id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      task: "sleep",
      status: false,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    },
    {
      id: "51587108-49d8-45a8-8579-825967762416",
      task: "test task",
      status: true,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    },
  ]),

  getTodoByIdQuery: jest.fn().mockResolvedValue({
    id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
    task: "sleep",
    status: false,
    userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
  }),

  getTodosByUserIdQuery: jest.fn().mockResolvedValue([
    {
      id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      task: "sleep",
      status: false,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    },
    {
      id: "51587108-49d8-45a8-8579-825967762416",
      task: "test task",
      status: true,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    },
  ]),

  updateTodoQuery: jest.fn().mockResolvedValue({
    id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
    task: "sleep",
    status: true,
    userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
  }),

  deleteTodoQuery: jest.fn().mockResolvedValue({
    id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
    task: "sleep",
    status: false,
    userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
  }),
}));

describe("Todo Service", () => {
  it("should create a new todo", async () => {
    const newTodo = await createTodoService(
      "sleep",
      "ef0b1d16-31b1-4af1-b035-3655d08e0959"
    );
    expect(newTodo).toEqual({
      id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      task: "sleep",
      status: false,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    });
  });

  it("should throw an error when createTodoQuery fails", async () => {
    const task = "Buy groceries";
    const userId = "user123";
    const mockError = new Error("Database error");

    createTodoQuery.mockRejectedValueOnce(mockError);

    await expect(createTodoService(task, userId)).rejects.toThrow(mockError);
  });

  it("should get all todos", async () => {
    const todos = await getTodosService();
    expect(todos).toEqual([
      {
        id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
        task: "sleep",
        status: false,
        userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
      },
      {
        id: "51587108-49d8-45a8-8579-825967762416",
        task: "test task",
        status: true,
        userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
      },
    ]);
  });

  it("should get a todo by id", async () => {
    const todo = await getTodoByIdService(
      "33624921-db8f-48ab-8b04-1e04ade0f0cb"
    );
    expect(todo).toEqual({
      id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      task: "sleep",
      status: false,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    });
  });

  it("should get todos by user id", async () => {
    const todos = await getTodosByUserIdService(
      "ef0b1d16-31b1-4af1-b035-3655d08e0959"
    );
    expect(todos).toEqual([
      {
        id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
        task: "sleep",
        status: false,
        userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
      },
      {
        id: "51587108-49d8-45a8-8579-825967762416",
        task: "test task",
        status: true,
        userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
      },
    ]);
  });

  it("should update a todo", async () => {
    const updatedTodo = await updateTodoService(
      "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      "sleep",
      true
    );
    expect(updatedTodo).toEqual({
      id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      task: "sleep",
      status: true,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    });
  });

  it("should delete a todo", async () => {
    const todoId = "33624921-db8f-48ab-8b04-1e04ade0f0cb";
    const result = await deleteTodoService(todoId);
    expect(result).toEqual({
      data: "Todo deleted",
    });
  });
});
