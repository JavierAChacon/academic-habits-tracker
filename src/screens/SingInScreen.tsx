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
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    console.log(data, error)
  }

  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar style="auto" />

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
