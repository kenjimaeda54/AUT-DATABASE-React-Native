import React, { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  StyleSheet,
} from "react-native";

import firebase from "./src/firebase/firebase"



export default function Registrar() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  

  async function Cadastrar() {
  
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then((value) => {
        firebase.database().ref('Usuarios').child(value.user.uid).set({
          nome: nome
        })
        alert("Usuario cadastrado com sucesso")
        setNome(''),
        setEmail('');
        setSenha('');
        return;
      })
      .catch((error) => {
        alert("Gerou erro")
       })
      
 }


  return (
    <View style={styles.container} >

      <View style={styles.areaTexto} >

        <Text style={styles.texto} >Nome</Text>

        <TextInput
          value={nome}
          placeholder="Coloca um email valido"
          underlineColorAndroid='transparent'
          onChangeText={(item) => setNome(item)}
          style={styles.textInput}
        />


        <Text style={styles.texto} >Email</Text>

        <TextInput
          value={email}
          placeholder="Coloca um email valido"
          underlineColorAndroid='transparent'
          onChangeText={(item) => setEmail(item)}
          style={styles.textInput}
        />
        <Text style={styles.texto} >Senha</Text>

        <TextInput
          value={senha}
          placeholder="Coloca uma senha valida"
          underlineColorAndroid='transparent'
          onChangeText={(item) => setSenha(item)}
          style={styles.textInput}
        />


      </View>
      <View style={styles.btnBotao}>

        <TouchableOpacity style={styles.botao} onPress={Cadastrar} >

          <Text style={styles.btnTexto} >Cadastrar</Text>

        </TouchableOpacity>

      </View>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',

  },
  textTop: {
    marginRight: -250,
    width: '100%',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
  },
  areaTexto: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  textInput: {
    width: '90%',
    borderRadius: 5,
    backgroundColor: '#dddd',
    height: 100,
    color: 'black',
    borderWidth: 5,
    padding: 30,

  },
  texto: {
    color: 'black',
    fontSize: 16,
    marginLeft: -280,
    fontWeight: 'bold',
    marginTop: 20,

  },
  btnBotao: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '90%',
    height: 50,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',

  },
  botao: {
    borderRadius: 5,
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTexto: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  }

});
