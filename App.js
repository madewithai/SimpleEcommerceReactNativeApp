import React, { useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Image, Text, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import productApi from './ProductList';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => setCartItems([...cartItems, product]);

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const checkout = () => navigation.navigate('Checkout', { cartItems });

  return (
    <SafeAreaView>
      <ScrollView>
        {productApi.map((product) => (
          <View key={product.id}>
            <Image source={{ uri: product.image }} style={{ width: 100, height: 100 }} />
            <Text>{product.tr.title}</Text>
            <Button title="Sepete Ekle" onPress={() => addToCart(product)} />
          </View>
        ))}
        {cartItems.map((product, index) => (
          <View key={product.id}>
            <Text>{product.tr.title}</Text>
            <Button title="Çıkar" onPress={() => removeFromCart(index)} />
          </View>
        ))}
        <Button title="Ödeme Yap" onPress={checkout} />
      </ScrollView>
    </SafeAreaView>
  );
};

const CheckoutScreen = ({ route, navigation }) => {
  const [address, setAddress] = useState('');
  const { cartItems } = route.params;

  const order = () => {
    if (!address.trim()) {
      Alert.alert('Hata', 'Lütfen adres bilginizi giriniz.');
      return;
    }
    alert(`Siparişiniz alındı! Adres: ${address}`);
    navigation.goBack();
  };

  return (
    <View>
      {cartItems.map((product) => (
        <Text key={product.id}>{product.tr.title}</Text>
      ))}
      <Text>Adres:</Text>
      <TextInput value={address} onChangeText={setAddress} placeholder="Adresinizi giriniz..." style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }} />
      <Button title="Sipariş Ver" onPress={order} />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Ürün Listesi' }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Ödeme' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
