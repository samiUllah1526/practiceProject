import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpRequest } from 'express';
import { PostDto, UpdatePostDto } from './dto/post.dto';
import { Post as PostEntity } from './post.entity';
import { PostsService } from './posts.service';
@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) { }


    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createPost(@Body() post: PostDto, @Request() req): Promise<PostEntity> {
        return await this.postService.createPost(post, req.user.id)

    }

    @Get()
    async findAll(): Promise<PostEntity[]> {
        return await this.postService.findAll()
    }


    @Get(":id")
    async findById(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
        const post = await this.postService.findById(id)

        if (!post) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        return post
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(":id")
    async updatePost(@Param('id', ParseIntPipe) id: number, @Body() post: UpdatePostDto, @Request() req): Promise<{ id: number }> {
        const { numberOfAffectedRows, postID } = await this.postService.UpdatePost(id, req.user.id, post)
        // console.log("post2===>", post2)
        // const { numberOfAffectedRows, updatedPost } = post2

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        return { id: id }

    }


    @UseGuards(AuthGuard('jwt'))
    @Delete(":id")
    async deletePost(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<{ id: number }> {
        const deleted = await this.postService.DeletePost(id, req.user.id)
        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        return { id }

    }

    @UseGuards(AuthGuard('jwt'))
    @Get("user/:id")
    async getPostsByUser(@Param('id', ParseIntPipe) id: number) {
        const posts = await this.postService.getPostsByUser(id)
        // if (deleted === 0) {
        //     throw new NotFoundException('This Post doesn\'t exist');
        // }

        // return { id }
        return { posts }

    }
}
