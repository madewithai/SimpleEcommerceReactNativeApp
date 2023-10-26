import React, { useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Image, Text, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import productApi from './ProductList';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => setCartItems([...cartItems, product]);

  const removeFromCart = (productId) => {
    const newCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(newCart);
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const checkout = () => navigation.navigate('Checkout', { cartItems });

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Products</Text>
          {productApi.map((product) => (
            <View key={product.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image source={{ uri: product.image }} style={{ width: 50, height: 50 }} />
                <Text>{product.en.title}</Text>
              </View>
              {isProductInCart(product.id) ? (
                <Button title="Remove" onPress={() => removeFromCart(product.id)} />
              ) : (
                <Button title="Add to cart" onPress={() => addToCart(product)} />
              )}
            </View>
          ))}
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cart</Text>
        {cartItems.map((product, index) => (
          <View key={product.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Image source={{ uri: product.image }} style={{ width: 50, height: 50 }} />
              <Text>{product.en.title}</Text>
            </View>
            <Button title="Remove" onPress={() => removeFromCart(product.id)} />
          </View>
        ))}
        <Button title="Checkout" onPress={checkout} />
      </ScrollView>
    </SafeAreaView>
  );
};

const CheckoutScreen = ({ route, navigation }) => {
  const [address, setAddress] = useState('');
  const { cartItems } = route.params;

  const order = () => {
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter your address information.');
      return;
    }
    alert(`Thanks for your order! Your address: ${address}`);
    navigation.goBack();
  };

  return (
    <View>
      {cartItems.map((product) => (
        <View key={product.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <Image source={{ uri: product.image }} style={{ width: 50, height: 50 }} />
          <Text>{product.en.title}</Text>
        </View>
      ))}
      <Text>Address:</Text>
      <TextInput value={address} onChangeText={setAddress} placeholder="Your address..." style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }} />
      <Button title="Order Now" onPress={order} />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Product List' }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
