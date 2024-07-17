const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const signupQuery = async (email, name, password) => {
  return prisma.user.create({
    data: {
      email: email,
      name: name,
      password: password,
    },
  });
};

const getUserByUserIdQuery = async (Id) => {
  return prisma.user.findUnique({
    where: {
      id: Id,
    },
  });
};

const getUserByEmailQuery = async (email) => {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

module.exports = {
  signupQuery,
  getUserByUserIdQuery,
  getUserByEmailQuery,
};
