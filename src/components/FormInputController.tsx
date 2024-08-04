import { View, Text, TextInput, TextInputProps } from "react-native"
import { Controller } from "react-hook-form"
import type { Control, FieldErrors, FieldValues } from "react-hook-form"

interface FormInputControllerProps {
  name: string
  control: Control<FieldValues>
  errors?: FieldErrors<FieldValues>
  placeholder: string
  props?: TextInputProps
}

const FormInputController = ({
  name,
  control,
  errors,
  placeholder,
  props
}: FormInputControllerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <View className="w-[90%]">
          {errors && errors?.[name] && (
            <Text className="text-red-500">
              {String(errors[name]?.message)}
            </Text>
          )}
          <TextInput
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...props}
            className="mb-3 rounded-3xl border-2 px-3 text-lg"
          />
        </View>
      )}
    />
  )
}

export default FormInputController
