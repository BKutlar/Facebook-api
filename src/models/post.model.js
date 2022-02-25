import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const createOne = async ({ id, message, authorId }) => {
    return prisma.post.create({

        data: {

            message,
            Author: {
                connect: {
                    id: authorId
                }
            }
        },
    });
}


export const findAll = async () => {
    return prisma.post.findMany()
}


export const findById = async (id) => {
    return prisma.post.findUnique({
        where: {
            id
        }
    });
}

export const deleteOne = async (id) => {
    return prisma.post.delete({
        where: { id },
    });
}


export const updateOne = ({ id, message }) => {
    return prisma.post.update({
        where: { id },
        data: {
            message
        }

    })
}