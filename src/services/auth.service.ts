import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { RegisterInput } from "@/validations/auth";

export async function registerUser(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });

    return user;
}

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
}

export async function comparePassword(
    password: string,
    hashedPassword: string
) {
    return bcrypt.compare(password, hashedPassword);
}