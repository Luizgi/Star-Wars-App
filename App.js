import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const StarWarsApp = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await axios.get('https://swapi.dev/api/people/');
        setCharacters(response.data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    }

    fetchCharacters();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Star Wars Characters:</Text>
      <FlatList
        style={styles.list}
        data={characters}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.characterContainer}>
            <Image
              source={{ uri: `https://starwars-visualguide.com/assets/img/characters/${getImageNumber(item.url)}.jpg` }}
              style={styles.characterImage}
            />
            <View style={styles.characterDetails}>
              <Text style={styles.characterName}>{item.name}</Text>
              <Text style={styles.characterText}>{`Gender: ${item.gender}`}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  characterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  characterDetails: {
    flex: 1,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  characterText: {
    fontSize: 14,
  },
});

// Função para obter o número da imagem a partir da URL do personagem
const getImageNumber = (url) => {
  const matches = url.match(/\/(\d+)\/$/);
  if (matches && matches.length === 2) {
    return matches[1];
  }
  return '';
};

export default StarWarsApp;
