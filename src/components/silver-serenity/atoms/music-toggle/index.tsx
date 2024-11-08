import { Pause, Play } from '@phosphor-icons/react';

interface MusicToggleProps {
  toggle: () => void;
  playing: boolean;
}

const MusicToggle = ({ toggle, playing }: MusicToggleProps) => {
  return (
    <div
      className='flex fixed z-30 bottom-2 right-2 cursor-pointer'
      onClick={toggle}
    >
      <div className='bg-slate-50 p-1.5 rounded-full shadow-lg text-slate-600'>
        {playing ? (
          <Pause weight='fill' size={12} />
        ) : (
          <Play weight='fill' size={12} />
        )}
      </div>
    </div>
  );
};

export default MusicToggle;
