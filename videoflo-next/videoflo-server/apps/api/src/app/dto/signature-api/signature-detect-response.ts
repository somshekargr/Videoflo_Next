import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class SignatureDetectResponseDTO {
    @ApiProperty()
    success: boolean;

    @ApiPropertyOptional()
    errorCode: number;

    @ApiPropertyOptional()
    errorMessage: string;

    @ApiProperty()
    image: string;

}