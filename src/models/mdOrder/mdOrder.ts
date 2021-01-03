import { Field, Int, ObjectType } from "type-graphql";
import {
  Table,
  Column,
  Model,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { MdUser } from "../mdUser/mdUser";
import { MdItem } from "../mdItem/mdItem";
import { MdOrderItem } from "../mdOrderItem/mdOrderItem";

@ObjectType()
@Table({ tableName: "mdOrder" })
export class MdOrder extends Model<MdOrder> {
  @Field(() => Int)
  mdOrderId(): number {
    return this.id;
  }

  @Field()
  @Column
  code: string;

  @Field()
  @ForeignKey(() => MdUser)
  @Column
  userId: number;

  @Field()
  @Column
  status: string;

  @Field(() => [MdItem])
  @BelongsToMany(() => MdItem, () => MdOrderItem)
  items: MdItem[];

  @BelongsTo(() => MdUser)
  mdUser: MdUser;
}
