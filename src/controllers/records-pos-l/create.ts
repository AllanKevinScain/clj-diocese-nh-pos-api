import { z } from 'zod';
import { prisma } from '../../database';
import { HttpStatus } from '../../constants';
import { handleZodError } from '../../helpers';
import { Request, Response } from 'express';

export const RecordSchema = z.object({
  id: z.string().uuid().optional(),
  courseNumber: z.number().int(),
  parishAcronym: z.string(),
  recordNumber: z.number().int(),
  photo: z.string(),
  candidateName: z.string(),
  document: z.string(),
  nickname: z.string(),
  birthDate: z.string(),
  candidatePhone: z.string(),
  instagram: z.string(),
  priest: z.string(),
  parishChapel: z.string(),
  spiritualLife: z.string(),
  observationsDed: z.string(),
  disease: z.string(),
  medication: z.string(),
  allergy: z.string(),
  dataConsent: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const RecordPOSlSchema = z.object({
  godfatherName: z.string(),
  godfatherPhone: z.string(),
  godfatherEmail: z.string(),
  affinityWithGodfather: z.string(),
  attitudeCommunication: z.string(),
  doctrineCommunication: z.string(),
  godfatherResponsibility: z.string(),
  candidateSpirit: z.string(),
  candidateDisposition: z.string(),
  candidateParticipation: z.string(),
  fatherSituation: z.string(),
  motherSituation: z.string(),
  livesWith: z.string(),
  otherWho: z.string(),
  parentsReligion: z.string(),
  parentsComment: z.string(),
  recordId: z.string().uuid().optional(),
});

export const TwoSchemas = RecordSchema.merge(RecordPOSlSchema);

type TwoSchemasInfertypeSchema = z.infer<typeof TwoSchemas>;

async function createRecordPOSlRepository(params: TwoSchemasInfertypeSchema) {
  const record = RecordSchema.parse(params);
  const recordPOSl = RecordPOSlSchema.parse(params);

  const prismaRequest = await prisma.record.create({
    data: {
      typeOfRecord: 'POSl',
      ...record,
      recordPOSl: {
        create: recordPOSl,
      },
    },
  });
  return prismaRequest;
}

export async function createRecordPOSlController(req: Request, res: Response) {
  try {
    const parsedRequest = TwoSchemas.parse(req.body);
    const repositoryRequest = await createRecordPOSlRepository(parsedRequest);

    res.status(HttpStatus.OK).send(repositoryRequest);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).send({ message: handleZodError(error) });
  }
}
