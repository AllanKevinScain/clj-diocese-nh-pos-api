import { prisma } from '../database';
import { upsertPoslll } from './poslll';
import { upsertAdminsUsers, upsertBuilderManagerUsers, upsertManagerUsers } from './users';

async function main() {
  console.log('🌱 Iniciando seed...');
  await Promise.all([
    await upsertAdminsUsers(),
    await upsertManagerUsers(),
    await upsertBuilderManagerUsers(),
    await upsertPoslll(),
  ]);
  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch((err) => {
    console.error('❌ Erro no seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Conexão com o banco encerrada.');
  });
