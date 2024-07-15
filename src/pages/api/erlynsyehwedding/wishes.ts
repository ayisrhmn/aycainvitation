import { APP_ERLYNSYEH } from '@/constants';
import { Wishes } from '@/models';
import { db } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data<WishesData | WishesData[]>>
) {
  await db();

  switch (req.method) {
    case 'GET':
      try {
        const wishes = await Wishes.find({
          invitationBy: APP_ERLYNSYEH.prefix
        });
        res.status(200).json({ success: true, data: wishes });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, error: 'Internal Server Error' });
      }
      break;

    case 'POST':
      try {
        const wishes = new Wishes(req.body);
        await wishes.save();
        res.status(201).json({ success: true, data: wishes });
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
