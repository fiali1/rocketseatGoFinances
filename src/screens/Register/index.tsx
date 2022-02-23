/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputForm } from '../../components/Forms/InputForm';
import { CategorySelectButton } from '../../components/CategorySelectButton';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';

interface IFormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('Valor deve ser positivo')
    .required('Campo obrigatório'),
});

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionTypeSelection(type: 'up' | 'down'): void {
    setTransactionType(type);
  }

  function handleOpenCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleRegister(form: Partial<IFormData>): void {
    if (!transactionType) {
      Alert.alert('Erro', 'Selecione o tipo da transação');
    }

    if (category.key === 'category') {
      Alert.alert('Erro', 'Selecione uma categoria');
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };

    // eslint-disable-next-line no-console
    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Valor"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                isActive={transactionType === 'up'}
                onPress={() => handleTransactionTypeSelection('up')}
              />
              <TransactionTypeButton
                type="down"
                title="Expenses"
                isActive={transactionType === 'down'}
                onPress={() => handleTransactionTypeSelection('down')}
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenCategoryModal}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen} statusBarTranslucent>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectedCateogry={handleCloseCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
