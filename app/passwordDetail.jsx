import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { dummyPasswords } from "../constants";
import {
  useTogglePasswordVisibility,
  useCopyToClipboard,
  useSecureStore,
} from "../hooks";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";

const PaswordDetail = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const { getValueFor } = useSecureStore();

  const [passwordItem, setPasswordItem] = useState();

  useEffect(() => {
    if (item) getPasswordItem(item.name);
  }, []);

  const getPasswordItem = async () => {
    const result = await getValueFor("passwords");
    if (result) {
      let data = result.find((x) => x.id == item.id);
      setPasswordItem(data);
    } else {
      Toast.show({
        type: "error",
        text1: "Item not found!",
      });
      router.back();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white flex" edges={["top"]}>
      <StatusBar style="dark" />

      <View className="space-y-1 mx-4 mt-4">
        <View className="flex flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-2 justify-center items-center pr-1 rounded-full"
            style={{ width: hp(4.5), height: hp(4.5) }}
          >
            <Ionicons name="arrow-back" size={hp(4)} color="#1F2123" />
          </TouchableOpacity>
          <View className="w-6 h-6 rounded flex justify-center items-center">
            <Image
              source={{ uri: `${passwordItem?.siteUrl}/favicon.ico` }}
              width={22}
              height={22}
              placeholder={require("../assets/images/earth.png")}
            />
          </View>
          <Text
            style={{ fontSize: hp(3.5) }}
            className="text-neutral-700 font-semibold ml-2 tracking-wide"
          >
            {passwordItem?.name}
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
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const { copiedText, copyToClipboard } = useCopyToClipboard();

  return (
    <View className="space-y-2 rounded-2xl shadow-lg border border-neutral-500 bg-white overflow-hidden p-3 mb-3">
      {/* Site Url */}
      <View>
        <Text
          style={{ fontSize: hp(2.2) }}
          className="text-neutral-700 font-semibold ml-2 tracking-wide mb-1"
        >
          Site Url
        </Text>
        <TextInput
          style={{ fontSize: hp(2.0) }}
          className="bg-gray-200 text-neutral-700 font-semibold py-2 px-4 rounded-2xl"
          readOnly
          value={siteUrl}
        />
      </View>

      {/* Username */}
      <View>
        <Text
          style={{ fontSize: hp(2.2) }}
          className="text-neutral-700 font-semibold ml-2 tracking-wide mb-1"
        >
          Username
        </Text>
        <View className="flex flex-row items-center bg-gray-200 py-2 px-4 rounded-2xl">
          <TextInput
            style={{ fontSize: hp(2.0) }}
            className="text-neutral-700 font-semibold w-11/12"
            readOnly
            value={item.username}
          />
          <TouchableOpacity
            onPress={() => copyToClipboard(item.username, "Username")}
          >
            <MaterialIcons name="content-copy" size={20} color="#1F2123" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Password */}
      <View>
        <Text
          style={{ fontSize: hp(2.2) }}
          className="text-neutral-700 font-semibold ml-2 tracking-wide mb-1"
        >
          Password
        </Text>
        <View className="flex flex-row items-center justify-between bg-gray-200 py-2 px-4 rounded-2xl">
          <TextInput
            style={{ fontSize: hp(2.0) }}
            className="text-neutral-700 font-semibold w-10/12"
            readOnly
            value={item.password}
            secureTextEntry={passwordVisibility}
          />
          <View className="flex flex-row items-center space-x-1">
            <TouchableOpacity onPress={handlePasswordVisibility}>
              <Ionicons name={rightIcon} size={20} color="#1F2123" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => copyToClipboard(item.password, "Password")}
            >
              <MaterialIcons name="content-copy" size={20} color="#1F2123" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Note */}
      <View>
        <Text
          style={{ fontSize: hp(2.2) }}
          className="text-neutral-700 font-semibold ml-2 tracking-wide mb-1"
        >
          Note
        </Text>
        <TextInput
          style={{ fontSize: hp(2.0), textAlignVertical: "top" }}
          className="bg-gray-200 text-neutral-700 font-semibold py-2 px-4 rounded-2xl"
          multiline={true}
          numberOfLines={4}
          readOnly
          value={item.note}
        />
      </View>
    </View>
  );
};
