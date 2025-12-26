import { prisma } from '../../database';
import { UserInfertypeSchema } from '../../schemas';
import bcrypt from 'bcryptjs';

export async function upsertAdminsUsers() {
  const data: UserInfertypeSchema[] = [
    {
      email: 'padrejosefrancisco@gmail.com',
      password: 'teste123!',
      loginType: 'admin',
      name: 'Padre José Francisco',
      city: 'Novo Hamburgo',
      coName: 'JC',
    },
    {
      email: 'joseotavio@gmail.com',
      password: 'teste123!',
      loginType: 'admin',
      name: 'José Otávio',
      city: 'São Pedro',
      coName: 'JC',
    },
    {
      email: 'mackelly@gmail.com',
      password: 'teste123!',
      loginType: 'admin',
      name: 'Mackelly',
      city: 'Novo Hamburgo',
      coName: 'JC',
    },
  ];

  console.log('Total de itens administradores:', data.length);
  for (const item of data) {
    const hashedPassword = await bcrypt.hash('teste123!', 10);
    const res = await prisma.user.upsert({
      where: { email: item.email },
      update: {},
      create: { ...item, password: hashedPassword },
    });
    console.log('Criado:', res.name);
  }
  console.log('Usuários administradores criados com sucesso! ✅');
}
