import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const signupQuery = async (email, name, password) => {
  return prisma.user.create({
    data: {
      email: email,
      name: name,
      password: password,
    },
  });
};

export const getUserByUserIdQuery = async (Id) => {
  return prisma.user.findUnique({
    where: {
      id: Id,
    },
  });
};

export const getUserByEmailQuery = async (email) => {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};
