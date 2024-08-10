import { useEffect } from 'react';

const useSubMenuHover = (selector = 'li.p-menuitem', delay = 2000): void => {
  useEffect(() => {
    const setupHoverLogic = (): (() => void) => {
      const handleMouseOver = (event: Event): void => {
        const target = event.target as Element;
        const liElement = target.closest(selector);
        if (liElement) {
          const submenu = liElement.querySelector('.p-submenu-list') as HTMLElement;
          if (submenu) {
            submenu.style.display = 'block';
          }
        }
      };

      const handleMouseOut = (event: Event): void => {
        const relatedTarget = (event as MouseEvent).relatedTarget as Node;
        const liElement = event.currentTarget as HTMLElement;

        if (!liElement.contains(relatedTarget)) {
          const submenu = liElement.querySelector('.p-submenu-list') as HTMLElement;
          if (submenu) {
            submenu.style.display = 'none';
          }
        }
      };

      const menuItemsWithSubmenu = document.querySelectorAll(selector);
      menuItemsWithSubmenu.forEach((menuItem) => {
        menuItem.addEventListener('mouseover', handleMouseOver);
        menuItem.addEventListener('mouseout', handleMouseOut);
      });

      // Correct: Returning the cleanup function directly
      return (): void => {
        menuItemsWithSubmenu.forEach((menuItem) => {
          menuItem.removeEventListener('mouseover', handleMouseOver);
          menuItem.removeEventListener('mouseout', handleMouseOut);
        });
      };
    };

    // Delay setup to ensure elements are loaded
    const timeoutId = setTimeout(setupHoverLogic, delay);

    return (): void => clearTimeout(timeoutId);
  }, [selector, delay]);
};

export default useSubMenuHover;
