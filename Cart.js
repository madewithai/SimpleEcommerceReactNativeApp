import React from 'react';
import { View, Text, Button } from 'react-native';

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

export default Cart;
