const { signUp, signIn } = require("../../Controllers/user.controller");
const {
  getUserByEmailService,
  signUpService,
} = require("../../Services/user.services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../Services/user.services");

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signUp", () => {
    it("should create a new user when all required fields are provided", async () => {
      const req = {
        body: {
          email: "test@example.com",
          name: "Test User",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      getUserByEmailService.mockResolvedValueOnce(null);
      signUpService.mockResolvedValueOnce({
        id: "randomId",
        email: "test@example.com",
        name: "Test User",
      });

      await signUp(req, res);

      expect(getUserByEmailService).toHaveBeenCalledWith("test@example.com");
      expect(signUpService).toHaveBeenCalledWith(
        "test@example.com",
        "Test User",
        "password123"
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "User created successfully",
      });
    });

    it("should return 400 status and message when required fields are missing", async () => {
      const req = {
        body: {
          // Missing email, name, password
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await signUp(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: 0,
        message: "Missing required fields",
      });
    });

    it("should return 400 status and message when email already exists", async () => {
      const req = {
        body: {
          email: "test@example.com",
          name: "Test User",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      getUserByEmailService.mockResolvedValueOnce({
        email: "test@example.com",
      });

      await signUp(req, res);

      expect(getUserByEmailService).toHaveBeenCalledWith("test@example.com");
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: 0,
        message: "Email already exists",
      });
    });
  });

  describe("signIn", () => {
    it("should sign in a user with correct credentials", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockUser = {
        email: "test@example.com",
        password: bcrypt.hashSync("password123", 10),
        username: "TestUser",
      };

      getUserByEmailService.mockResolvedValueOnce(mockUser);
      bcrypt.compareSync.mockReturnValueOnce(true);
      jwt.sign.mockReturnValueOnce("mocked.token.string");

      await signIn(req, res);

      expect(getUserByEmailService).toHaveBeenCalledWith("test@example.com");
      expect(bcrypt.compareSync).toHaveBeenCalledWith(
        "password123",
        mockUser.password
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { user: { email: "test@example.com", username: "TestUser" } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: 1,
        message: "User logged in successfully",
        token: "mocked.token.string",
        username: "TestUser",
      });
    });

    it("should return 400 status and message when required fields are missing", async () => {
      const req = {
        body: {
          // Missing email, password
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await signIn(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: 0,
        message: "Missing required fields",
      });
    });

    it("should return 401 status and message when email does not exist", async () => {
      const req = {
        body: {
          email: "nonexistent@example.com",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      getUserByEmailService.mockResolvedValueOnce(null);

      await signIn(req, res);

      expect(getUserByEmailService).toHaveBeenCalledWith(
        "nonexistent@example.com"
      );
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: 0,
        message: "Email or password is incorrect",
      });
    });

    it("should return 401 status and message when passwords do not match", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "wrongpassword",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockUser = {
        email: "test@example.com",
        password: bcrypt.hashSync("password123", 10),
      };

      getUserByEmailService.mockResolvedValueOnce(mockUser);
      bcrypt.compareSync.mockReturnValueOnce(false);

      await signIn(req, res);

      expect(getUserByEmailService).toHaveBeenCalledWith("test@example.com");
      expect(bcrypt.compareSync).toHaveBeenCalledWith(
        "wrongpassword",
        mockUser.password
      );
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: 0,
        message: "Email or password is incorrect",
      });
    });
  });
});
