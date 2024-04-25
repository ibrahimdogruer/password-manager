import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useSecureStore, useTogglePasswordVisibility } from "../hooks";
import { Image } from "expo-image";
import { useForm, Controller } from "react-hook-form";
import uuid from "react-native-uuid";
import Toast from "react-native-toast-message";

const AddNew = () => {
  const router = useRouter();
  const { save, getValueFor } = useSecureStore();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      siteUrl: "",
      username: "",
      password: "",
      note: "",
    },
  });

  const onSubmit = async (values) => {
    const passwords = await getValueFor("passwords");

    let data = {
      id: uuid.v4(),
      name: values.name,
      siteUrl: values.siteUrl,
      accounts: [
        {
          id: uuid.v4(),
          username: values.username,
          password: values.password,
          note: values.note,
        },
      ],
    };

    let jsonPasswords = [];
    if (passwords) {
      jsonPasswords = JSON.parse(passwords);
    }

    jsonPasswords.push(data);
    save("passwords", JSON.stringify(jsonPasswords))
      .then(() => {
        reset();
        Toast.show({
          type: "success",
          text1: `Password added!`,
        });
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: `An error occured!`,
        });
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-white flex" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <StatusBar style="dark" />
        <ScrollView>
          <View className="space-y-3 mx-4 mt-4">
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center">
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="mr-2 justify-center items-center pr-1 rounded-full"
                  style={{ width: hp(4.5), height: hp(4.5) }}
                >
                  <Ionicons name="arrow-back" size={hp(4)} color="#1F2123" />
                </TouchableOpacity>
                <Text
                  style={{ fontSize: hp(3.5) }}
                  className="text-neutral-700 font-semibold ml-2 tracking-wide"
                >
                  Add New Password
                </Text>
              </View>

              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className="justify-center items-center rounded-full"
                // style={{ width: hp(4.5), height: hp(4.5) }}
              >
                <Text
                  style={{ fontSize: hp(2.5) }}
                  className="font-bold tracking-wider text-sky-600"
                >
                  Save
                </Text>
                {/* <Ionicons name="checkmark-sharp" size={hp(3.75)} color="#1F2123" /> */}
              </TouchableOpacity>
            </View>

            <View className="space-y-2 rounded-2xl shadow-lg border border-neutral-500 bg-white overflow-hidden p-3">
              {/* Name */}
              <View>
                <Text
                  style={{ fontSize: hp(2.2) }}
                  className="text-neutral-700 font-semibold ml-2 tracking-wide mb-1"
                >
                  Name
                </Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{ fontSize: hp(2.0) }}
                      className="bg-gray-200 text-neutral-700 font-semibold py-2 px-4 rounded-2xl"
                      placeholder="Name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="name"
                />
                {errors.siteName && (
                  <Text
                    className="ml-2 mt-1 text-rose-600"
                    style={{ fontSize: hp(1.75) }}
                  >
                    This field is required.
                  </Text>
                )}
              </View>

              {/* Site Url */}
              <View>
                <Text
                  style={{ fontSize: hp(2.2) }}
                  className="text-neutral-700 font-semibold ml-2 tracking-wide mb-1"
                >
                  Site Url
                </Text>
                <Controller
                  control={control}
                  rules={{
                    maxLength: 100,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{ fontSize: hp(2.0) }}
                      className="bg-gray-200 text-neutral-700 font-semibold py-2 px-4 rounded-2xl"
                      placeholder="Site url"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                    />
                  )}
                  name="siteUrl"
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
                <Controller
                  control={control}
                  rules={{
                    maxLength: 100,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="flex flex-row items-center bg-gray-200 py-2 px-4 rounded-2xl">
                      <TextInput
                        style={{ fontSize: hp(2.0) }}
                        className="text-neutral-700 font-semibold w-11/12"
                        placeholder="Username"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                      />
                    </View>
                  )}
                  name="username"
                />
              </View>

              {/* Password */}
              <View>
                <Text
                  style={{ fontSize: hp(2.2) }}
                  className="text-neutral-700 font-semibold ml-2 tracking-wide mb-1"
                >
                  Password
                </Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="flex flex-row items-center justify-between bg-gray-200 py-2 px-4 rounded-2xl">
                      <TextInput
                        style={{ fontSize: hp(2.0) }}
                        className="text-neutral-700 font-semibold w-10/12"
                        secureTextEntry={passwordVisibility}
                        placeholder="Password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                      />
                      <View className="flex flex-row items-center space-x-1">
                        <TouchableOpacity onPress={handlePasswordVisibility}>
                          <Ionicons
                            name={rightIcon}
                            size={20}
                            color="#1F2123"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  name="password"
                />
                {errors.password && (
                  <Text
                    className="ml-2 mt-1 text-rose-600"
                    style={{ fontSize: hp(1.75) }}
                  >
                    This field is required.
                  </Text>
                )}
              </View>

              {/* Note */}
              <View>
                <Text
                  style={{ fontSize: hp(2.2) }}
                  className="text-neutral-700 font-semibold ml-2 tracking-wide mb-1"
                >
                  Note
                </Text>
                <Controller
                  control={control}
                  rules={{
                    maxLength: 256,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{ fontSize: hp(2.0), textAlignVertical: "top" }}
                      className="bg-gray-200 text-neutral-700 font-semibold py-2 px-4 rounded-2xl"
                      multiline={true}
                      numberOfLines={4}
                      placeholder="Note"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="note"
                />
              </View>
            </View>

            {/* <View className="flex flex-row items-center justify-end">
          <TouchableOpacity
            onPress={() => {}}
            className="border border-neutral-500 justify-center items-center rounded-full px-8 py-1.5"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold tracking-wider text-neutral-700"
            >
              Save
            </Text>
          </TouchableOpacity>
        </View> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddNew;
