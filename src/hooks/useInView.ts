import { RefObject, useEffect, useState } from 'react';

const useInView = (ref: RefObject<HTMLElement>, threshold = 0.1, triggerOnce = false): boolean => {
  const [isInView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, threshold, triggerOnce]);

  return isInView;
};

export default useInView;
