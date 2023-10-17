import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View,  Alert,Button, TextInput } from 'react-native';
import { Person } from './src/modules/Person';
import PersonService from './src/services/PersonService';
import DatabaseInit from './src/database/db_init';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [name, setName] = useState('');
  const [people, setPeople] = useState<Person[]>([])
  //let people: Array<Person> = [];
  //const db_init = new DatabaseInit();

  const pickImageAsync = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if(!result.canceled){
      console.log(result);
    }else{
      alert("Nenhuma imagem selecionada!");
    }
  }
  

  const insertPerson = (param: string) =>{
      let person = new Person();
      person.name = param;
      PersonService.addData(person);
      setName('');
      Alert.alert("Cadastro Realizado!");
      setPeople(PersonService.findAll());
      console.log("PESSOAS LISTA FRONT: "+people);
      
      console.log(person);
  }

  const createDir = () =>{
    PersonService.createDir("Turma903");
  }

  const getDir = () =>{
    PersonService.getDir("teste");
  }
  const findAll= () =>{
     setPeople(PersonService.findAll());
     console.log("LISTA DE PESSOAS: "+people);
     //return people;
     
  }

  const sayHelloTo = ()=>{
    Alert.alert("NOME DEVE SER PREENCHIDO!");
  }

  const peopleList = people.map((person, key)=>{
    return(
      <>
        <Text key={person.id}>id: {person.id} nome: {person.name}</Text>
      </>
     )
  })


  return (
    <View style={styles.container}>
      <Text>CADASTRO</Text>
      <TextInput  placeholder="Nome: " value={name} onChangeText={(text)=>setName(text)}/> 
      <Button title="CADASTRAR" onPress={() => name == "" ? sayHelloTo() : insertPerson(name)}/>
      <Button title="DIRETÓRIO" onPress={createDir}/>
      <Button title="BUSCAR DIRETÓRIO" onPress={getDir}/>
      <Button title="Upload de Foto" onPress={pickImageAsync} />
      
      
      <StatusBar style="auto" />
      {peopleList}
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
});
