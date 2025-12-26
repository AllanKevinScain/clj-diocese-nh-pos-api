import { prisma } from '../../database';
import { UserInfertypeSchema } from '../../schemas';
import bcrypt from 'bcryptjs';

export async function upsertManagerUsers() {
  const data: UserInfertypeSchema[] = [
    {
      email: 'capelasantaceciliatc@gmail.com',
      password: 'teste123!',
      loginType: 'manager',
      name: 'Capela Santa Cecília',
      city: 'Três Coroas',
      coName: 'c.SC-TC',
    },
    {
      email: 'saopedrogramado@gmail.com',
      password: 'teste123!',
      loginType: 'manager',
      name: 'São Pedro',
      city: 'Gramado',
      coName: 'SP-GRA',
    },
    {
      email: 'nossasenhoradasgracasnh@gmail.com',
      password: 'teste123!',
      loginType: 'manager',
      name: 'Nossa Senhora das Graças',
      city: 'Novo Hamburgo',
      coName: 'NSG-NH',
    },
    {
      email: 'saopedroapostoloiv@gmail.com',
      password: 'teste123!',
      loginType: 'manager',
      name: 'São Pedro Apóstolo',
      city: 'Ivoti',
      coName: 'SPA-IV',
    },
    {
      email: 'saojorgecampinasl@gmail.com',
      password: 'teste123!',
      loginType: 'manager',
      name: 'São Jorge Campina',
      city: 'São Leopoldo',
      coName: 'SJ-SL',
    },
    {
      email: 'nossasenhoradelurdersgramado@gmail.com',
      password: 'teste123!',
      loginType: 'manager',
      name: 'Nossa Senhora de Lurdes',
      city: 'Gramado',
      coName: 'NSL-GRA',
    },
    {
      email: 'nossasenhoradelurderscanela@gmail.com',
      password: 'teste123!',
      loginType: 'manager',
      name: 'Nossa Senhora de Lurdes',
      city: 'Canela',
      coName: 'NSL-CAN',
    },
  ];

  console.log('Total de itens gestores:', data.length);
  for (const item of data) {
    const hashedPassword = await bcrypt.hash('teste123!', 10);
    const res = await prisma.user.upsert({
      where: { email: item.email },
      update: {},
      create: { ...item, password: hashedPassword },
    });
    console.log('Criado:', res.coName);
  }
  console.log('Usuários gestores criados com sucesso! ✅');
}
