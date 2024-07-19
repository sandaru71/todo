const {
  createTodoService,
  getTodoByIdService,
  getTodosService,
  updateTodoService,
  deleteTodoService,
  getTodosByUserIdService,
} = require("../../Services/todo.services.js");

const {
  getTodos,
  getTodoById,
  getTodosByUserId,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../../Controllers/todo.controller.js");

const { getUserByUserIdService } = require("../../Services/user.services.js");

// const {
//   getTodoByIdService,
//   createTodoService,
// } = require("../../Services/todo.services.js");

jest.mock("../../Services/user.services.js", () => ({
  getUserByUserIdService: jest.fn(),
}));

jest.mock("../../Services/todo.services.js", () => ({
  createTodoService: jest.fn().mockResolvedValue({
    id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
    task: "sleep",
    status: false,
    userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
  }),

  getTodosService: jest.fn().mockResolvedValue([
    {
      id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      task: "sleep",
      status: false,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    },
    {
      id: "47052398-7785-4715-b13c-9609f884d13c",
      task: "eat",
      status: true,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    },
  ]),

  getTodoByIdService: jest.fn().mockResolvedValue([
    {
      id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      task: "sleep",
      status: false,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    },
    {
      id: "47052398-7785-4715-b13c-9609f884d13c",
      task: "eat",
      status: true,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    },
  ]),

  getTodosByUserIdService: jest.fn().mockResolvedValue([
    {
      id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      task: "sleep",
      status: false,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    },
    {
      id: "47052398-7785-4715-b13c-9609f884d13c",
      task: "eat",
      status: true,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    },
  ]),

  updateTodoService: jest.fn().mockResolvedValue({
    id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
    task: "wake up",
    status: true,
    userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
  }),

  deleteTodoService: jest.fn().mockResolvedValue({
    id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
    task: "sleep",
    status: false,
    userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
  }),
}));

describe("todo controller", () => {
  test("getAllTodos --> should return all todos", async () => {
    const req = {};
    const jsonMock = jest.fn();
    const res = {
      json: jsonMock,
      status: jest.fn().mockReturnValueOnce({
        json: jsonMock,
      }),
    };
    await getTodos(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
        task: "sleep",
        status: false,
        userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
      },
      {
        id: "47052398-7785-4715-b13c-9609f884d13c",
        task: "eat",
        status: true,
        userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
      },
    ]);
  });

  test("getTodoById --> should return a todo by id", async () => {
    const req = { params: { id: "33624921-db8f-48ab-8b04-1e04ade0f0cb" } };
    const jsonMock = jest.fn();
    const res = {
      json: jsonMock,
      status: jest.fn().mockReturnValueOnce({
        json: jsonMock,
      }),
    };
    getTodoByIdService.mockResolvedValueOnce({
      id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      task: "sleep",
      status: false,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    });

    await getTodoById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      task: "sleep",
      status: false,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    });
  });

  test("getTodoById --> should return 404 status if todo is not found", async () => {
    const req = { params: { id: "nonexistentId" } };
    const jsonMock = jest.fn();
    const res = {
      json: jsonMock,
      status: jest.fn().mockReturnValueOnce({
        json: jsonMock,
      }),
    };
    getTodoByIdService.mockResolvedValueOnce(null);
    await getTodoById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Todo not found",
    });
  });

  // test("create todo --> should return 400 status if title is not provided", async () => {
  //   const req = { body: {} };
  //   const jsonMock = jest.fn();
  //   const res = {
  //     json: jsonMock,
  //     status: jest.fn().mockReturnValueOnce({
  //       json: jsonMock,
  //     }),
  //   };
  //   await createTodo(req, res);
  //   expect(res.status).toHaveBeenCalledWith(400);
  //   expect(res.json).toHaveBeenCalledWith({
  //     message: "Task is required",
  //   });
  // });

  test("create todo --> should return 401 status if user is not found", async () => {
    const req = { body: { task: "sleep" } };
    const jsonMock = jest.fn();
    const res = {
      json: jsonMock,
      status: jest.fn().mockReturnValueOnce({
        json: jsonMock,
      }),
    };

    await createTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "User not found",
    });
  });

  test("create todo --> should return all todos by user id", async () => {
    const req = {
      body: { task: "sleep" },
      user: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    };
    const jsonMock = jest.fn();
    const res = {
      json: jsonMock,
      status: jest.fn().mockReturnValueOnce({
        json: jsonMock,
      }),
    };

    getUserByUserIdService.mockResolvedValueOnce({
      id: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
      name: "Sandaru",
      email: "sandaru@gmail.com",
    });

    await createTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      task: "sleep",
      status: false,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    });
  });

  test("getTodosByUserId --> should return all todos by user id", async () => {
    const req = {
      body: { task: "sleep" },
      user: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    };
    const jsonMock = jest.fn();
    const res = {
      json: jsonMock,
      status: jest.fn().mockReturnValueOnce({
        json: jsonMock,
      }),
    };

    await getTodosByUserId(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: [
        {
          id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
          task: "sleep",
          status: false,
          userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
        },
        {
          id: "47052398-7785-4715-b13c-9609f884d13c",
          task: "eat",
          status: true,
          userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
        },
      ],
    });
  });

  test("deleteTodo --> should delete a todo", async () => {
    const req = {
      params: { id: "33624921-db8f-48ab-8b04-1e04ade0f0cb" },
    };
    const jsonMock = jest.fn();
    const res = {
      json: jsonMock,
      status: jest.fn().mockReturnValueOnce({
        json: jsonMock,
      }),
    };

    getTodoByIdService.mockResolvedValueOnce({
      id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      task: "sleep",
      status: false,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    });

    await deleteTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: "Todo deleted",
    });
  });

  // test("deleteTodo --> should return 404 status if todo is not found", async () => {
  //   const req = {
  //     params: { id: "33624921-db8f-48ab-8b04-1e04ade0f0cb" },
  //   };
  //   const jsonMock = jest.fn();
  //   const res = {
  //     json: jsonMock,
  //     status: jest.fn().mockReturnValueOnce({
  //       json: jsonMock,
  //     }),
  //   };

  //   getTodoByIdService.mockResolvedValueOnce(null);

  //   await deleteTodo(req, res);
  //   expect(res.status).toHaveBeenCalledWith(404);
  //   expect(res.json).toHaveBeenCalledWith({
  //     message: "Todo not found",
  //   });
  // });

  test("updateStatus --> should update todo status", async () => {
    const req = {
      params: { id: "33624921-db8f-48ab-8b04-1e04ade0f0cb" },
      body: { status: true },
    };
    const jsonMock = jest.fn();
    const res = {
      json: jsonMock,
      status: jest.fn().mockReturnValueOnce({
        json: jsonMock,
      }),
    };

    getTodoByIdService.mockResolvedValueOnce({
      id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      task: "wake up",
      status: false,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    });

    await updateTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: "33624921-db8f-48ab-8b04-1e04ade0f0cb",
      task: "wake up",
      status: true,
      userId: "ef0b1d16-31b1-4af1-b035-3655d08e0959",
    });
  });

  // test("updateTodoStatus --> should return 404 status if todo is not found", async () => {
  //   const req = {
  //     params: { id: "33624921-db8f-48ab-8b04-1e04ade0f0cb" },
  //     body: { status: true },
  //   };
  //   const jsonMock = jest.fn();
  //   const res = {
  //     json: jsonMock,
  //     status: jest.fn().mockReturnValueOnce({
  //       json: jsonMock,
  //     }),
  //   };

  //   getTodoByIdService.mockResolvedValueOnce(null);

  //   await updateTodo(req, res);
  //   expect(res.status).toHaveBeenCalledWith(404);
  //   expect(res.json).toHaveBeenCalledWith({ message: "Todo not found" });
  // });
});
