import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicController } from './public.controller';
import { Service } from '../services/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [PublicController],
})
export class PublicModule {}
