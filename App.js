import React, { useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Image, Text, Button, TextInput } from 'react-native';
import productApi from './ProductList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const ProductList = ({ onAddToCart }) => {
  return (
    <View>
      {productApi.map((product) => (
        <View key={product.id}>
          <Image source={{ uri: product.image }} style={{ width: 100, height: 100 }} />
          <Text>{product.tr.title}</Text>
          <Button title="Sepete Ekle" onPress={() => onAddToCart(product)} />
        </View>
      ))}
    </View>
  );
};

const Cart = ({ cartItems, onCheckout, onRemoveFromCart }) => {
  return (
    <View>
      {cartItems.map((product, index) => (
        <View key={product.id}>
          <Text>{product.tr.title}</Text>
          <Button title="Çıkar" onPress={() => onRemoveFromCart(index)} />
        </View>
      ))}
      <Button title="Ödeme Yap" onPress={onCheckout} />
    </View>
  );
};

const Checkout = ({ cartItems, onOrder }) => {
  const [address, setAddress] = useState('');

  return (
    <View>
      {cartItems.map((product) => (
        <Text key={product.id}>{product.tr.title}</Text>
      ))}
      <Text>Adres:</Text>
      <TextInput
        value={address}
        onChangeText={(text) => setAddress(text)}
        placeholder="Adresinizi giriniz..."
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
      />
      <Button title="Sipariş Ver" onPress={() => onOrder(address)} />
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => {
      const newCart = [...prev];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const checkout = () => {
    navigation.navigate('Checkout', { cartItems });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <ProductList onAddToCart={addToCart} />
        <Cart cartItems={cartItems} onCheckout={checkout} onRemoveFromCart={removeFromCart} />
      </ScrollView>
    </SafeAreaView>
  );
};

const CheckoutScreen = ({ route, navigation }) => {
  const { cartItems } = route.params;
  const [address, setAddress] = useState('');

  const order = (address) => {
    if (address.trim() === '') {
      Alert.alert('Hata', 'Lütfen adres bilginizi giriniz.');
      return;
    }

    alert('Siparişiniz alındı! Adres: ' + address);
    navigation.goBack();
  };

  return <Checkout cartItems={cartItems} onOrder={order} />;
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
