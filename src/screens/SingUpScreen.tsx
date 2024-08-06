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

const signUpSchema = yup.object({
  firstName: yup.string().required("First name is required").trim(),
  lastName: yup.string().required("Last name is required").trim(),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email")
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must have at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match")
})

type SignUpData = yup.InferType<typeof signUpSchema>

const SignUpScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const [errorMessage, setErrorMessage] = useState("")

  const submit = async (dataForm: SignUpData) => {
    const { email, password, firstName, lastName } = dataForm
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName
        }
      }
    })

    if (error) {
      setErrorMessage(error.message)
    } else {
      navigation.navigate("SignInScreen")
    }
  }

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signUpSchema)
  })

  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar style="auto" />

      {errorMessage && <Text>{errorMessage}</Text>}
      <FormInputController
        name="firstName"
        placeholder="First Name"
        control={control as unknown as Control<FieldValues>}
        errors={errors}
      />

      <FormInputController
        name="lastName"
        placeholder="Last Name"
        control={control as unknown as Control<FieldValues>}
        errors={errors}
      />

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

      <FormInputController
        name="confirmPassword"
        placeholder="Confirm password"
        control={control as unknown as Control<FieldValues>}
        errors={errors}
        props={{
          secureTextEntry: true
        }}
      />

      <Button title="Submit" onPress={handleSubmit(submit)} />

      <View>
        <Text className="text-lg">Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignInScreen")
            reset()
            clearErrors()
          }}
        >
          <Text className="text-lg">Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUpScreen
