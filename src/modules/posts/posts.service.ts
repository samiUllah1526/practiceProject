import { Get, Inject, Injectable } from '@nestjs/common';
import { POST_REPOSITORY } from "./../../core/constants"
import { Post as PostEntity } from "./post.entity"
import { User as UserEntity } from "./../users/user.entity"
import { PostDto, UpdatePostDto } from './dto/post.dto';


@Injectable()
export class PostsService {
    constructor(@Inject(POST_REPOSITORY) private readonly postRepository: typeof PostEntity) { }

    async createPost(post: PostDto, userId: number) {
        return await this.postRepository.create<PostEntity>({ ...post, userId })
    }

    async findAll(): Promise<PostEntity[]> {
        return await this.postRepository.findAll<PostEntity>({
            include: [{ model: UserEntity, attributes: { exclude: ['password'] } }],
        })
    }

    async findById(id: number): Promise<PostEntity> {
        console.log("id==>", id)
        return await this.postRepository.findOne({
            where: {
                id: id
            },
            include: [{ model: UserEntity, attributes: { exclude: ['password'] } }],
        })
    }

    async UpdatePost(id: number, userId: number, postData: UpdatePostDto): Promise<{ numberOfAffectedRows: number, postID: number }> {
        console.log("total payload passed to repo", { ...postData })
        const updatedPostObj = await this.postRepository.update({ ...postData }, {
            where: { id, userId },
            // returning: true
        })

        const [numberOfAffectedRows] = updatedPostObj
        return { numberOfAffectedRows, postID: id }
        // const [numberOfAffectedRows, [updatedPost]] = updatedPostObj
        // return { numberOfAffectedRows, updatedPost }
    }

    async DeletePost(id: number, userId: number) {
        const deleted = await this.postRepository.destroy({
            where: { id, userId }
        })

        console.log("deleted=>", deleted)
        return deleted
    }

    async getPostsByUser(userId: number): Promise<PostEntity[]> {
        let data = await this.postRepository.findAll({
            where: { userId }
        })

        console.log("allposts=>", data[0])
        console.log("allposts[0]=>", data[0]['dataValues'])

        const posts = data.map((post) => {
            return post['dataValues']
        })

        console.log("posts==>", posts)
        return posts
    }

}
