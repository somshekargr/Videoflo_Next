import { ApiProperty } from '@nestjs/swagger';


export class SignatureDetectRequestDTO {
    @ApiProperty()
    image: string;
}