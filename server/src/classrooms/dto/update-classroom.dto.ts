import { IsNotEmpty } from "class-validator";

export class UpdateClassroomDto {
    @IsNotEmpty()
    building: string;

    @IsNotEmpty()
    capacity: number;

    comments: string;

    @IsNotEmpty()
    type: string;

    school: string;

    entrance: string;

    currenDiv: string;

    administrator: string;

    @IsNotEmpty()
    status: string;
}
