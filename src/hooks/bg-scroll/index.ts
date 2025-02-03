import { useEffect } from 'react';

const useBgScroll = (selector: string, contentSelector: string) => {
  useEffect(() => {
    const onScroll = () => {
      const background = document.querySelector<HTMLElement>(selector);
      const content = document.querySelector<HTMLElement>(contentSelector);

      if (!background || !content) return;

      const scrollPosition = window.scrollY;
      const contentTop = content.offsetTop;

      background.style.position =
        scrollPosition >= contentTop ? 'fixed' : 'absolute';
      background.style.top = '0';
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [selector, contentSelector]);
};

export default useBgScroll;
