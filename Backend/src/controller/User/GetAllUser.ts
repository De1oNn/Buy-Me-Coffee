import { Request, Response } from "express";
import prisma from "../../utils/PrismaClient"

const getAllUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const Users = await prisma.user.findMany({
            include: {
                profile: true,
            }
        })
        res.status(200).json(Users);
    } catch (error) {
        res.status(500).json({ message: "Серверийн алдаа" });
        console.error("Алдаа:", error);
    }
}
export default getAllUser;