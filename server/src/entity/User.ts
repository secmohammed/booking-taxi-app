import { hash } from "bcryptjs";
import {
    Entity,
    ObjectIdColumn,
    Column,
    ObjectID,
    BaseEntity,
    BeforeInsert
} from "typeorm";
@Entity("users")
export class User extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column("varchar", { length: 255, unique: true })
    email: string;

    @Column()
    password: string;
    @Column("boolean", { default: false })
    confirmed: boolean;
    @BeforeInsert()
    async hashedPassword() {
        this.password = await hash(this.password, 10);
    }
}
