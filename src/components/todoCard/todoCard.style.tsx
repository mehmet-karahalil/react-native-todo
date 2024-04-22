import { StyleSheet } from "react-native";

export default StyleSheet.create({
    activeCard: {
        backgroundColor: "#FFFFFF", 
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 12,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
    },
    inactiveCard: {
        backgroundColor: "#CCCCCC",  
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 12,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
    },
    cardText: {
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: "#FF3B30", 
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: '81%',
        marginTop: 5,
        marginRight: 5,
        borderRadius: 12,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    deleteText: {
        color: "#FFFFFF",
        fontSize: 16, 
        fontWeight: "bold",  
    },
});
