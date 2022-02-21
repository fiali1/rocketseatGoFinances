import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { categories } from '../../utils/categories';
import {
  Category,
  Container,
  Footer,
  Header,
  Icon,
  Name,
  Separator,
  Title,
} from './styles';

interface ICategoryProps {
  key: string;
  name: string;
}

interface ICategorySelectProps {
  category: ICategoryProps;
  setCategory: (category: ICategoryProps) => void;
  closeSelectedCateogry: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectedCateogry,
}: ICategorySelectProps) {
  function handleCategorySelect(item: ICategoryProps) {
    setCategory(item);
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1 }}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSelectedCateogry} />
      </Footer>
    </Container>
  );
}
