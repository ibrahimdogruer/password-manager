import { View, Text, LogBox } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function _layout() {
  LogBox.ignoreLogs(["Warning: Failed prop type"]);
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="passwordDetail"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
      <Toast position="bottom" bottomOffset={20} />
    </>
  );
}
