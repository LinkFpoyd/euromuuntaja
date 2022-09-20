import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {

  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [currencyKeys, setCurrencyKeys] = useState({});
  const [money, setMoney] = useState(0.0);


  useEffect(() => getKeys(), []);

  const getKeys = () => {
    fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=c9a62d88a123b98324a77f4cffd50150`)
    .then(response => response.json())
    .then(data => setCurrencyKeys(data.rates))
    .catch (error => {
      Alert.alert('Error', error.toString());
    });
  }

  const exchangeMoney = () => {
    const a = Object.values(currencyKeys);
    const b = (amount / a[currency]).toFixed(2);
    setMoney(b);
  }



  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>EUROMUUNTAJA</Text>
      </View>
      
      <Text>Vaihdettava summa:</Text>
      <TextInput style={styles.input} type="Number" onChangeText={text => setAmount(text)}
        value={amount}
        placeholder='Määrä'/>
      <Button title="Vaihda" onPress={exchangeMoney} />
      <View style={styles.picker}>
      <Text style={styles.text}>Vaihdettava valuutta:</Text>
        <Picker
          style={{width: 100}} 
          mode='dialog'
          selectedValue={currency}
          onValueChange={(item) =>
            setCurrency(item)
          }>
          {Object.keys(currencyKeys).map((item, index) => {
          return (<Picker.Item label={item} value={index} key={index}/>) 
          })}
        </Picker>
      </View>
      <Text style={styles.value}>Arvo: {money}€</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 100,
    borderWidth: 1,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  text: {
    marginTop: 17,
  },
  picker: {
    flexDirection: 'row'
  },
  title: {
    marginBottom: 10,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gold'
  }
});
