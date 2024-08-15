import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, View } from './Themed';
import { TextInput, Button, Menu, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

interface ValorFormulario {
  id: number;
  nomeProduto: string;
  marca: string;
  valor: number;
  quantidade: number;
}

const validarFormulario = Yup.object().shape({
  nomeProduto: Yup.string().required("O nome do produto é obrigatório!"),
  marca: Yup.string().required("A marca do produto é obrigatório!"),
  valor: Yup.number().required("O valor do produto é obrigatório!").typeError("Valor deve ser um número"),
  quantidade: Yup.number().required("A quantidade do produto é obrigatório!").typeError("Quantidade deve ser um número")
})

export default function conteudoSaidas() {

  const valorInicial: ValorFormulario = {
    nomeProduto: '',
    marca: '',
    valor: '',
    quantidade: '',
  };


  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [valorVenda, setValorVenda] = useState('');
  const [dataVenda, setDataVenda] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);

  const [vendas, setVendas] = useState<Venda[]>([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@produto');
        const produtos = jsonValue != null ? JSON.parse(jsonValue) : [];
        setProdutos(produtos);
      } catch (e) {
        console.error('Erro ao listar produto', e);
      }
    };
    fetchProdutos();
  }, []);

  const salvarVendas = async (novaVenda: Venda[]) => {
    try {
      const json = JSON.stringify(novaVenda);
      await AsyncStorage.setItem('@venda', json);
    } catch (e) {
      console.error('Erro ao salvar venda:', e)
    }
  };

  const handleSalvaVenda = (valores: valorFormulario, { resetForm }: any) => {
    if (!produtoSelecionado || !valorVenda) {
      Alert.alert('Erro', 'Selecione um produto e insira valor de venda');
      return;
    }
    const novaVenda: Venda = { ...valores, id: vendas.length + 1 };
    const vendaAtt = [...produtos, novaVenda];
    setVendas(vendaAtt);
    salvarVendas(vendaAtt);
    resetForm();
  };

  const mostrarDatePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Provider>
        <View style={styles.getStartedContainer}>
          <Text style={styles.label}>Selecione o produto</Text>
          <Menu
            visible={visibleMenu}
            onDismiss={() => setVisibleMenu(false)}
            anchor={
              <Button mode="outlined" onPress={() => setVisibleMenu(true)}>
                {produtoSelecionado ? produtoSelecionado : 'Selecione um produto'}
              </Button>
            }>
            {produtos.map((produto, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setProdutoSelecionado(produto.nomeProduto);
                  setVisibleMenu(false);
                }}
                title={produto.nomeProduto}
              />
            ))}
          </Menu>
          <TextInput
            label="Valor da venda"
            value={valorVenda}
            onChangeText={setValorVenda}
            keyboardType='numeric'
            style={styles.input}
          />
          <Text style={styles.label}>Data da venda:</Text>
          <Button mode='outlined' onPress={showDatePicker}>
            {dataVenda.toLocaleDateString()}
          </Button>
          {showDatePicker && (
            <DateTimePicker
              value={dataVenda}
              mode="date"
              display='default'
              onChange={(event, selectedDate) => {
                const dataAtual = selectedDate || dataVenda;
                setShowDatePicker(false);
                setDataVenda(dataAtual);
              }}
            />
          )}
          <View style={styles.buttonContainer}>
            <Button mode='contained' onPress={handleSalvaVenda} style={styles.submitButton}>
              Registrar venda
            </Button>
          </View>
        </View>
      </Provider>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    justifyContent: 'space-between',
    padding: 20,
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    width: 150,
    marginTop: 20,
  },
  dateText: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center'
  },
});
