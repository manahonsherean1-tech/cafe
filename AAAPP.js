
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=10'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch Pokemon');
        }

        const data = await response.json();

        setPokemon(data.results);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPokemon();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pokemon List</Text>

      {loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={pokemon}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Image
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
                }}
                style={styles.image}
              />

              <View style={styles.info}>
                <Text style={styles.number}>
                  Pokemon #{index + 1}
                </Text>

                <Text style={styles.name}>
                  {item.name.toUpperCase()}
                </Text>

                <Text style={styles.url}>
                  {item.url}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF5F5',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#C0392B',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
  },
  info: {
    flex: 1,
  },
  number: {
    color: '#888',
    fontSize: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C0392B',
  },
  url: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
  error: {
    color: 'red',
  },
});
