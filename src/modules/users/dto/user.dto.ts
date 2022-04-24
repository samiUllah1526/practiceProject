import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsEmpty } from "class-validator";



export class UserDto {
    @ApiProperty()
    @IsString({
        message: "Please provide the name"
    })
    readonly name: string;


    @ApiProperty()
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;

    @ApiProperty()
    @IsString()
    readonly password: string;

    @ApiProperty()
    @IsString({ message: "Please provide the gender" })
    readonly gender: string;
}