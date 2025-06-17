
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Controller, FieldValues, Control, Path } from "react-hook-form"

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>; // Replace with the correct type for your control
    name: Path<T>;
    label?: string;
    placeholder?: string;
    type?: "number" | "email" | "password" | "text";
}

const FormField = <T extends FieldValues>({ control, name, label, placeholder, type = "text"}: FormFieldProps<T>) => {
  return (
    <Controller 
        name={name} 
        control={control} 
        render={({ field }) => (
            <FormItem>
                <FormLabel className="label">{label}</FormLabel>
                <FormControl>
                    <Input className="input" placeholder={placeholder} {...field} type={type} />
                </FormControl>
                <FormDescription>
                    This is your public display name.
                </FormDescription>
                <FormMessage />
            </FormItem>
            )
        }
        />
    )
}

export default FormField