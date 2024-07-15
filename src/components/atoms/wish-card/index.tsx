import { Heart } from '@phosphor-icons/react';

interface WishCardProps {
  sender: string;
  message: string;
}

const WishCard = ({ sender, message }: WishCardProps) => {
  return (
    <div className='flex gap-3 mb-3'>
      <div className='flex flex-row items-start justify-center'>
        <div className='bg-red-500 p-1.5 rounded-full'>
          <Heart weight='fill' size={24} className='text-white' />
        </div>
      </div>
      <div className='w-full bg-white border shadow p-2 rounded-lg text-sm text-lime-900'>
        <p className='text-md font-semibold mb-1'>{sender}</p>
        <p className='text-md'>{message}</p>
      </div>
    </div>
  );
};

export default WishCard;
