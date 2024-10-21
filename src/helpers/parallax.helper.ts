export const getParallaxStyle = (
  ref: React.RefObject<HTMLDivElement>,
  speed: number,
  scrollY: number
) => {
  if (ref.current) {
    const rect = ref.current.getBoundingClientRect();
    const elementTop = rect.top + window.scrollY;
    const distanceFromTop = scrollY - elementTop;
    return {
      transform: `translateY(${distanceFromTop * speed}px)`
    };
  }
  return {};
};
