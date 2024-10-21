import { Button, WishCard } from '@/components/lime/atoms';
import { useWishes } from '@/hooks/api/use-wishes';
import { cn } from '@/utils';
import { Playfair_Display_SC } from 'next/font/google';

interface WishProps {
  to: string;
  prefix: string;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Wish = ({ to, prefix }: WishProps) => {
  const { loading, data, name, wish, setName, setWish, handleSubmit } =
    useWishes({ prefix, to });

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
            placeholder='Wish'
            value={wish}
            onChange={(e) => setWish(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-between mb-6'>
          <Button
            disabled={name.length === 0 || wish.length === 0 || loading}
            className='bg-lime-900 hover:bg-lime-700 text-white hover:text-white rounded-full transition duration-300'
            type='submit'
          >
            Send
          </Button>
        </div>
      </form>
      <div
        className={cn(
          'overflow-auto no-scrollbar',
          data?.length > 3 ? 'h-[280px]' : 'h-auto'
        )}
      >
        {loading ? (
          <p className='text-sm text-center italic text-lime-900 opacity-60'>
            Loading wishes...
          </p>
        ) : (
          <>
            {data?.map((wish, i) => (
              <WishCard
                key={i}
                sender={wish?.name}
                message={wish?.wish}
                createdBy={wish?.createdBy}
                createdAt={wish?.createdAt}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Wish;
