import { IsNotEmpty, IsString } from "class-validator";

export default class UpdateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
