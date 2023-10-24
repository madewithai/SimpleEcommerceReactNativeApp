import React, { useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';
import ProductList from './ProductList';
import Cart from './Cart';
import Checkout from './Checkout';

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
