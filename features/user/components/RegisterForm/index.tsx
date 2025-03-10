import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const RegisterForm: React.FC = () => {
  const form = useForm({
    values: {
      phone: "",
    },
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone Number
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder='Phone Number'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                We'll send you a text with a confirmation code
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!form.formState.isValid} type="submit" className="w-full">
          Register
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm;
