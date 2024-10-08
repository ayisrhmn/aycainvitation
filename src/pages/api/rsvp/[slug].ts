import { Rsvp } from '@/models';
import { db } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data<RsvpData | RsvpData[]>>
) {
  await db();

  const { slug } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const rsvp = await Rsvp.find({
          invitationBy: slug
        });
        res.status(200).json({ success: true, data: rsvp });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, error: 'Internal Server Error' });
      }
      break;

    case 'POST':
      try {
        const rsvp = new Rsvp({ ...req.body, invitationBy: slug });
        await rsvp.save();
        res.status(201).json({ success: true, data: rsvp });
      } catch (error) {
        res.status(400).json({ success: false, error: 'Bad Request' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
