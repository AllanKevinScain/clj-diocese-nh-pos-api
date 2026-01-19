import bcrypt from 'bcryptjs';

import { prisma } from '@/database';
import type { UserInfertypeSchema } from '@/schemas';

export async function upsertBuilderManagerUsers() {
  const data: UserInfertypeSchema[] = [
    {
      email: 'montagem2026@gmail.com',
      password: 'teste123!',
      loginType: 'builder-manager',
      name: 'Montagem 2026',
      city: 'Novo Hamburgo',
      coName: 'JC',
    },
  ];

  console.log('Total de itens montagem:', data.length);
  for (const item of data) {
    const hashedPassword = await bcrypt.hash('teste123!', 10);
    const res = await prisma.user.upsert({
      where: { email: item.email },
      update: {},
      create: { ...item, password: hashedPassword },
    });
    console.log('Criado:', res.coName);
  }
  console.log('Usuários para o montagem criados com sucesso! ✅');
}
