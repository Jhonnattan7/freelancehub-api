import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../services/service.entity';

@Controller('public')
export class PublicController {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  @Get('services')
  async getServices() {
    const services = await this.serviceRepository.find({
      relations: ['provider'],
    });

    return services.map(service => ({
      id: service.id,
      title: service.title,
      category: service.category,
      price: service.price,
      provider: service.provider ? service.provider.name : 'Desconocido',
    }));
  }
}
