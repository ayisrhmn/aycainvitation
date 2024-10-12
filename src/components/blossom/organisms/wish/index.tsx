import { Button, WishCard } from '@/components/blossom/atoms';
import { cn } from '@/utils';
import { Playfair_Display_SC } from 'next/font/google';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface WishProps {
  to: string;
  prefix: string;
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const Wish = ({ to, prefix }: WishProps) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [wishes, setWishes] = useState<WishesData[]>([]);

  const fetchWishes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/wishes/${prefix}`);
      const data = await response.json();
      if (data.success) {
        setLoading(false);
        setWishes(data.data);
      } else {
        setLoading(false);
        toast.error(`Failed to fetch examples: ${data.error}`);
      }
    } catch (err) {
      setLoading(false);
      toast.error(`Error fetching data: ${err}`);
    }
  }, [prefix]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/wishes/${prefix}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          wish,
          createdBy: to
        })
      });
      const data = await response.json();
      if (data.success) {
        setName('');
        setWish('');
        toast.success('Thank you for the wishes!');
        fetchWishes();
      } else {
        toast.error(`Failed to send wishes: ${data.error}`);
      }
    } catch (err) {
      toast.error(`Error posting data: ${err}`);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

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
          wishes?.length > 3 ? 'h-[280px]' : 'h-auto'
        )}
      >
        {loading ? (
          <p className='text-sm text-center italic text-lime-900 opacity-60'>
            Loading wishes...
          </p>
        ) : (
          <>
            {wishes?.map((wish, i) => (
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
