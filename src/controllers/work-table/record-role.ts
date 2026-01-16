import { RecordRoleType, WorkTableEntity } from '@prisma/client';
import { prisma } from '../../database';

export async function createRecordRoleByCreateWorkTableResponse(prismaRequest: WorkTableEntity) {
  if (!prismaRequest) return;

  const {
    id: workTableId,
    courseId,
    auxiliarLiturgy,
    auxiliarSecretary,
    bar,
    coupleSafeToBe,
    folkloreCoordinator,
  } = prismaRequest;
  const userRoles = [
    { role: RecordRoleType.auxiliarLiturgy, sourceId: auxiliarLiturgy },
    { role: RecordRoleType.auxiliarSecretary, sourceId: auxiliarSecretary },
    { role: RecordRoleType.bar, sourceId: bar },
    { role: RecordRoleType.coupleSafeToBe, sourceId: coupleSafeToBe },
    { role: RecordRoleType.folkloreCoordinator, sourceId: folkloreCoordinator },
  ];

  if (!prismaRequest) return;

  try {
    await Promise.all(
      userRoles.map(async ({ role, sourceId }) => {
        if (!sourceId) return;

        const participant = await prisma.participant.findFirst({
          where: { OR: [{ recordId: sourceId }, { poslllId: sourceId }] },
        });

        if (!participant) throw new Error(`Participante não encontrado para o id ${sourceId}`);

        await prisma.recordRole.create({
          data: {
            role,
            participantId: participant.id,
            courseId,
            workTableId,
          },
        });
      }),
    );
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}
