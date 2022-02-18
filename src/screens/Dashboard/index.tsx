import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  ITransactionCardProps,
} from '../../components/TransactionCard';

import {
  Container,
  Header,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
} from './styles';

export interface ITransactionListProps extends ITransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: ITransactionListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: { name: 'Vendas', icon: 'dollar-sign' },
      date: '18/02/2022',
    },
    {
      id: '2',
      type: 'negative',
      title: 'Aluguel',
      amount: 'R$ 1.000,00',
      category: { name: 'Apto', icon: 'coffee' },
      date: '18/02/2022',
    },
    {
      id: '3',
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: 'R$ 10.000,00',
      category: { name: 'Vendas', icon: 'shopping-bag' },
      date: '18/02/2022',
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://assets.nintendo.com/image/upload/c_pad,f_auto,h_490,q_auto,w_360/ncom/en_US/games/switch/r/rain-world-switch/description-image?v=2021120411',
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Josney</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="R$17.400,00"
          lastTransaction="Última entrada 18 de fevereiro"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount="R$1.220,00"
          lastTransaction="Última entrada 14 de fevereiro"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$16.180,00"
          lastTransaction="Última entrada 18 de fevereiro"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
