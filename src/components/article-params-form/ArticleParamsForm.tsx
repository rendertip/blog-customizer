import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from '@/constants/articleProps.ts';
import { ArrowButton } from '@/ui/arrow-button';
import { Button } from '@/ui/button';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';

import type { ArticleStateType } from '@/constants/articleProps.ts';
import type { FormEvent } from 'react';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onSubmit: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onSubmit,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (event.target instanceof Node && !formRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('mousedown', handleOutsideClick);
    }

    return (): void => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onSubmit(defaultArticleState);
  };

  return (
    <div ref={formRef}>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((value) => !value)} />
      <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fields}>
            <Select
              title="Шрифт"
              selected={formState.fontFamilyOption}
              options={fontFamilyOptions}
              onChange={(fontFamilyOption) =>
                setFormState((state) => ({ ...state, fontFamilyOption }))
              }
            />
            <RadioGroup
              title="Размер шрифта"
              name="radio"
              selected={formState.fontSizeOption}
              options={fontSizeOptions}
              onChange={(fontSizeOption) =>
                setFormState((state) => ({ ...state, fontSizeOption }))
              }
            />
            <Select
              title="Цвет шрифта"
              selected={formState.fontColor}
              options={fontColors}
              onChange={(fontColor) =>
                setFormState((state) => ({ ...state, fontColor }))
              }
            />
            <Select
              title="Цвет фона"
              selected={formState.backgroundColor}
              options={backgroundColors}
              onChange={(backgroundColor) =>
                setFormState((state) => ({ ...state, backgroundColor }))
              }
            />
            <Select
              title="Ширина контента"
              selected={formState.contentWidth}
              options={contentWidthArr}
              onChange={(contentWidth) =>
                setFormState((state) => ({ ...state, contentWidth }))
              }
            />
          </div>
          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="button"
              type="clear"
              onClick={handleReset}
            />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
