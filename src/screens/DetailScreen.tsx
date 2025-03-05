import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fetchProductById, Product } from "../api/api";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

const DetailScreen = ({ route }: Props) => {
    const { productId } = route.params;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            const data = await fetchProductById(productId);
            setProduct(data);
            setLoading(false);
        };
        loadProduct();
    }, [productId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Erro ao carregar o produto.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: product.thumbnail }} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
            <Text style={styles.description}>{product.description}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: 16,
        color: "red",
    },
    container: {
        padding: 16,
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },
    brand: {
        fontSize: 16,
        color: "gray",
        marginBottom: 5,
    },
    price: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#007bff",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        color: "#333",
    },
});

export default DetailScreen;
