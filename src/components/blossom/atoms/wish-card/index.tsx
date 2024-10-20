import { dateFormatDistance } from '@/helpers/date-format.helper';
import { Heart, SealCheck } from '@phosphor-icons/react';

interface WishCardProps {
  sender: string;
  message: string;
  createdBy: string;
  createdAt: string;
}

const WishCard = ({ sender, message, createdBy, createdAt }: WishCardProps) => {
  return (
    <div className='flex gap-3 mb-3'>
      <div className='flex flex-row items-start justify-center'>
        <div className='bg-red-500 p-1.5 rounded-full'>
          <Heart weight='fill' size={24} className='text-white' />
        </div>
      </div>
      <div className='w-[86%] bg-white border shadow p-2 rounded-lg text-sm text-pink-900'>
        <div className='flex gap-1'>
          <p className='text-md font-semibold mb-1'>{sender}</p>
          {['Aycainvitation']?.includes(createdBy) && (
            <SealCheck weight='fill' size={17} className='text-blue-500' />
          )}
        </div>
        <p className='text-md mb-2 break-all'>{message}</p>
        <p className='text-xs font-medium opacity-60'>
          {dateFormatDistance(new Date(createdAt))}
        </p>
      </div>
    </div>
  );
};

export default WishCard;
