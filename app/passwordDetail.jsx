import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { dummyPasswords } from "../constants";

const PaswordDetail = () => {
  const router = useRouter();
  const item = useLocalSearchParams();

  const [passwordItem, setPasswordItem] = useState();

  useEffect(() => {
    if (item) getPasswordItem(item.name);
  }, []);

  const getPasswordItem = async () => {
    let data = dummyPasswords.find((x) => x.id == item.id);
    setPasswordItem(data);
    console.log("item", item);
    console.log("data", data);
  };

  return (
    <SafeAreaView className="flex-1 bg-white flex" edges={["top"]}>
      <StatusBar style="dark" />

      <View className="space-y-1 mx-4">
        <View className="flex flex-row items-center mt-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-2 justify-center items-center pr-1 rounded-full"
            style={{ width: hp(4.5), height: hp(4.5) }}
          >
            <Ionicons name="arrow-back" size={hp(4)} color="#1F2123" />
          </TouchableOpacity>
          <Ionicons name="earth" size={22} color="gray" />
          <Text
            style={{ fontSize: hp(3.5) }}
            className="text-neutral-700 font-semibold ml-2 tracking-wide"
          >
            {passwordItem?.siteName}
          </Text>
        </View>

        <FlatList
          data={passwordItem?.accounts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60, paddingTop: 20 }}
          renderItem={({ item, index }) => (
            <PasswordCard
              index={index}
              item={item}
              siteUrl={passwordItem.siteUrl}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default PaswordDetail;

const PasswordCard = ({ item, index, siteUrl }) => {
  return (
    <View className="space-y-2 rounded-2xl shadow-lg border border-neutral-500 bg-white overflow-hidden p-3 mb-3">
      <Text
        style={{ fontSize: hp(2.2) }}
        className="text-neutral-700 font-semibold ml-2 tracking-wide"
      >
        Site Url
      </Text>
      <TextInput
        style={{ fontSize: hp(2.0) }}
        className="bg-gray-200 text-neutral-700 font-semibold py-2 px-4 rounded-2xl"
        readOnly
        value={siteUrl}
      />

      <Text
        style={{ fontSize: hp(2.2) }}
        className="text-neutral-700 font-semibold ml-2 tracking-wide"
      >
        UserName
      </Text>
      <TextInput
        style={{ fontSize: hp(2.0) }}
        className="bg-gray-200 text-neutral-700 font-semibold py-2 px-4 rounded-2xl"
        readOnly
        value={item.userName}
      />

      <Text
        style={{ fontSize: hp(2.2) }}
        className="text-neutral-700 font-semibold ml-2 tracking-wide"
      >
        Password
      </Text>
      <TextInput
        style={{ fontSize: hp(2.0) }}
        className="bg-gray-200 text-neutral-700 font-semibold py-2 px-4 rounded-2xl"
        readOnly
        value={item.password}
        secureTextEntry={true}
      />

      <Text
        style={{ fontSize: hp(2.2) }}
        className="text-neutral-700 font-semibold ml-2 tracking-wide"
      >
        Note
      </Text>
      <TextInput
        style={{ fontSize: hp(2.0) }}
        className="bg-gray-200 text-neutral-700 font-semibold py-2 px-4 rounded-2xl"
        readOnly
        defaultValue={item.note}
      />
    </View>
  );
};
