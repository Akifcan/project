import { Inject, Injectable } from "@nestjs/common"
import UserTransformer from "../user/user.transformer"
import { Post } from "./entities/post.entity"

@Injectable()
export class PostTransformer {

    @Inject() private readonly userTransformer: UserTransformer

    postsToPublicEntity(post: Post[]) {
        return post.map(post => {
            const { user, ...rest } = post
            return { ...rest, user: this.userTransformer.user(user) }
        })
    }
}