import { StatusBar } from "expo-status-bar"
import { Text, View, Button, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useForm, Control, FieldValues } from "react-hook-form"
import { RootStackParamList } from "../../App"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import FormInputController from "../components/FormInputController"
import { supabase } from "../lib/supabase"
import { useState } from "react"

export const signInSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email")
    .trim(),
  password: yup.string().required("Password is required")
})

type SignInData = yup.InferType<typeof signInSchema>

export default function SignInScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const [errorMessage, setErrorMessage] = useState("")

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signInSchema)
  })

  const submit = async (dataForm: SignInData) => {
    const { email, password } = dataForm
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setErrorMessage(error.message)
    } else {
      navigation.navigate("HomeScreen")
    }
  }

  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar style="auto" />
      {errorMessage && (
        <Text className="mb-2 text-lg text-red-500">{errorMessage}</Text>
      )}
      <FormInputController
        name="email"
        placeholder="Email"
        control={control as unknown as Control<FieldValues>}
        errors={errors}
      />

      <FormInputController
        name="password"
        placeholder="Password"
        control={control as unknown as Control<FieldValues>}
        errors={errors}
        props={{
          secureTextEntry: true
        }}
      />

      <Button title="Submit" onPress={handleSubmit(submit)} />

      <View>
        <Text className="text-lg">Do not have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUpScreen")
            clearErrors()
            reset()
          }}
        >
          <Text className="text-lg">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
