import { prisma } from '../../database';
import { PoslllInfertypeSchema } from '../../schemas';

export async function upsertPoslll() {
  const data: PoslllInfertypeSchema[] = [
    {
      candidateName: 'Jose Otávio',
      parishChapel: 'SP-GRA',
      instagram: '@jose',
      courseOne: '1',
      courseTwo: '2',
      courseThree: '3',
      formations: '12234',
    },
    {
      candidateName: 'Mackelly',
      parishChapel: 'NSG-NH',
      instagram: '@mack',
      courseOne: '1',
      courseTwo: '2',
      courseThree: '3',
      formations: '12234',
    },
    {
      candidateName: 'Allan Kevin',
      parishChapel: 'c.SC-TC',
      instagram: '@allan',
      courseOne: '1',
      courseTwo: '2',
      courseThree: '3',
      formations: '12234',
    },
    {
      candidateName: 'Ivan',
      parishChapel: 'SPA-IV',
      instagram: '@ivan',
      courseOne: '1',
      courseTwo: '2',
      courseThree: '3',
      formations: '12234',
    },
    {
      candidateName: 'Indiara',
      parishChapel: 'SJ-SL',
      instagram: '@indy',
      courseOne: '1',
      courseTwo: '2',
      courseThree: '3',
      formations: '12234',
    },
    {
      candidateName: 'Giovanna',
      parishChapel: 'NSL-GRA',
      instagram: '@Gih',
      courseOne: '1',
      courseTwo: '2',
      courseThree: '3',
      formations: '12234',
    },
    {
      candidateName: 'Tios Taiane e Agostinho',
      parishChapel: 'NSL-CAN',
      instagram: '@agostinho',
      instagramWoman: '@tay',
      courseOne: '1',
      courseTwo: '2',
      courseThree: '3',
      formations: '12234',
      isCouple: true,
    },
    {
      candidateName: 'Tios Nica e Alexandre',
      parishChapel: 'SP-GRA',
      instagram: '@alexandre',
      instagramWoman: '@nica',
      courseOne: '1',
      courseTwo: '2',
      courseThree: '3',
      formations: '12234',
      isCouple: true,
    },
  ];

  console.log('Total de itens pós lll:', data.length);
  await prisma.poslll.createMany({
    data,
  });
  console.log('Pós lll criados com sucesso! ✅');
}
