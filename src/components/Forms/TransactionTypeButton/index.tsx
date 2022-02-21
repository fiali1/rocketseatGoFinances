import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Icon, Title } from './styles';

export interface ITransactionTypeButtonProps extends TouchableOpacityProps {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: ITransactionTypeButtonProps) {
  return (
    <Container type={type} isActive={isActive} {...rest}>
      <Icon name={icon[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
}
