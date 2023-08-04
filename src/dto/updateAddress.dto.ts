import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

class UpdateAddressDto {
    @IsNotEmpty()
    @IsString()
    line1: string;
    @IsNotEmpty()
    @IsString()
    pincode: string;
}

export default UpdateAddressDto;