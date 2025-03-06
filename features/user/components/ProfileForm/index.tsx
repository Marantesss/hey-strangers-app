"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserData } from "@/features/user/models/User";
import { User as AuthUser } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import updateProfileAction from "../../actions/update-profile";

const SELECTABLE_CITIES = [
  {
    id: 'lisbon',
    name: "Lisbon",
  },
  {
    id: 'porto',
    name: "Porto",
  },
] as const

interface ProfileFormProps {
  authUser: AuthUser
  user: UserData
}

type ProfileFormData = {
  fullName: string
  email: string
  phone: string
  city: string
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, authUser }) => {
  const form = useForm<ProfileFormData>({
    defaultValues: {
      fullName: user.full_name ?? '',
      email: authUser.email ?? '',
      phone: authUser.phone ?? '',
      city: user.city ?? '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(updateProfileAction)} className="space-y-6">

      {/* <FormField
        name="profilePicture"
        render={() => (
          <FormItem>
            <FormLabel>
              Profile Picture
            </FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
              />
              <Avatar>
                <AvatarImage src={authUser.user_metadata.avatar_url} />
                <AvatarFallback>
                  {authUser.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder='Full Name'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder='Email'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone number
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder='Phone number'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                City
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SELECTABLE_CITIES.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full'>Update Profile</Button>
      </form>
    </Form>
  )
}

export default ProfileForm;
