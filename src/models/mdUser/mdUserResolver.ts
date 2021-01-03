import { sequelize } from "../../sequelize";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { MdUser } from "./mdUser";
import { MdOrder } from "../mdOrder/mdOrder";
import { MdShop } from "../mdShop/mdShop";
import { MdUserInput } from "./mdUserType";

@Resolver()
export class MdUserResolver {
  private readonly mdUserRepository = sequelize.getRepository(MdUser);
  private readonly mdOrderRepository = sequelize.getRepository(MdOrder);
  private readonly mdShopRepository = sequelize.getRepository(MdShop);

  @Query(() => MdUser)
  async getMdUser(@Arg("id") id: number): Promise<MdUser | null> {
    return await this.mdUserRepository.findByPk(id, {
      include: [this.mdOrderRepository, this.mdShopRepository],
    });
  }

  @Query(() => [MdUser])
  async getMdUsers(): Promise<MdUser[] | null> {
    return await this.mdUserRepository.findAll({
      include: [this.mdOrderRepository, this.mdShopRepository],
    });
  }

  @Mutation(() => MdUser)
  async createMdUser(
    @Arg("user") mdUserInput: MdUserInput
  ): Promise<MdUser | null> {
    const newMdUser = await (
      await this.mdUserRepository.create(mdUserInput)
    ).save();
    console.log("New user created", newMdUser);
    return newMdUser;
  }

  @Mutation(() => Int)
  async updateMdUser(
    @Arg("newUser") mdUserInput: MdUserInput,
    @Arg("userId") userId: string
  ): Promise<number | null> {
    const result = await this.mdUserRepository.update(mdUserInput, {
      where: { id: userId },
    });
    console.log("Result ===>", result);
    return result[0];
  }
}
