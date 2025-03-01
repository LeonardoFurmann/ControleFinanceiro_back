const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getUsers = async () => {
    return await prisma.user.findMany();
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


module.exports = { getUsers, postUser };