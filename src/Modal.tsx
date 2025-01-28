import { useCallback } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {
  onClose?: () => void;
  'data-testid'?: string;
  title: string;
  children: React.ReactNode;
}

const Modal = ({
  'data-testid': testId,
  title,
  onClose,
  children,
  ...props
}: Props) => {
  const handleKeyDown = useCallback(
    (ev: React.KeyboardEvent) => {
      if (onClose && ev.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  const handleOuterClick = useCallback(
    (ev: React.MouseEvent) => {
      if (onClose && ev.target === ev.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <div
      /* biome-ignore lint/a11y/useSemanticElements:
       * Native <dialog> elements have implicit functionality and
       * may conflict with programmatic Modal behavior
       */
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
      onClick={handleOuterClick}
      data-testid={testId}
      {...props}
    >
      <div>
        <header>
          <h1>{title}</h1>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
};

export { Modal };
