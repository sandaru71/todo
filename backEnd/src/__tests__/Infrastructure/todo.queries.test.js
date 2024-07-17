const {
  createTodoQuery,
  getTodosQuery,
  getTodosByUserIdQuery,
  getTodoByIdQuery,
  updateTodoQuery,
  deleteTodoQuery,
} = require("../../Infrastructure/todo.queries");

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => ({
    todolist: {
      //   create: jest.fn().mockResolvedValue({
      //     id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      //     task: "sleep",
      //     status: false,
      //     userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
      //   }),
      //   findMany: jest.fn().mockResolvedValue([
      //     {
      //       id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      //       task: "sleep",
      //       status: false,
      //       userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
      //     },
      //     {
      //       id: "51587108-49d8-45a8-8579-825967762416",
      //       task: "test task",
      //       status: true,
      //       userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
      //     },
      //   ]),
      findUnique: jest.fn().mockResolvedValue({
        id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
        task: "sleep",
        status: false,
        userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
      }),
      //   update: jest.fn().mockResolvedValue({
      //     id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      //     task: "sleep",
      //     status: true,
      //     userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
      //   }),
      //   delete: jest.fn().mockResolvedValue({
      //     id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      //     task: "sleep",
      //     status: true,
      //     userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
      //   }),
    },
  })),
}));

describe("Todo queries", () => {
  //   it("should create a todo", async () => {
  //     const todo = await createTodoQuery(
  //       "sleep",
  //       "ef0b1d16-31b1-4af1-b035-3655d08e0959"
  //     );
  //     expect(todo).toEqual({
  //       id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
  //       task: "sleep",
  //       status: false,
  //       userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
  //     });
  //   });

  //   it("should return todos related to the userId", async () => {
  //     const todos = await getTodosByUserIdQuery(
  //       "ef0b1d16-31b1-4af1-b035-3655d08e0959"
  //     );
  //     expect(todos).toEqual([
  //       {
  //         id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
  //         task: "sleep",
  //         status: false,
  //         userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
  //       },
  //       {
  //         id: "51587108-49d8-45a8-8579-825967762416",
  //         task: "test task",
  //         status: true,
  //         userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
  //       },
  //     ]);
  //   });

  //   it("should return all todos", async () => {
  //     const todos = await getTodosQuery();
  //     expect(todos).toEqual([
  //       {
  //         id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
  //         task: "sleep",
  //         status: false,
  //         userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
  //       },
  //       {
  //         id: "51587108-49d8-45a8-8579-825967762416",
  //         task: "test task",
  //         status: true,
  //         userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
  //       },
  //     ]);
  //   });

  it("should return todos by id", async () => {
    const todo = await getTodoByIdQuery("33624921-db8f-48ab-8b04-1e04ade0f0cb");
    console.log("Received todo:", todo);
    expect(todo).toEqual({
      id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      task: "sleep",
      status: false,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    });
  });

  //   it("should update a todo", async () => {
  //     const todo = await updateTodoQuery("33624921-db8f-48ab-8b04-1e04ade0f0cb", {
  //       status: true,
  //     });
  //     expect(todo).toEqual({
  //       id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
  //       task: "sleep",
  //       status: true,
  //       userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
  //     });
  //   });

  //   it("should delete a todo", async () => {
  //     const todo = await deleteTodoQuery("33624921-db8f-48ab-8b04-1e04ade0f0cb");
  //     expect(todo).toEqual({
  //       id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
  //       task: "sleep",
  //       status: true,
  //       userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
  //     });
  //   });
});
