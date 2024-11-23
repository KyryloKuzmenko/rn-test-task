import { useEffect, useState, useId } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Image,
  Text,
} from 'react-native';
import axios from 'axios';

const BASE_URL = 'https://picsum.photos/';

interface ImageData {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export default function Feeds() {
  const [data, setData] = useState<ImageData[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchData = async (isRefreshing = false) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}v2/list`, {
        params: { page: isRefreshing ? 1 : page, limit: 10 },
      });

      if (isRefreshing) {
        setData(response.data);
        setPage(2);
      } else {
        setData(prevData => [...prevData, ...response.data]);
        setPage(prevPage => prevPage + 1);
      }

      setError(null);
    } catch (error) {
      setError('Cannot fetch data');
    } finally {
      setIsLoading(false);
      if (isRefreshing) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData(true);
  };

  const handleLoadMore = () => {
    fetchData();
  };

  const renderItem = ({ item }: { item: ImageData }) => {
    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.download_url }} style={styles.image} />
          <View style={styles.overlay}>
            <Text style={styles.author}>{item.author}</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="large" color="#000" /> : null
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  listContent: {
    padding: 10,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  author: {
    color: '#d1d1d1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
  },
});
