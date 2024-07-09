import { useRouter } from 'next/router';

export const useAycavite = () => {
  const router = useRouter();

  const { to } = router.query;

  return {
    // -- states
    to
    // -- handlers
  };
};
