
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';

export default function App() {

  // Store API data
  const [posts, setPosts] = useState([]);

  // Store loading status
  const [loading, setLoading] = useState(true);

  // Store error message
  const [error, setError] = useState(null);

  // Store refreshing status
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch data from API
  const fetchPosts = async () => {

    try {
      setError(null);

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );

      // Check if response is successful
      if (!response.ok) {
        throw new Error('Unable to fetch posts');
      }

      // Convert response into JSON
      const data = await response.json();

      // Save fetched data
      setPosts(data);

    } catch (err) {

      // Handle errors
      console.error('Fetch Error:', err);
      setError('Something went wrong. Please try again.');

    } finally {

      // Stop loading
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Automatically fetch data when screen loads
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function for refreshing data
  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  // Function for retrying after an error
  const handleRetry = () => {
    setLoading(true);
    fetchPosts();
  };

  // Display each post
  const renderPost = ({ item }) => {
    return (
      <View style={styles.card}>

        <Text style={styles.postId}>
          POST #{item.id}
        </Text>

        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.body}>
          {item.body}
        </Text>

        <Text style={styles.userId}>
          User ID: {item.userId}
        </Text>

      </View>
    );
  };

  // Main screen UI
  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        backgroundColor="#2563EB"
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          API Data Fetching
        </Text>

        <Text style={styles.headerSubtitle}>
          Posts from JSONPlaceholder
        </Text>
      </View>

      {/* Loading Screen */}
      {loading ? (

        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color="#2563EB"
          />

          <Text style={styles.loadingText}>
            Loading posts...
          </Text>
        </View>

      ) : error ? (

        // Error Screen
        <View style={styles.center}>

          <Text style={styles.errorText}>
            {error}
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={handleRetry}
          >
            <Text style={styles.buttonText}>
              Try Again
            </Text>
          </TouchableOpacity>

        </View>

      ) : (

        // Display API Data
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}

          // Pull down to refresh
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#2563EB']}
            />
          }

          ListHeaderComponent={
            <Text style={styles.listHeading}>
              Total Posts: {posts.length}
            </Text>
          }

          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No posts available.
            </Text>
          }
        />

      )}

    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  header: {
    backgroundColor: '#2563EB',
    padding: 25,
    paddingTop: 35,
    paddingBottom: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  headerSubtitle: {
    fontSize: 14,
    color: '#DBEAFE',
    marginTop: 5,
  },

  list: {
    padding: 15,
    paddingBottom: 30,
  },

  listHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3,
  },

  postId: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
    textTransform: 'capitalize',
  },

  body: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },

  userId: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 12,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#374151',
  },

  errorText: {
    fontSize: 16,
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 15,
  },

  retryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 30,
  },

});
