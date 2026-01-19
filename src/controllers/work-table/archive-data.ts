import type { Prisma } from '@prisma/client';
import type { Request, Response } from 'express';
import { concat, isEmpty } from 'lodash';

import { HttpStatus } from '@/constants';
import { prisma } from '@/database';
import { handleZodError } from '@/helpers';
import { CourseIdSchema } from '@/schemas';
import { getCourseById, getDinamicRecordById, getRecordById } from '@/services-helpers';

type RecordEntityType = Prisma.RecordEntityGetPayload<{
  include: { recordCouple: true; recordPOSl: true; recordPOSll: true; recordWork: true };
}>;

async function kitchenRecordsFormatData(kitchenRecords: string[]) {
  const callMapKitchenWorkRecords =
    kitchenRecords.map((recordId) => getRecordById(recordId ?? '')) || [];
  const kitchenWorkRecords = await Promise.all(callMapKitchenWorkRecords);
  return kitchenWorkRecords.map((record: RecordEntityType | null) => {
    if (record?.isCoupleWork) {
      return `Tios ${record?.candidateName} e ${record?.recordCouple?.womanName} - ${record?.parishChapel}`;
    }
    return `${record?.candidateName} - ${record?.parishChapel}`;
  });
}

type CommunityType = Prisma.CommunityGetPayload<{
  include: { members: true };
}>;
type MemberType = Prisma.CommunityMemberGetPayload<{}>;

async function correctCommunitiesWithRecordsFormatData(communities: CommunityType[]) {
  const communitiesMembers = communities.map((community: CommunityType) =>
    community.members.map((member: MemberType) => member.recordId),
  );
  const communitiesIds = concat(...(communitiesMembers || []));
  const callsMapCommunities = communitiesIds.map((recordId) => getRecordById(recordId ?? '')) || [];
  const communitiesRecords = await Promise.all(callsMapCommunities);

  return communities.map((community: CommunityType) => {
    return {
      ...community,
      members: community.members.map((member: MemberType) => {
        const findedMember = communitiesRecords.find((item) => item && item.id === member.recordId);

        if (findedMember?.isCoupleWork) {
          return `Tios ${findedMember?.candidateName} e ${findedMember?.recordCouple?.womanName} - ${findedMember?.parishChapel}`;
        }
        return `${findedMember?.candidateName} - ${findedMember?.parishChapel}`;
      }),
    };
  });
}

async function getWorkTableArchiveDataRepository(courseId: string) {
  const prismaRequest = await prisma.workTableEntity.findUnique({
    where: { courseId },
    include: {
      kitchenRecords: true,
      communities: {
        include: {
          members: true,
        },
      },
    },
  });

  const course = await getCourseById(courseId);

  if (prismaRequest && course) {
    const {
      typeOfCourse: _typeOfCourse,
      endDate: _endDate,
      startDate: _startDate,
      id: _id,
      ...restCourse
    } = course;

    const [
      auxiliarData,

      baseData,
      coordinatorData,
      coupleKitchenCoordinatorData,
      kitchenSpiritualData,
      liturgyData,
      secretaryData,
      auxiliarLiturgyData,
      auxiliarSecretaryData,
      barData,
      coupleSafeToBeData,
      folkloreCoordinatorData,
    ] = await Promise.all([
      getDinamicRecordById(restCourse.auxiliar),
      getDinamicRecordById(restCourse.base),
      getDinamicRecordById(restCourse.coordinator),
      getDinamicRecordById(restCourse.coupleKitchenCoordinator),
      getDinamicRecordById(restCourse.kitchenSpiritual),
      getDinamicRecordById(restCourse.liturgy),
      getDinamicRecordById(restCourse.secretary),
      prismaRequest.auxiliarLiturgy
        ? await getDinamicRecordById(prismaRequest.auxiliarLiturgy)
        : null,
      prismaRequest.auxiliarSecretary
        ? await getDinamicRecordById(prismaRequest.auxiliarSecretary)
        : null,
      prismaRequest.bar ? await getDinamicRecordById(prismaRequest.bar) : null,
      prismaRequest.coupleSafeToBe
        ? await getDinamicRecordById(prismaRequest.coupleSafeToBe)
        : null,
      prismaRequest.folkloreCoordinator
        ? await getDinamicRecordById(prismaRequest.folkloreCoordinator)
        : null,
    ]);

    const cleanWorkRecords = await kitchenRecordsFormatData(
      prismaRequest.kitchenRecords
        .filter((item) => item.office === 'cleanWork')
        .map((item) => item.recordId),
    );
    const copeWorkRecords = await kitchenRecordsFormatData(
      prismaRequest.kitchenRecords
        .filter((item) => item.office === 'copeWork')
        .map((item) => item.recordId),
    );
    const kitchenWorkRecords = await kitchenRecordsFormatData(
      prismaRequest.kitchenRecords
        .filter((item) => item.office === 'kitchenWork')
        .map((item) => item.recordId),
    );
    const communities = await correctCommunitiesWithRecordsFormatData(prismaRequest.communities);

    return {
      auxiliar: `${auxiliarData?.candidateName} - ${auxiliarData?.parishChapel}`,
      base: `${baseData?.candidateName} - ${baseData?.parishChapel}`,
      coordinator: `${coordinatorData?.candidateName} - ${coordinatorData?.parishChapel}`,
      coupleKitchenCoordinator: `${coupleKitchenCoordinatorData?.candidateName} - ${coupleKitchenCoordinatorData?.parishChapel}`,
      courseNumber: restCourse.courseNumber,
      kitchenSpiritual: `${kitchenSpiritualData?.candidateName} - ${kitchenSpiritualData?.parishChapel}`,
      liturgy: `${liturgyData?.candidateName} - ${liturgyData?.parishChapel}`,
      secretary: `${secretaryData?.candidateName} - ${secretaryData?.parishChapel}`,

      auxiliarLiturgy: `${auxiliarLiturgyData?.candidateName} - ${auxiliarLiturgyData?.parishChapel}`,
      auxiliarSecretary: `${auxiliarSecretaryData?.candidateName} - ${auxiliarSecretaryData?.parishChapel}`,
      bar: `${barData?.candidateName} - ${barData?.parishChapel}`,
      coupleSafeToBe: `${coupleSafeToBeData?.candidateName} - ${coupleSafeToBeData?.parishChapel}`,
      folkloreCoordinator: `${folkloreCoordinatorData?.candidateName} - ${folkloreCoordinatorData?.parishChapel}`,

      cleanWorkRecords,
      copeWorkRecords,
      kitchenWorkRecords,
      communities,
    };
  }
}

export async function getWorkTableArchiveDataController(req: Request, res: Response) {
  try {
    const { courseId } = CourseIdSchema.parse(req.params);
    const repositoryRequest = await getWorkTableArchiveDataRepository(courseId);

    if (isEmpty(repositoryRequest)) {
      res.status(HttpStatus.NO_CONTENT).send({});
    } else {
      res.status(HttpStatus.OK).send(repositoryRequest);
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
