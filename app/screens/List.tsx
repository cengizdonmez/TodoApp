import React, {useEffect, useState} from "react";
import { View, Text, Button, TextInput, StyleSheet, FlatList } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { collection, onSnapshot, addDoc, updateDoc, QueryDocumentSnapshot, deleteDoc, doc } from "firebase/firestore";
import { Feather } from '@expo/vector-icons';




const List = ({navigation}: any) => {

    const [todos, setTodos] = useState<any[]>([]);
    const [todo, setTodo] = useState('');

    useEffect(() => {
        const q = collection(FIRESTORE_DB, 'todos');
        const subscriber = onSnapshot(q, (querySnapshot) => {
            const todos: any[] = [];
            querySnapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
                todos.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setTodos(todos);
            console.log(todos);
        });
        return () => subscriber();
    }
    , []);
    

    
    const addTodo = async () => {
        const newTodo = await addDoc(collection(FIRESTORE_DB, 'todos'), {
            title: todo,
            completed: false,
        });
        setTodo('');
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.todoForm}>
                <TextInput 
                    placeholder="Yeni Todo"
                    value={todo}
                    style={styles.addTodoInput}
                    onChangeText={(text) => {
                        setTodo(text);
                    }}
                    placeholderTextColor={"#a8acb2"}
                />

                <Feather 
                    name="plus"
                    size={24}
                    color="black"
                    disabled={todo.length === 0}
                    onPress={async () => {
                        await addTodo();
                    }}
                    style={styles.addTodoButton}
                />
            </View>

            <View>
                <FlatList
                    data={todos}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => {

                        const handleComplete = async () => {
                            await updateDoc(doc(FIRESTORE_DB, 'todos', item.id), {
                                completed: !item.completed,
                            });
                        }

                        const handleDelete = async () => {
                            await deleteDoc(doc(FIRESTORE_DB, 'todos', item.id));
                        }


                        return (
                            <View style={styles.todoItem}>
                                {item.completed ?
                                    <Feather
                                        onPress={async () => {
                                            await handleComplete();
                                        }}
                                        name="check-circle"
                                        size={24} 
                                        color="#198754"
                                    />
                                    : 
                                    <Feather 
                                        onPress={async () => {
                                            await handleComplete();
                                        }}
                                        name="circle" 
                                        size={24} 
                                        color="#ffc107"
                                    /> 
                                }

                                <Text 
                                    style={{
                                        color: "#ced4da",
                                        fontSize: 16,
                                        textDecorationLine: item.completed ? "line-through" : "none",
                                        display: "flex",
                                        flexGrow: 1,
                                        marginLeft: 8,

                                    }}
                                >
                                    {item.title}
                                </Text>
                                
                             
                                <Feather 
                                    name="trash-2"
                                    size={24}
                                    style={styles.trashTodoButton}
                                    onPress={async () => {
                                        await handleDelete();
                                    }}/>
                            </View>
                        );
                    }}
                />
            </View>

        </View>
    );
}

export default List;

/* Styles */
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        backgroundColor: "#212121",
        height: "100%",
        paddingBottom: 140
    },
    todoForm: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
        marginVertical: 24,
    },
    addTodoInput: {
        borderColor: "#ced4da",
        borderWidth: 2,
        borderRadius: 6,
        padding: 8,
        display: "flex",
        flexGrow: 1,
        color: "#ced4da",
        fontSize: 16,
    },
    addTodoButton: {
        marginLeft: 16,
        padding: 8,
        borderRadius: 6,
        backgroundColor: "#ced4da",
        overflow: "hidden",
    },
    trashTodoButton: {
        marginLeft: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: "#dc3545",
        color: "white",
        overflow: "hidden",
    },
    todoItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    }
});