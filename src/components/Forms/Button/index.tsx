import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Title } from './styles';

interface IButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

export function Button({ title, onPress, ...rest }: IButtonProps) {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
