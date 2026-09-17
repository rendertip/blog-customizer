import { clsx } from 'clsx';
import { useState } from 'react';
import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

type ArrowButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export const ArrowButton = ({
  isOpen,
  onClick,
}: ArrowButtonProps): React.JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (): void => {
    setIsHovered(false);
    onClick();
  };

  return (
    /* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
    <div
      role="button"
      aria-label="Открыть/Закрыть форму параметров статьи"
      tabIndex={0}
      className={clsx(styles.container, {
        [styles.container_hovered]: isHovered,
        [styles.container_open]: isOpen,
      })}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={arrow}
        alt="иконка стрелочки"
        className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
      />
    </div>
  );
};
