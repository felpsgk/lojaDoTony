import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { Text, View } from './Themed';
import { LineChart, BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditScreenInfo() {
  const screenWidth = Dimensions.get('window').width;

  const ChartScreen = () => {
    const [entradas, setEntradas] = useState([]);
    const [vendas, setVendas] = useState([]);
    const [ganhos, setGanhos] = useState(0);
    const [gastos, setGastos] = useState(0);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@produto');
          const produtos = jsonValue != null ? JSON.parse(jsonValue) : [];
          const entradas = produtos.map(produto=>produto.quantidade);
          const vendas = produtos.map(produto=>produto.quantidade);
        } catch (error) {

        }
      }
    })
  }

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Codigo dessa tela:
        </Text>

        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Mudar o texto automaticamente.
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
