
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
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getDogs = async () => {
      try {
        const response = await fetch(
          'https://dog.ceo/api/breeds/image/random/10'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch dog images');
        }

        const data = await response.json();

        if (data.status !== 'success') {
          throw new Error('API returned an error');
        }

        setDogs(data.message);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getDogs();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Random Dog Gallery</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#27AE60" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={dogs}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item }}
                style={styles.image}
                resizeMode="cover"
              />

              <Text style={styles.caption}>
                Dog Image #{index + 1}
              </Text>
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
    backgroundColor: '#E8F8F5',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#196F3D',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 18,
    borderRadius: 12,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  caption: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#196F3D',
  },
  error: {
    color: 'red',
  },
});
