import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity'; // Adjust the path based on your project structure

export async function seedUsers(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);

  const existingUser = await userRepository.findOne({ where: { email: 'admin@example.com' } });

  if (!existingUser) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('admin123', saltRounds);

    const adminUser = userRepository.create({
      username: 'admin',
      email: 'admin@example.com',
      password_hash: hashedPassword,
      role: 'admin',
      full_name: 'Admin User',
      business_name: 'Market O\'Clock',
    });

    await dataSource.manager.save(adminUser);
    console.log('Admin user seeded successfully!');
  } else {
    console.log('Admin user already exists.');
  }
}