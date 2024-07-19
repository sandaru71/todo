const {
  signUpService,
  getUserByUserIdService,
  getUserByEmailService,
} = require("../../Services/user.services"); // Adjust the path as necessary

const {
  signupQuery,
  getUserByUserIdQuery,
  getUserByEmailQuery,
} = require("../../Infrastructure/user.queries"); // Ensure correct import path

jest.mock("../../Infrastructure/user.queries", () => ({
  signupQuery: jest.fn(),
  getUserByUserIdQuery: jest.fn(),
  getUserByEmailQuery: jest.fn(),
}));

describe("User Service", () => {
  describe("signUpService", () => {
    it("should sign up a new user", async () => {
      const email = "test@example.com";
      const name = "Test User";
      const password = "password123";

      // Mock signupQuery to return a user object
      signupQuery.mockResolvedValue({
        id: "12345",
        email,
        name,
        hashedPassword: "hashedpassword123",
      });

      const newUser = await signUpService(email, name, password);
      expect(newUser).toEqual({
        id: "12345",
        email,
        name,
        hashedPassword: "hashedpassword123",
      });
    });

    it("should throw an error when signupQuery fails", async () => {
      signupQuery.mockRejectedValue(new Error("Database connection failed"));

      await expect(
        signUpService("test@example.com", "Test User", "password123")
      ).rejects.toThrowError("Database connection failed");
    });
  });

  describe("getUserByUserIdService", () => {
    it("should get user by userId", async () => {
      const userId = "12345";

      // Mock getUserByUserIdQuery to return a user object
      getUserByUserIdQuery.mockResolvedValue({
        id: userId,
        email: "test@example.com",
        name: "Test User",
        hashedPassword: "hashedpassword123",
      });

      const user = await getUserByUserIdService(userId);
      expect(user).toEqual({
        id: userId,
        email: "test@example.com",
        name: "Test User",
        hashedPassword: "hashedpassword123",
      });
    });

    it("should throw an error when getUserByUserIdQuery fails", async () => {
      getUserByUserIdQuery.mockRejectedValue(new Error("User not found"));

      await expect(getUserByUserIdService("12345")).rejects.toThrowError(
        "User not found"
      );
    });
  });

  describe("getUserByEmailService", () => {
    it("should get user by email", async () => {
      const email = "test@example.com";

      // Mock getUserByEmailQuery to return a user object
      getUserByEmailQuery.mockResolvedValue({
        id: "12345",
        email,
        name: "Test User",
        hashedPassword: "hashedpassword123",
      });

      const user = await getUserByEmailService(email);
      expect(user).toEqual({
        id: "12345",
        email,
        name: "Test User",
        hashedPassword: "hashedpassword123",
      });
    });

    it("should throw an error when getUserByEmailQuery fails", async () => {
      getUserByEmailQuery.mockRejectedValue(new Error("User not found"));

      await expect(
        getUserByEmailService("test@example.com")
      ).rejects.toThrowError("User not found");
    });
  });
});
