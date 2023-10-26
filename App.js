import React, { useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Image, Text, Button, TextInput } from 'react-native';
import productApi from './ProductList';

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

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

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
    setIsCheckout(true);
  };

  const order = (address) => {
    if (address.trim() === '') {
      Alert.alert('Hata', 'Lütfen adres bilginizi giriniz.');
      return;
    }

    alert('Siparişiniz alındı! Adres: ' + address);
    setCartItems([]);
    setIsCheckout(false);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {isCheckout ? (
          <Checkout cartItems={cartItems} onOrder={order} />
        ) : (
          <>
            <ProductList onAddToCart={addToCart} />
            <Cart cartItems={cartItems} onCheckout={checkout} onRemoveFromCart={removeFromCart} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
