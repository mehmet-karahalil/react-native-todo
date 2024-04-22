import React, {useEffect, useState} from 'react';
import {ThemeProvider} from 'styled-components';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';
import ToDoInput from './components/todoInput/ToDoInput';
import ToDoCard from './components/todoCard/ToDoCard';

import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TitleContainer = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 10px;
`;

const TitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow-color: ${({theme}) => theme.textShadowColor};

  color: ${({theme}) => theme.text};
`;
const lightTheme = {
  background: '#fff',
  text: '#000',
  inputBackground: '#fff',
  inputText: '#000',
  buttonBackground: '#007BFF',  
  buttonText: '#fff',           
};
const darkTheme = {
  background: '#333',
  text: '#fff',
  inputBackground: '#444',
  inputText: '#fff',
  buttonBackground: '#1E90FF',  
  buttonText: '#fff',           
};
function ToDo(): React.JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState<{text: string; completed: boolean}[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    const loadItems = async () => {
      const storedItems = await AsyncStorage.getItem('items');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    };

    loadItems();
  }, []);

  useEffect(() => {
    const saveItems = async () => {
      await AsyncStorage.setItem('items', JSON.stringify(items));
    };

    saveItems();
  }, [items]);



  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  const handlePress = (index: number) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index].completed = !newItems[index].completed;
      return newItems;
    });
  };

  const handleDelete = (index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDarkMode
            ? darkTheme.background
            : lightTheme.background,
        }}>
        <TitleContainer>
          <TitleText>To Do</TitleText>
          <TitleText>{items.filter(item => !item.completed).length}</TitleText>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isDarkMode}
          />
        </TitleContainer>
        <FlatList
          horizontal={false}
          data={items}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => handlePress(index)}
                disabled={item.completed}>
                <ToDoCard onDelete={() => handleDelete(index)} item={item} />
              </TouchableOpacity>
            );
          }}
        />
        <ToDoInput
          setItems={setItems}
          inputValue={inputValue}
          setInputValue={setInputValue}
          items={items}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  lightTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    margin: 10,
    color: 'black',
  },
  darkTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    margin: 10,
    color: 'white',
  },
});

export default ToDo;
