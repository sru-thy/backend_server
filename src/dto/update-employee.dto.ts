import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { Address } from "../entity/address.entity";
import { Type } from "class-transformer";
import UpdateAddressDto from "./update-address.dto";
import { Role } from "../utils/role.enum";

class UpdateEmployeeDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  username: string;
  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  address: Address;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  joiningDate : string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  experience : number;
}

export default UpdateEmployeeDto;
