import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const createTodoQuery = async ({ task }) => {
    try {
        const newList = await prisma.todolist.create({
            data: {
                id: uuidv4(),
                task,
                status: false
            }
        });
        return newList;
    } catch (error) {
        throw new Error("Internal Server Error");
    }
};

export const getTodosQuery = async () => {
    try{
            const todos = await prisma.todolist.findMany();
            return todos;
        }catch (error) {
            throw new Error("Internal Server Error");
        }
}

export const getTodoByIdQuery = async (id) => {
    try {
        const todo = await prisma.todolist.findUnique({
            where: {
                id: id
            }
        });
        return todo;
    }catch (error) {
        throw new Error("Internal Server Error");
    }
}

export const updateTodoQuery = async (id, status) => {
    try {
        const updatedTodo = await prisma.todolist.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        });
        return updatedTodo;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error");
    }
}

export const deleteTodoQuery = async (id) => {
    try {
        await prisma.todolist.delete({
            where: {
                id: id
            }
        });
        return { data: "todo deleted"};
    } catch (error) {
        throw new Error("Internal Server Error");
    }
}