import prisma from "../../utils/PrismaClient";

import { Request, Response } from "express";

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, password } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ message: "bugdiig bugluh шаардлагатай." });
      return;
    }
    if (!email) {
      res.json({ message: "И-мэйл оруулна уу." });
      return;
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ message: "Энэ и-мэйл бүртгэлтэй байна." });
      return;
    }
    if (!name) {
      res.json({ message: "Нэр оруулна уу." });
      return;
    }
    if (!password) {
      res.json({ message: "Нууц үг оруулна уу." });
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    if (!newUser) {
      res.status(500).json({ message: "Хэрэглэгч үүсгэхэд алдаа гарлаа." });
      return;
    }
    res.status(201).json({
      message: "Хэрэглэгч амжилттай үүсгэгдлээ.",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    })
  } catch (error) {
    console.error("Алдаа:", error);
    res.status(500).json({ message: "Серверийн алдаа." });
  }
};

export default createUser;
