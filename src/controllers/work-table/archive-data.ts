/* import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';
import { CourseNumberSchema } from '../../schemas';

import { concat, isEmpty } from 'lodash';
import { RecordType } from '../../types';
import { Prisma, WorkTableEntity } from '@prisma/client';

type RecordEntityType = Prisma.RecordEntityGetPayload<{
  include: { recordCouple: true; recordPOSl: true; recordPOSll: true; recordWork: true };
}>;

async function cleanWorkRecordsFormatData(prismaRequest: WorkTableEntity) {
  const callMapCleanWorkRecords: any[] = []; // prismaRequest?.cleanWorkRecords.map((recordId: string) => getWorkRepository(recordId ?? '')) ||
  const cleanWorkRecords = await Promise.all(callMapCleanWorkRecords);
  return cleanWorkRecords.map((record: RecordEntityType | null) => {
    const typeOfRecord = record?.typeOfRecord as RecordType;
    if (typeOfRecord === 'COUPLE_WORK') {
      return `Tios ${record?.candidateName} e ${record?.recordCouple?.womanName} - ${record?.parishChapel}`;
    }
    return `${record?.candidateName} - ${record?.parishChapel}`;
  });
}

async function copeWorkRecordsFormatData(prismaRequest: WorkTableEntity) {
  const callMapCopeWorkRecords: any[] = []; // prismaRequest?.copeWorkRecords.map((recordId: string) => getWorkRepository(recordId ?? '')) ||
  const copeWorkRecords = await Promise.all(callMapCopeWorkRecords);
  return copeWorkRecords.map((record: RecordEntityType | null) => {
    const typeOfRecord = record?.typeOfRecord as RecordType;
    if (typeOfRecord === 'COUPLE_WORK') {
      return `Tios ${record?.candidateName} e ${record?.recordCouple?.womanName} - ${record?.parishChapel}`;
    }
    return `${record?.candidateName} - ${record?.parishChapel}`;
  });
}

async function kitchenWorkRecordsFormatData(prismaRequest: WorkTableEntity) {
  const callMapKitchenWorkRecords: any[] = [];
  // prismaRequest?.kitchenWorkRecords.map((recordId: string) =>
  //   getWorkRepository(recordId ?? ''),
  // )
  const kitchenWorkRecords = await Promise.all(callMapKitchenWorkRecords);
  return kitchenWorkRecords.map((record: RecordEntityType | null) => {
    const typeOfRecord = record?.typeOfRecord as RecordType;
    if (typeOfRecord === 'COUPLE_WORK') {
      return `Tios ${record?.candidateName} e ${record?.recordCouple?.womanName} - ${record?.parishChapel}`;
    }
    return `${record?.candidateName} - ${record?.parishChapel}`;
  });
}

type CorrectCommunitiesWithRecordsType = Prisma.WorkTableEntityGetPayload<{
  include: { communities: { include: { members: true } } };
}>;
type CommunityType = Prisma.CommunityGetPayload<{
  include: { members: true };
}>;
type MemberType = Prisma.CommunityMemberGetPayload<{}>;

async function correctCommunitiesWithRecordsFormatData(
  prismaRequest: CorrectCommunitiesWithRecordsType,
) {
  const communitiesMembers = prismaRequest?.communities.map((community: CommunityType) =>
    community.members.map((member: MemberType) => member.recordId),
  );
  const communitiesIds = concat(...(communitiesMembers || []));
  const callsMapCommunities: any[] = []; // communitiesIds.map((recordId: string) => getWorkRepository(recordId ?? ''))
  const communitiesRecords = await Promise.all(callsMapCommunities);

  return prismaRequest?.communities.map((community: CommunityType) => {
    return {
      ...community,
      members: community.members.map((member: MemberType) => {
        const findedMember = communitiesRecords.find((item) => item && item.id === member.recordId);
        const typeOfRecord = findedMember?.typeOfRecord as RecordType;

        if (typeOfRecord === 'COUPLE_WORK') {
          return `Tios ${findedMember?.candidateName} e ${findedMember?.recordCouple?.womanName} - ${findedMember?.parishChapel}`;
        }
        return `${findedMember?.candidateName} - ${findedMember?.parishChapel}`;
      }),
    };
  });
}

async function getWorkTableArchiveDataRepository(courseNumber: string) {
  const prismaRequest = await prisma.workTableEntity.findUnique({
    where: { courseNumber },
    include: {
      communities: {
        include: {
          members: true,
        },
      },
    },
  });

  // const [
  // coordinatorRecord,
  // baseRecord,
  // auxiliarRecord,
  // coupleSafeToBeRecord,
  // coupleKitchenCoordinatorRecord,
  // kitchenSpiritualRecord,
  // liturgyRecord,
  // secretaryRecord,
  // auxiliarLiturgyRecord,
  // auxiliarSecretaryRecord,
  // folkloreCoordinatorRecord,
  // barRecord,
  // ] = await Promise.all([
  // getPoslllRepository(prismaRequest?.coordinator ?? ''),
  // getPoslllRepository(prismaRequest?.base ?? ''),
  // getPoslllRepository(prismaRequest?.auxiliar ?? ''),
  // getWorkRepository(prismaRequest?.coupleSafeToBe ?? ''),
  // getWorkRepository(prismaRequest?.coupleKitchenCoordinator ?? ''),
  // getPoslllRepository(prismaRequest?.kitchenSpiritual ?? ''),
  // getPoslllRepository(prismaRequest?.liturgy ?? ''),
  // getPoslllRepository(prismaRequest?.secretary ?? ''),
  // getWorkRepository(prismaRequest?.auxiliarLiturgy ?? ''),
  // getWorkRepository(prismaRequest?.auxiliarSecretary ?? ''),
  // getWorkRepository(prismaRequest?.folkloreCoordinator ?? ''),
  // getWorkRepository(prismaRequest?.bar ?? ''),
  // ]);

  if (prismaRequest) {
    const cleanWorkRecords = await cleanWorkRecordsFormatData(prismaRequest);
    const copeWorkRecords = await copeWorkRecordsFormatData(prismaRequest);
    const kitchenWorkRecords = await kitchenWorkRecordsFormatData(prismaRequest);
    const communities = await correctCommunitiesWithRecordsFormatData(prismaRequest);

    return {
      // pos lll
      // coordinator: `${coordinatorRecord?.candidateName} - paróquia`,
      // base: `${baseRecord?.candidateName} - paróquia`,
      // auxiliar: `${auxiliarRecord?.candidateName} - paróquia`,
      kitchenSpiritual: `Fulano - paróquia`,
      liturgy: `Fulano - paróquia`,
      secretary: `Fulano - paróquia`,
      // kitchenSpiritual: `${kitchenSpiritualRecord?.candidateName} - paróquia`,
      // liturgy: `${liturgyRecord?.candidateName} - paróquia`,
      // secretary: `${secretaryRecord?.candidateName} - paróquia`,

      // pos ll
      // coupleSafeToBe: `Tios ${coupleSafeToBeRecord?.candidateName} e ${coupleSafeToBeRecord?.recordCouple?.womanName} - ${coupleSafeToBeRecord?.parishChapel}`,
      // coupleKitchenCoordinator: `Tios ${coupleKitchenCoordinatorRecord?.candidateName} e ${coupleKitchenCoordinatorRecord?.recordCouple?.womanName} - ${coupleKitchenCoordinatorRecord?.parishChapel}`,
      auxiliarLiturgy: `Fulano - lugar`,
      auxiliarSecretary: `Fulano - lugar`,
      folkloreCoordinator: `Fulano - lugar`,
      bar: `Fulano - lugar`,
      // auxiliarLiturgy: `${auxiliarLiturgyRecord?.candidateName} - ${auxiliarLiturgyRecord?.parishChapel}`,
      // auxiliarSecretary: `${auxiliarSecretaryRecord?.candidateName} - ${auxiliarSecretaryRecord?.parishChapel}`,
      // folkloreCoordinator: `${folkloreCoordinatorRecord?.candidateName} - ${folkloreCoordinatorRecord?.parishChapel}`,
      // bar: `${barRecord?.candidateName} - ${barRecord?.parishChapel}`,

      // arrays
      cleanWorkRecords,
      copeWorkRecords,
      kitchenWorkRecords,
      communities,
    };
  }
}

export async function getWorkTableArchiveDataController(req: Request, res: Response) {
  try {
    const { courseNumber } = CourseNumberSchema.parse(req.params);
    const repositoryRequest = await getWorkTableArchiveDataRepository(courseNumber);

    if (isEmpty(repositoryRequest)) {
      res.status(HttpStatus.NO_CONTENT).send({});
    } else {
      res.status(HttpStatus.OK).send(repositoryRequest);
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
 */
