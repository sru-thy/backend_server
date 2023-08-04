import { IsEmail, IsNotEmpty, IsObject, IsString, ValidateIf, ValidateNested } from "class-validator";
import { Address } from "../entity/address.entity";
import { Type } from "class-transformer";
import UpdateAddressDto from "./updateAddress.dto";

class UpdateEmployeeDto {
   @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => UpdateAddressDto)
    address: Address;
}

export default UpdateEmployeeDto;