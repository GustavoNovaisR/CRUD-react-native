import React, { useContext, useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import UsersContext, {
  ActionNames,
  User,
  UsersContextType,
} from "../context/UsersContext";

const UserForm = ({ route, navigation }: any) => {
  const { dispatch } = useContext(UsersContext) as UsersContextType;
  const userParams: User = route.params ?? {};
  const [user, setUser] = useState(userParams);
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
          const actionName: ActionNames = user.id ? "updateUser" : "createUser";
          dispatch({
            type: actionName,
            payload: user,
          });
          navigation.goBack();
        }}
      />
    </View>
  );
};

type classesStyle = {
  form: {};
  input: {};
};
const estilo: StyleSheet.NamedStyles<classesStyle> = {
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
