import { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export default function UserDetail() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { id } = useLocalSearchParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                const data = await response.json();
                setUser(data);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.main}>
                <Text style={styles.userDetailTitle}>User Details</Text>
                <ScrollView contentContainerStyle={styles.container}>
                    {loading && <Text style={styles.loading}>Loading...</Text>}
                    {error && <Text style={styles.error}>Error occurred</Text>}
                    {user && (
                        <View style={styles.userDetailCard}>
                            <Text style={styles.userDetailText}>Name: {user.name}</Text>
                            <Text style={styles.userDetailText}>Username: {user.username}</Text>
                            <Text style={styles.userDetailText}>Email: {user.email}</Text>
                            <Text style={styles.userDetailText}>Phone: {user.phone}</Text>
                            <Text style={styles.userDetailText}>Website: {user.website}</Text>
                            <Text style={styles.userDetailText}>Address:</Text>
                            <Text style={styles.userDetailText}>
                                {user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}
                            </Text>
                            <Text style={styles.userDetailText}>Geo:</Text>
                            <Text style={styles.userDetailText}>
                                Latitude: {user.address.geo.lat}, Longitude: {user.address.geo.lng}
                            </Text>
                            <Text style={styles.userDetailText}>Company:</Text>
                            <Text style={styles.userDetailText}>{user.company.name}</Text>
                            <Text style={styles.userDetailText}>Catchphrase: {user.company.catchPhrase}</Text>
                            <Text style={styles.userDetailText}>BS: {user.company.bs}</Text>
                        </View>
                    )}
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
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
    },
    loading: {
        fontSize: 18,
        color: '#007bff',
    },
    error: {
        fontSize: 18,
        color: '#dc3545',
    },
    userDetailCard: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 16,
        width: '100%',
        maxWidth: 400,
    },
    userDetailTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#343a40',
        marginTop: 20,
    },
    userDetailText: {
        fontSize: 18,
        color: '#495057',
        marginVertical: 4,
    },
});
