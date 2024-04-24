import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { dummyPasswords } from "../constants";
import * as LocalAuthentication from "expo-local-authentication";

const Index = () => {
  const router = useRouter();

  const handleBiometricAuth = async (item) => {
    // authenticate with biometric
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Use your screen lock",
      cancelLabel: "Cancel",
      disableDeviceFallback: false,
    });

    // Log the user in on success
    if (biometricAuth && biometricAuth.success) {
      router.push({ pathname: "/passwordDetail", params: item });
    }
  };

  const myItemSeparator = () => {
    return <View className="h-px bg-gray-300 mx-8" />;
  };

  const myListEmpty = () => {
    return (
      <View className="flex flex-row items-center p-3">
        <Text
          style={{ fontSize: hp(2.5) }}
          className="text-neutral-700 font-semibold ml-2 tracking-wide"
        >
          No data found
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        className="flex flex-row justify-between items-center p-3"
        onPress={() => handleBiometricAuth(item)}
      >
        <View className="flex flex-row gap-x-2">
          <Ionicons name="earth" size={22} color="gray" />
          <Text
            style={{ fontSize: hp(2.5) }}
            className="text-neutral-700 font-semibold tracking-wide"
          >
            {item.siteName}
          </Text>
        </View>
        <AntDesign name="caretright" size={14} color="#1F2123" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white flex" edges={["top"]}>
      <StatusBar style="dark" />

      <View className="space-y-4 mx-4">
        <Text
          style={{ fontSize: hp(4.5) }}
          className="font-bold tracking-wider text-neutral-700"
        >
          Passwords
        </Text>

        <View className="rounded-2xl shadow-lg border border-neutral-500 overflow-hidden">
          <FlatList
            data={dummyPasswords}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={myItemSeparator}
            ListEmptyComponent={myListEmpty}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
