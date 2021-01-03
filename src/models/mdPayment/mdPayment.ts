import { Field, Int, ObjectType } from "type-graphql";
import { Table, Column, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { MdOrder } from "../mdOrder/mdOrder";
import { MdUser } from "../mdUser/mdUser";

@ObjectType()
@Table({ tableName: "mdPayment" })
export class MdPayment extends Model<MdPayment> {
  @Field(() => Int)
  mdPaymentId(): number {
    return this.id;
  }

  @Field()
  @Column
  amount: string;

  @Field()
  @ForeignKey(() => MdUser)
  @Column
  userId: number;

  @Field()
  @ForeignKey(() => MdOrder)
  @Column
  orderId: number;

  @Field(() => MdOrder)
  @BelongsTo(() => MdOrder)
  orders: MdOrder;

  @Field(() => MdUser)
  @BelongsTo(() => MdUser)
  user: MdUser;
}
