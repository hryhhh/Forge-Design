import { IsString, IsObject, IsNotEmpty } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  formName!: string

  @IsObject()
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  values!: Record<string, any>
}
