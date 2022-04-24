import { IsNotEmpty, MinLength } from 'class-validator';
import { PartialType, PickType } from "@nestjs/swagger"
import { ApiProperty } from '@nestjs/swagger';
export class PostDto {
    @ApiProperty()
    @IsNotEmpty({
        message: "Post title should not be empty"
    })
    @MinLength(4)
    readonly title: string;

    @IsNotEmpty({
        message: "Post body should not be empty"
    })
    @ApiProperty()
    readonly body: string;
}

export class UpdatePostDto extends PartialType(PostDto) { }
// export class PostIdDto extends PickType(PostDto, ['age'] as const) { }