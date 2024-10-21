import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

type UseRsvpProps = {
  prefix: string;
  to?: string;
  session?: string;
};

export const useRsvp = ({ prefix, to, session }: UseRsvpProps) => {
  // #region State
  const [loading, setLoading] = useState(false);
  const [rsvpData, setRsvpData] = useState<RsvpData[]>([]);
  // #endregion

  // #region Fetch
  const fetchRsvp = useCallback(async () => {
    try {
      const response = await fetch(`/api/rsvp/${prefix}`);
      const data = await response.json();
      if (data.success) {
        setRsvpData(data.data);
      } else {
        toast.error(`Failed to fetch examples: ${data.error}`);
      }
    } catch (err) {
      toast.error(`Error fetching data: ${err}`);
    }
  }, [prefix]);
  // #endregion

  // #region Memo
  const findRsvp = useMemo(() => {
    const find = rsvpData?.find((v) => v.name === to);
    return find;
  }, [rsvpData, to]);
  // #endregion

  // #region Handler
  const handleRsvp = async (isAttend: boolean) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/rsvp/${prefix}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: to,
          isAttend,
          session: parseInt(session!) || null
        })
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Thank you for your confirmation!');
        fetchRsvp();
        setLoading(false);
      } else {
        toast.error(`Failed to send rsvp: ${data.error}`);
        setLoading(false);
      }
    } catch (err) {
      toast.error(`Error posting data: ${err}`);
      setLoading(false);
    }
  };
  // #endregion

  // #region Effect
  useEffect(() => {
    fetchRsvp();
  }, [fetchRsvp]);
  // #endregion

  return {
    // -- states
    loading,
    data: rsvpData,
    findRsvp,
    // -- handler
    handleRsvp
  };
};
