import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, Alert, Image } from 'react-native';
import axios from 'axios';

export default function App() {
    const [name, setName] = useState('');
    const [character, setCharacter] = useState(null);

    const fetchCharacter = async () => {
        try {
            const response = await axios.get(`https://swapi.dev/api/people/?search=${name}`);
            const data = response.data.results[0];

            if (data) {
                setCharacter({
                    name: data.name,
                    gender: data.gender,
                  height: data.height
                });
            } else {
                Alert.alert('Personagem não encontrado');
                setCharacter(null);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro ao buscar personagem');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo-3-1.png' }}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>Buscar Personagem</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o nome do personagem"
                value={name}
                onChangeText={setName}
            />
            <Button title="Procurar" onPress={fetchCharacter} />

            {character && (
                <View style={styles.characterInfo}>
                    <Text style={styles.infoText}>Nome: {character.name}</Text>
                    <Text style={styles.infoText}>Gênero: {character.gender}</Text>
                    <Text style={styles.infoText}>Altura: {character.height} cm</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#1c1c1c',
    },
    image: {
        width: 200,
        height: 100, 
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: '#ffcc00',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        width: '100%',
        paddingHorizontal: 10,
        color: '#fff',
        marginBottom: 20,
    },
    characterInfo: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'rgba(255, 204, 0, 0.2)',
        borderRadius: 5,
        width: '100%',
    },
    infoText: {
        color: '#fff',
        fontSize: 16,
    },
});
