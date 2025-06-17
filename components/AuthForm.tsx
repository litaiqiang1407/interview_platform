"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"

import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password must be at least 3 characters"),
  })
}


const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();

    const formSchema = authFormSchema(type)

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    })

    const isSignIn = type === "sign-in"

    function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        if (isSignIn) {
          toast.success("Sign in successful!")
          router.push("/")
          console.log("Signing in with values:", values)
        } else {
          toast.success("Account created successfully! Please sign in.")
          router.push("/sign-in")
          console.log("Signing up with values:", values)
        }
      } catch (error) {
        console.error("Error during form submission:", error)
        toast.error("An error occurred while processing your request. Please try again later.")
      }
    }

    return (
      <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 p-10">
          <div className="flex flex-row gap-2 justify-center ">
            <Image src="/assets/logo.svg" alt="Logo" height={32} width={38}/>
            <h2 className="text-primary-100">PrepWise</h2>
          </div>
          <h3>Practice job interview with AI</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
              {!isSignIn && (
                <FormField
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                />
              )}
              <FormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <FormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
              <Button className="btn" type="submit">{ isSignIn ? 'Sign in' : 'Create an Account'}</Button>
            </form>
          </Form>
          <p className="text-center">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="font-bold text-user-primary ml-1">
              {isSignIn ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </div>
      </div>
    )
}

export default AuthForm