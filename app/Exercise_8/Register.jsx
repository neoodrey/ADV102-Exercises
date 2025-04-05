import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, Text, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const RegistrationForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
  };

  // Function to handle picking an image using Expo Image Picker
  const pickImage = async () => {
    // Request permission to access the camera roll
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access media library is required!');
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // If the user picks an image, set the image state
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Image Picker */}
      <View style={styles.imagePickerContainer}>
        <Button title="Pick an image" onPress={pickImage} />
        
        {/* Display the image preview after user uploads it */}
        {image && (
          <Image
            source={{ uri: image }}  // This ensures the image URI is passed correctly
            style={styles.imagePreview}
          />
        )}
      </View>

      {/* Email Input */}
      <View style={{ marginBottom: 10 }}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <TextInput
              {...field}
              style={styles.input}
              placeholder="Email"
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email?.message}</Text>}
      </View>

      {/* Password Input */}
      <View style={{ marginBottom: 10 }}>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password should be at least 6 characters long",
            },
          }}
          render={({ field }) => (
            <TextInput
              {...field}
              style={styles.input}
              placeholder="Password"
              secureTextEntry
            />
          )}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password?.message}</Text>}
      </View>

      {/* Submit Button */}
      <View>
        <Button title="Register" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  imagePickerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imagePreview: {
    width: 200,  // Increased width
    height: 200, // Increased height
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
  },
});

export default RegistrationForm;
