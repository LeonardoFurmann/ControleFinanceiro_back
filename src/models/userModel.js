import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async () => {
    return await prisma.user.findMany();
}

const findUserById = async(id) => {
    return await prisma.user.findUnique({
      where: {id: parseInt(id)},
    });
}

const postUser = async (user) => {
     await prisma.user.create({
        data:{
            name: user.name,
            email: user.email,
            password: user.password
        }
    })
}

const updateUser = async(id, user) => {
    return await prisma.user.update({
        where: {id: parseInt(id)},
        data : user,
    })
}

const deleteUser = async(id) => {
    return await prisma.user.delete({
        where: {id: parseInt(id)},
    })
}

const findUserByEmail = async(email) => {
    return await prisma.user.findUnique({
      where: {email},
    });
}

const userModel = {
    getUsers,
    postUser,
    findUserByEmail,
    updateUser,
    findUserById,
    deleteUser
};

export default userModel;
