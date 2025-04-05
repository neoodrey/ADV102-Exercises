import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, Text, View } from 'react-native';

const LoginForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View style={{ padding: 20 }}>
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
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 5,
                paddingLeft: 10,
              }}
              placeholder="Email"
            />
          )}
        />
        {errors.email && <Text style={{ color: 'red' }}>{errors.email?.message}</Text>}
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
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 5,
                paddingLeft: 10,
              }}
              placeholder="Password"
              secureTextEntry
            />
          )}
        />
        {errors.password && <Text style={{ color: 'red' }}>{errors.password?.message}</Text>}
      </View>

      {/* Submit Button */}
      <View>
        <Button title="Login" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default LoginForm;
