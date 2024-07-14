import { Button } from '@/components/atoms';
import { cn } from '@/utils';
import { Heart } from '@phosphor-icons/react';
import { Playfair_Display_SC } from 'next/font/google';
import { FormEvent, useState } from 'react';

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const WishCard = ({ sender, message }: { sender: string; message: string }) => {
  return (
    <div className='flex gap-3 mb-3'>
      <div className='flex flex-row items-start justify-center'>
        <div className='bg-red-500 p-1.5 rounded-full'>
          <Heart weight='fill' size={24} className='text-white' />
        </div>
      </div>
      <div className='w-full border shadow p-2 rounded-lg text-sm text-lime-900'>
        <p className='text-md font-semibold mb-1'>{sender}</p>
        <p className='text-md'>{message}</p>
      </div>
    </div>
  );
};

const Wish = () => {
  const [name, setName] = useState('');
  const [wishes, setWishes] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Name', name);
    console.log('Wishes', wishes);
  };

  return (
    <div className='bg-lime-50 px-4 py-8'>
      <p
        className={cn(
          'text-3xl text-lime-900 text-center mb-4',
          playfairDisplaySc.className
        )}
      >
        Wish
      </p>
      <div className='mb-8'>
        <p className='text-sm italic text-lime-900 text-center opacity-60 mb-2'>
          Berikan ucapan dan do`a untuk kami.
        </p>
      </div>
      <form className='mb-8' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <input
            className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-lime-900 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <textarea
            className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-lime-900 leading-tight focus:outline-none focus:shadow-outline'
            rows={4}
            placeholder='Wishes'
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-between mb-6'>
          <Button
            disabled={name.length === 0 || wishes.length === 0}
            className='bg-lime-900 hover:bg-lime-700 text-white hover:text-white rounded-full transition duration-300'
            type='submit'
          >
            Send
          </Button>
        </div>
      </form>
      {/* if wish > 3, set height to 280px */}
      <div className='h-auto overflow-auto no-scrollbar'>
        <WishCard
          sender='John Doe'
          message='Happy Wedding! Lorem ipsum dolor sit amet.'
        />
      </div>
    </div>
  );
};

export default Wish;
