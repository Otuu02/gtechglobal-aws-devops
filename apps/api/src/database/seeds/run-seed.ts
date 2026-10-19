import 'reflect-metadata';
import { AppDataSource } from '../data-source';

async function run() {
  console.log('🌱 Seeding database...');
  await AppDataSource.initialize();
  await AppDataSource.destroy();
  console.log('✅ Seed complete.');
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
