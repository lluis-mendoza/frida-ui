import { useRef } from 'react';
import { AriaCheckboxProps, useCheckbox, VisuallyHidden } from 'react-aria';
import { useToggleState } from 'react-stately';

interface CheckBoxProps extends AriaCheckboxProps {}

export default function Checkbox(props: CheckBoxProps) {
  const state = useToggleState(props);
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps } = useCheckbox(props, state, ref);

  return (
    <label className="flex items-center group">
      <VisuallyHidden>
        <input {...inputProps} ref={ref} />
      </VisuallyHidden>
      <div aria-hidden="true">
        <svg className="stroke-current w-3 h-3" viewBox="0 0 18 18">
          <polyline
            points="1 9 7 14 15 4"
            fill="none"
            strokeWidth={3}
            strokeDasharray={22}
            strokeDashoffset={state.isSelected ? 44 : 66}
            style={{
              transition: 'all 400ms',
            }}
          />
        </svg>
      </div>
      <span>{props.children}</span>
    </label>
  );
}
