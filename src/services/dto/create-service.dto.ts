import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'Diseño de logo profesional', description: 'El título del servicio' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Diseño', description: 'La categoría a la que pertenece' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'Creación de logo vectorial desde cero', description: 'Descripción detallada del servicio' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 150.00, description: 'Precio estimado en dólares' })
  @IsNumber()
  @Min(0)
  price: number;
}
