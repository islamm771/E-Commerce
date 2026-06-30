"use client"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import InputErrorMessage from "@/components/ui/InputErrorMessage"
import { LOGIN_FORM } from "@/data"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, SubmitEvent, useState } from "react"
import toast from "react-hot-toast"

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: ""
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }))
  }



  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({
      email: "",
      password: "",
      form: ""
    })
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        ...form,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Email or password is incorrect");
      }
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setErrors(prev => ({ ...prev, form: error.message }))
      }
      else {
        toast.error("Somthing went wrong")
      }
    } finally {
      setIsLoading(false);
    }
  }


  const renderLoginForm = LOGIN_FORM.map((input, idx) => (
    <div key={idx}>
      <Input placeholder={input.placeholder} type={input.type} name={input.name}
        value={form[input.name]} onChange={handleInputChange} />
      {errors[input.name] && <InputErrorMessage msg={errors[input.name]} />}
    </div>
  ))

  return (
    <div className="grid grid-cols-1 md:grid-cols-12" style={{ height: "calc(100vh - 69px)" }}>
      <div className="hidden md:block md:col-span-6 xl:col-span-5">
        <Image className="w-full h-full" src="/imgs/side-img.png" alt="login-img" loading="eager" width={150} height={150} />
      </div>
      <div className="md:col-span-6 xl:col-span-7 flex items-center justify-center p-8">
        <form className="w-full md:w-100 space-y-4" onSubmit={handleSubmit}>
          <div className="mb-8!">
            <h2 className="text-3xl font-semibold mb-2">Log in to Exclusive</h2>
            <p className="">Enter your details below</p>
          </div>
          {renderLoginForm}
          {errors.form && <InputErrorMessage msg={errors.form} />}
          <Button width={"full"} isLoading={isLoading}>Login</Button>
          <p className="text-center text-gray-600">
            Don&apos;t have an account ?{" "}
            <Link href="/register"
              className="text-gray-800 font-medium border-b-2 border-gray-600">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage