import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from 'styled-components/native';


interface ToDoInputProps {
    setItems: (items: { text: string, completed: boolean }[]) => void;
    inputValue: string;
    setInputValue: (inputValue: string) => void;
    items: { text: string, completed: boolean }[];
}

const StyledInput = styled.TextInput`
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  font-size: 16px;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
`;

const StyledButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.buttonBackground};
  padding: 10px 20px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const ButtonText = styled.Text`
  color: ${({ theme }) => theme.buttonText};
  font-size: 16px;
  font-weight: bold;
`;

const ToDoInput = ({ setItems, inputValue, setInputValue, items }: ToDoInputProps) => {
    return (
        <View>
            <StyledInput
                placeholder="Add an item!"
                value={inputValue}
                onChangeText={setInputValue}
                placeholderTextColor="#999"
            />
            <StyledButton 
                onPress={() => {
                    if (inputValue.trim()) {
                        setItems([...items, { text: inputValue.trim(), completed: false }]);
                        setInputValue("");
                    }
                }}
                disabled={inputValue.trim() === "" || items.some(item => item.text === inputValue.trim())}
            >
                <ButtonText>Add</ButtonText>
            </StyledButton>
        </View>
    );
};

export default ToDoInput;
