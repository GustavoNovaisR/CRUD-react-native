import React, { useContext } from "react";
import { FlatList, View, Alert } from "react-native";
import { ListItem, Avatar, Button } from "react-native-elements";
import { StackNavigationProp } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import UsersContext from "../context/UsersContext";

type Props = {
  navigation: StackNavigationProp<any>;
};
const UserList = (props: Props) => {
  const { state, dispatch }: any = useContext(UsersContext);

  function confirmDelete(user: any) {
    Alert.alert("Excluir Usuário", "Deseja excluir Usiário?", [
      {
        text: "Cancelar",
        onPress: () => console.warn("Cancelado "),
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () =>
          dispatch({
            type: "deleteUser",
            payload: user,
          }),
      },
    ]);
  }
  function getActions(user: any) {
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate("UserForm", user)}
          type="clear"
          icon={<AntDesign name="edit" size={24} color="orange" />}
        />
        <Button
          onPress={() => confirmDelete(user)}
          type="clear"
          icon={<AntDesign name="delete" size={24} color="red" />}
        />
      </>
    );
  }
  function getUserItem({ item: user }: any) {
    return (
      <ListItem
        key={user.id}
        bottomDivider
        onPress={() => props.navigation.navigate("UserForm")}
      >
        <Avatar size="large" rounded source={{ uri: user.avatarUrl }}></Avatar>
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        {getActions(user)}
      </ListItem>
    );
  }
  return (
    <View>
      <FlatList
        keyExtractor={(user: any) => user.id.toString()}
        data={state.users}
        renderItem={getUserItem}
      />
    </View>
  );
};

export default UserList;
