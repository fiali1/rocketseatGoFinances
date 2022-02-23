import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Button, Container, Icon, Title } from './styles';

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
    <Container type={type} isActive={isActive}>
      <Button {...rest}>
        <Icon name={icon[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
