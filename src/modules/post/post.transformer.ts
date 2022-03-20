import { Inject, Injectable } from "@nestjs/common"
import UserTransformer from "../user/user.transformer"
import { Post } from "./entities/post.entity"

@Injectable()
export class PostTransformer {

    @Inject() private readonly userTransformer: UserTransformer

    postsToPublicEntity(post: Post[], currentUserId: number) {
        return post.map(post => {
            const { user, likes, ...rest } = post
            return { ...rest, totalLike: likes.length, didLike: likes.find(user => user.id === currentUserId) ? true : false, user: this.userTransformer.user(user) }
        })
    }

    postToPublicEntity(post: Post, currentUserId: number) {
        const { user, likes, ...rest } = post
        return { ...rest, totalLike: likes.length, didLike: likes.find(user => user.id === currentUserId) ? true : false, user: this.userTransformer.user(user) }
    }
}