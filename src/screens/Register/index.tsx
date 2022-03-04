/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import uuid from 'react-native-uuid';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import { CategorySelectButton } from '../../components/CategorySelectButton';
import { Button } from '../../components/Forms/Button';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { useAuth } from '../../hooks/auth';
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

  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  const dataKey = `@gofinances:transactions_user:${user.id}`;

  function handleTransactionTypeSelection(type: 'positive' | 'negative'): void {
    setTransactionType(type);
  }

  function handleOpenCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: Partial<IFormData>): Promise<void> {
    if (!transactionType) {
      Alert.alert('Erro', 'Selecione o tipo da transação');
    }

    if (category.key === 'category') {
      Alert.alert('Erro', 'Selecione uma categoria');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      title: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const storedData = await AsyncStorage.getItem(dataKey);
      const currentData = storedData ? JSON.parse(storedData) : [];
      const formattedData = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));

      setTransactionType('');
      setCategory({ key: 'category', name: 'Categoria' });
      reset();

      navigate('Listagem');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a transação');
    }
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
                isActive={transactionType === 'positive'}
                onPress={() => handleTransactionTypeSelection('positive')}
              />
              <TransactionTypeButton
                type="down"
                title="Expenses"
                isActive={transactionType === 'negative'}
                onPress={() => handleTransactionTypeSelection('negative')}
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
