import { FormEvent, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type UseWishesProps = {
  prefix: string;
  to: string;
};

export const useWishes = ({ prefix, to }: UseWishesProps) => {
  // #region State
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [wishes, setWishes] = useState<WishesData[]>([]);
  // #endregion

  // #region Fetch
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
  // #endregion

  // #region Handler
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
  // #endregion

  // #region Effect
  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);
  // #endregion

  return {
    // -- states
    loading,
    data: wishes,
    name,
    wish,
    // -- handler
    setName,
    setWish,
    handleSubmit
  };
};
