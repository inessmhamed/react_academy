import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

export const Link: React.FC<{ preventScrollToTop?: boolean } & LinkProps> = ({
  children,
  preventScrollToTop,
  onClick,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!preventScrollToTop) {
      window.scrollTo(0, 0);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <RouterLink {...props} onClick={handleClick}>
      {children}
    </RouterLink>
  );
};
