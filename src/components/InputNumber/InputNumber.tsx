import { useObjectRef } from '@react-aria/utils';
import { ForwardedRef, forwardRef } from 'react';
import { AriaNumberFieldProps, useLocale, useNumberField } from 'react-aria';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { NumberFieldStateOptions, useNumberFieldState } from 'react-stately';

import { Button } from '../Button';
import { Container, Input, InputNumberButton } from './InputNumber.styled';

interface InputNumberProps
  extends Omit<NumberFieldStateOptions, 'locale'>,
    AriaNumberFieldProps {}

const InputNumber = (
  props: InputNumberProps,
  forwardRef: ForwardedRef<HTMLInputElement>
) => {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const ref = useObjectRef(forwardRef);
  const { groupProps, inputProps, incrementButtonProps, decrementButtonProps } =
    useNumberField(props, state, ref);
  return (
    <Container {...groupProps}>
      <Button {...decrementButtonProps} css={InputNumberButton}>
        <IoIosRemove tw="w-5 h-5 fill-gray-800" />
      </Button>
      <Input {...inputProps} ref={ref} />
      <Button {...incrementButtonProps} css={InputNumberButton}>
        <IoIosAdd tw="w-5 h-5 fill-gray-800" />
      </Button>
    </Container>
  );
};

export default forwardRef(InputNumber);
