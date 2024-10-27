import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface User {
  id: number;
  name: string;
  username: string;
}

export default function Index() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Network response was not ok');
        const json = await response.json();
        setUsers(json);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.main}>
        <Text style={styles.title}>Users List</Text>
        <ScrollView contentContainerStyle={styles.container}>
          {loading && <Text style={styles.loading}>Loading...</Text>}
          {error && <Text style={styles.error}>Error occurred</Text>}
          {users.map((item: User) => (
            <View key={item.id} style={styles.userCard}>
              <Text style={styles.userName}>{item.name} ({item.username})</Text>
              <Link href={`/user/${item.id}`} style={styles.link}>
                View user
              </Link>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  container: {
    alignItems: 'center',
    paddingBottom: 20, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#343a40',
    marginTop: 20
  },
  loading: {
    fontSize: 18,
    color: '#007bff',
  },
  error: {
    fontSize: 18,
    color: '#dc3545',
  },
  userCard: {
    padding: 16,
    marginVertical: 8,
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 18,
    color: '#495057',
    fontWeight: '600', 
  },
  link: {
    marginTop: 8,
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
