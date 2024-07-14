import { useCallback, useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [calculateTimeLeft, timeLeft]);

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className='flex flex-row items-center justify-center gap-8'>
      <div>
        <p className='text-3xl mb-1.5'>{formatTime(timeLeft.days)}</p>
        <p className='text-sm'>Days</p>
      </div>
      <div>
        <p className='text-3xl mb-1.5'>{formatTime(timeLeft.hours)}</p>
        <p className='text-sm'>Hours</p>
      </div>
      <div>
        <p className='text-3xl mb-1.5'>{formatTime(timeLeft.minutes)}</p>
        <p className='text-sm'>Minutes</p>
      </div>
      <div>
        <p className='text-3xl mb-1.5'>{formatTime(timeLeft.seconds)}</p>
        <p className='text-sm'>Seconds</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
