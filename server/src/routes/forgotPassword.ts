import { getMongoRepository, MongoRepository } from "typeorm";
import { redis } from "../services/redis";
import { User } from "../entity/User";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    const { token, password } = req.params;
    const id = await redis.get(token);
    if (!id) {
        return res.status(422).json({
            message: "Invalid token has been passed."
        });
    }
    const userRepository: MongoRepository<User> = getMongoRepository(User); // or connection.getMongoManager
    const user = (await userRepository.findOne(id)) as User;
    user.password = password;
    await user.save();
    await redis.del(token);

    return res.status(200).json({
        message: "account has been confirmed successfully."
    });
};
