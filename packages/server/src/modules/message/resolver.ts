import {
    Resolver,
    Ctx,
    Arg,
    Mutation,
    Authorized,
    Subscription,
    Root,
    PubSub,
    Publisher
} from "type-graphql"
import { Message } from "../../entity/Message"
import { MyContext } from "../../types/Context"
import { getMessageRepository, MessageRepository } from "../../repositories/MessageRepository"
  
@Resolver(Message)
export class MessageResolver {

    private _repository: MessageRepository

    constructor() {
        this._repository = getMessageRepository()
    }
  
    @Authorized()
    @Mutation(() => Message)
    async sendMessage(
        @Arg("text") text: string, 
        @Ctx() ctx: MyContext,
        @PubSub("MESSAGE.CREATED") publish: Publisher<Message>
    ) {
        const message = await this._repository.create();
        const user = await ctx.userLoader.load(ctx.userId)

        message.user = user
        message.text = text
        message.createdAt = new Date(Date.now())

        await this._repository.save(message)
        await publish(message)

        return message
    }

    @Authorized()
    @Subscription({ topics: "MESSAGE.CREATED"})
    showMessages(
        @Root() msgPayload: Message,
    ): Message {
        return msgPayload
    }
}