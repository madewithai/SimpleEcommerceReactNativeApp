import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

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

export default Checkout;
