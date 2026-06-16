import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiBearerAuth() // Añadimos esto para que Swagger sepa que requiere token
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createServiceDto: CreateServiceDto, @Request() req) {
    const userId = req.user.userId;
    return this.servicesService.create(createServiceDto, userId);
  }
}
