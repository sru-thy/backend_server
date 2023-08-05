import { IsNotEmpty, IsString } from "class-validator";

export class UpdateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
