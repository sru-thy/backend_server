import { IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";

class UpdateAddressDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    line1: string;
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    line2: string;
    @IsOptional()
    @IsString()
    state: string;
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    country: string;
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    pincode: string;
}

export default UpdateAddressDto;