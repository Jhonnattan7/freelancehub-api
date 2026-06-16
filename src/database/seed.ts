import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { Service } from '../services/service.entity';
import * as dotenv from 'dotenv';

// Cargamos el .env para poder leer las variables de conexión a la BD
dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '1234',
  database: process.env.DB_NAME || 'freelancehub',
  entities: [User, Service],
  synchronize: true, // Esto obliga a que se creen las tablas antes de insertar
});

async function runSeed() {
  try {
    await AppDataSource.initialize();
    console.log('Conexión a la base de datos establecida correctamente.');

    const userRepository = AppDataSource.getRepository(User);

    const usersToInsert = [
      { name: 'Ana López', email: 'ana@mail.com', password: '1234' },
      { name: 'Carlos Rivas', email: 'carlos@mail.com', password: '5678' },
      { name: 'Jhonnatan Peñate', email: 'jhonnatan@mail.com', password: '1234' },
    ];

    for (const userData of usersToInsert) {
      const userExists = await userRepository.findOneBy({ email: userData.email });
      if (!userExists) {
        const user = userRepository.create(userData);
        await userRepository.save(user);
        console.log(`Usuario insertado exitosamente: ${userData.name}`);
      } else {
        console.log(`El usuario ${userData.name} ya existía en la base de datos.`);
      }
    }

    console.log('Seed finalizado con éxito.');
  } catch (error) {
    console.error('Error durante la ejecución del seed:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

runSeed();
