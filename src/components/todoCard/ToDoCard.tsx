import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import styles from "./todoCard.style";

interface ToDoCardProps {
    item: { text: string, completed: boolean };
    onDelete: () => void;
}

const ToDoCard = ({ item, onDelete }: ToDoCardProps) => {
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const renderRightAction = () => {
        return (
            <TouchableOpacity onPress={() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true
                }).start(() => {
                    onDelete();
                    fadeAnim.setValue(1); 
                });
            }}>
                <Animated.View style={[styles.deleteButton, { opacity: fadeAnim }]}>
                    <Text style={styles.deleteText}>Delete</Text>
                </Animated.View>
            </TouchableOpacity>
        );
    };

    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={renderRightAction}>
                <Animated.View style={[!item.completed ? styles.activeCard : styles.inactiveCard, { opacity: fadeAnim }]} >
                    <Text style={[item.completed ? { textDecorationLine: 'line-through' } : {},styles.cardText]}>{item.text}</Text>
                </Animated.View>
            </Swipeable>
        </GestureHandlerRootView>
    );
};

export default ToDoCard;
