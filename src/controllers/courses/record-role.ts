import { Course, RecordRoleType } from '@prisma/client';
import { prisma } from '../../database';

export async function createRecordRoleByCreateCourseResponse(prismaRequest: Course) {
  if (!prismaRequest) return;

  const {
    id: courseId,
    auxiliar,
    base,
    coordinator,
    coupleKitchenCoordinator,
    liturgy,
    secretary,
    kitchenSpiritual,
  } = prismaRequest;

  const userRoles = [
    { role: RecordRoleType.auxiliar, sourceId: auxiliar },
    { role: RecordRoleType.base, sourceId: base },
    { role: RecordRoleType.coordinator, sourceId: coordinator },
    { role: RecordRoleType.coupleKitchenCoordinator, sourceId: coupleKitchenCoordinator },
    { role: RecordRoleType.liturgy, sourceId: liturgy },
    { role: RecordRoleType.secretary, sourceId: secretary },
    { role: RecordRoleType.kitchenSpiritual, sourceId: kitchenSpiritual },
  ];

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
          },
        });
      }),
    );
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}
