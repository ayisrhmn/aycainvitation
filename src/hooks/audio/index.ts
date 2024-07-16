/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';

const useAudio = (urlAudio: string) => {
  const audio = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(urlAudio) : undefined
  );
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.current?.play() : audio.current?.pause();

    return () => {};
  }, [playing]);

  useEffect(() => {
    audio.current?.addEventListener('ended', () => {
      setPlaying(false);
      setTimeout(() => {
        setPlaying(true);
      }, 2000);
    });

    return () => {
      audio.current?.removeEventListener('ended', () => {
        setPlaying(false);
      });
    };
  }, [playing]);

  return { playing, setPlaying, toggle };
};

export default useAudio;
