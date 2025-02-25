import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const RegisterForm: React.FC = () => {

  const form = useForm()

  return (
    <Form {...form}>
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
      <Button type="submit" className='w-full'>Register</Button>
    </Form>
  )
}

export default RegisterForm;
