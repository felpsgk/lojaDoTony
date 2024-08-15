import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from './Themed';

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

export default function ConteudoEntradas() {

  const [produtos, setProdutos] = useState<Produto[]>([]);

  const valorInicial: ValorFormulario = {
    nomeProduto: '',
    marca: '',
    valor: '',
    quantidade: '',
  };

  const salvarProdutos = async (novoProduto: Produto[]) => {
    try {
      const json = JSON.stringify(novoProduto);
      await AsyncStorage.setItem('@produto', json);
    } catch (e) {
      console.error('Erro ao salvar produto:', e)
    }
  };

  const carregaProdutos = async () => {
    try {
      const json = await AsyncStorage.getItem('@produto');
      if (json != null) {
        setProdutos(JSON.parse(json));
      }
    } catch (e) {
      console.error('Erro ao carregar produto:', e)
    }
  };

  useEffect(() => {
    carregaProdutos();
  }, []);

  const handleSubmit = (valores: valorFormulario, { resetForm }: any) => {
    const novoProduto: Produto = { ...valores, id: produtos.length + 1 };
    const produtoAtt = [...produtos, novoProduto];
    setProdutos(produtoAtt);
    salvarProdutos(produtoAtt);
    resetForm();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.getStartedContainer}>
        <Formik
          initialValues={valorInicial}
          validationSchema={validarFormulario}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.getStartedContainer}>
              <TextInput
                label="Nome do produto"
                mode="outlined"
                style={styles.textInput}
                onChangeText={handleChange('nomeProduto')}
                onBlur={handleBlur('nomeProduto')}
                value={values.nomeProduto}
                error={touched.nomeProduto && !!errors.nomeProduto}
              />
              {touched.nomeProduto && errors.nomeProduto && (
                <Text style={styles.erro}>{errors.nomeProduto}</Text>
              )}

              <TextInput
                label="Marca do produto"
                mode="outlined"
                style={styles.textInput}
                onChangeText={handleChange('marca')}
                onBlur={handleBlur('marca')}
                value={values.marca}
                error={touched.marca && !!errors.marca}
              />
              {touched.marca && errors.marca && (
                <Text style={styles.erro}>{errors.marca}</Text>
              )}

              <TextInput
                label="Valor"
                keyboardType="numeric"
                mode="outlined"
                style={styles.textInput}
                onChangeText={handleChange('valor')}
                onBlur={handleBlur('valor')}
                value={values.valor}
                error={touched.valor && !!errors.valor}
              />
              {touched.valor && errors.valor && (
                <Text style={styles.erro}>{errors.valor}</Text>
              )}

              <TextInput
                label="Quantidade"
                keyboardType="numeric"
                mode="outlined"
                style={styles.textInput}
                onChangeText={handleChange('quantidade')}
                onBlur={handleBlur('quantidade')}
                value={values.quantidade}
                error={touched.quantidade && !!errors.quantidade}
              />
              {touched.quantidade && errors.quantidade && (
                <Text style={styles.erro}>{errors.quantidade}</Text>
              )}
              <View style={styles.buttonContainer}>
                <Button mode='contained' onPress={handleSubmit} style={styles.submitButton}>
                  Salvar
                </Button>
              </View>
            </View>
          )}

        </Formik>
        <View>
          <FlatList
            data={produtos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.produtoItem}>
                <Text>Produto: {item.nomeProduto}</Text>
                <Text>Marca: {item.marca}</Text>
                <Text>Valor: {item.valor}</Text>
                <Text>Quantidade: {item.quantidade}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    width: 150,
    marginTop: 20,
  },
  getStartedContainer: {
    justifyContent: 'space-between',
    padding: 20,
    flex: 1,
  },
  textInput: {
    textAlign: 'center'
  },
  produtoItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  erro: {
    color: 'red',
    marginBottom: 10,
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
