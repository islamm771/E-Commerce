"use client"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import InputErrorMessage from "@/components/ui/InputErrorMessage"
import { Register_FORM } from "@/data"
import Image from "next/image"
import Link from "next/link"
import { ChangeEvent, SubmitEvent, useState } from "react"
import toast from "react-hot-toast"
import { FcGoogle } from "react-icons/fc"

const RegisterPage = () => {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    form: ""
  })


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    setErrors({
      username: "",
      email: "",
      password: "",
      form: ""
    })

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        body: JSON.stringify(form)
      })

      const result = await res.json();

      if (!res.ok) {
        throw new Error(`${result.message}`);
      }

      window.location.replace("/login")

    } catch (error) {
      if (error instanceof Error) {
        setErrors(prev => ({ ...prev, form: error.message }))
      } else {
        toast.error("Somthing went wrong")
      }
    } finally {
      setIsLoading(false)
    }
    setForm({
      username: "",
      email: "",
      password: ""
    })
  }

  const renderRegisterForm = Register_FORM.map((input, idx) => (
    <div key={idx}>
      <Input placeholder={input.placeholder} type={input.type} name={input.name}
        value={form[input.name]} onChange={handleInputChange} />
      {errors[input.name] && <InputErrorMessage msg={errors[input.name]} />}
    </div>
  ))

  return (
    <div className="grid grid-cols-1 md:grid-cols-12" style={{ height: "calc(100vh - 69px)" }}>
      <div className="hidden md:block md:col-span-6 xl:col-span-5">
        <Image className="w-full h-full object-cover" src="/imgs/side-img.png" loading="eager" alt="login-img" width={150} height={150} />
      </div>
      <div className="md:col-span-6 xl:col-span-7 flex items-center justify-center p-8">
        <form className="w-full md:w-100 space-y-4" onSubmit={handleSubmit}>
          <div className="mb-8!">
            <h2 className="text-3xl font-semibold mb-2">Create an account</h2>
            <p className="">Enter your details below</p>
          </div>
          {renderRegisterForm}
          {errors.form && <InputErrorMessage msg={errors.form} />}
          <div>
            <Button width="full" isLoading={isLoading}>Sign up</Button>
            <button className="mt-3 border border-black w-full px-4 py-3.5 text-sm flex items-center justify-center gap-2 rounded-sm font-medium">
              <FcGoogle size={20} /> Sign up with Google
            </button>
          </div>

          <p className="text-center text-gray-600">
            Already have an account? <Link className="text-gray-800 font-medium border-b-2 border-gray-600" href="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage