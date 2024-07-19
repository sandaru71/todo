const {
  signupQuery,
  getUserByEmailQuery,
  getUserByUserIdQuery,
} = require("../../Infrastructure/user.queries");

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => ({
    user: {
      findUnique: jest.fn().mockResolvedValue({
        id: "randomId",
        email: "test@email.com",
        password: "test@123",
        name: "Test User",
      }),
      create: jest.fn().mockResolvedValue({
        id: "randomId",
        email: "test@email.com",
        password: "test@123",
        name: "Test User",
      }),
    },
  })),
}));

describe("User Queries Infrastrcture", () => {
  test("should return user by email", async () => {
    const user = await getUserByEmailQuery("test@email.com");
    expect(user).toEqual({
      id: "randomId",
      email: "test@email.com",
      password: "test@123",
      name: "Test User",
    });
  });
  test("should create a user", async () => {
    const user = await signupQuery("test@email.com", "Test User", "test@123");
    expect(user).toEqual({
      id: "randomId",
      email: "test@email.com",
      password: "test@123",
      name: "Test User",
    });
  });
  test("should find a userById and return user if exists", async () => {
    const user = await getUserByUserIdQuery("randomId");
    expect(user).toEqual({
      id: "randomId",
      email: "test@email.com",
      password: "test@123",
      name: "Test User",
    });
  });
});
