import React, { useContext, useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import UsersContext from "../context/UsersContext";

const UserForm = ({ route, navigation }: any) => {
  // console.log(route);

  const { state, dispatch }: any = useContext(UsersContext);
  const estado = route.params ?? {};
  const [user, setUser] = useState(estado);
  return (
    <View style={style.form}>
      <Text>Name</Text>
      <TextInput
        style={style.input}
        onChangeText={(name) => setUser({ ...user, name })}
        placeholder="Informe o Nome"
        value={user.name}
      />

      <Text>Email</Text>
      <TextInput
        style={style.input}
        onChangeText={(email) => setUser({ ...user, email })}
        placeholder="Informe o Email"
        value={user.email}
      />

      <Text>URL do Avatar</Text>
      <TextInput
        style={style.input}
        onChangeText={(avatarUrl) => setUser({ ...user, avatarUrl })}
        placeholder="Informe o avatarUrl"
        value={user.avatarUrl}
      />
      <Button
        title="Salvar"
        onPress={() => {
          console.log(user);
          dispatch({
            type: user.id ? "updateUser" : "createUser",
            payload: user,
          });
          navigation.goBack();
        }}
      />
    </View>
  );
};

const estilo: StyleSheet.NamedStyles<any> = {
  form: {
    padding: 12,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
};
const style = StyleSheet.create(estilo);
export default UserForm;
