"use client"
import InputErrorMessage from "@/components/ui/InputErrorMessage";
import { updateProfile } from "@/services/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, SubmitEvent, useState } from "react";
import toast from "react-hot-toast";
import Button from "../ui/button";

interface IUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
}

interface IProps {
  user?: IUser;
}

interface IErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ProfileForm = ({ user }: IProps) => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<IErrors>({});

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      const fieldErrors = error?.response?.data?.errors;
      if (fieldErrors) setErrors(fieldErrors);
      else toast.error("Something went wrong");
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const payload: Record<string, string> = {
      firstName: form.firstName,
      lastName: form.lastName,
      address: form.address,
    };

    // بيبعت الـ password fields بس لو واحدة منهم مش فاضية
    if (form.currentPassword || form.newPassword || form.confirmPassword) {
      payload.currentPassword = form.currentPassword;
      payload.newPassword = form.newPassword;
      payload.confirmPassword = form.confirmPassword;
    }

    await mutateAsync(payload);
  };

  const handleCancel = () => {
    setForm({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      address: user?.address || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  const inputClass = "block rounded-sm bg-neutral-100 p-2 border-none text-md w-full mt-1 focus:outline-none";

  return (
    <form className="grid gap-8" onSubmit={handleSubmit}>

      {/* Name */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-20">
        <div>
          <label htmlFor="firstName">First Name</label>
          <input className={inputClass} type="text" id="firstName"
            name="firstName" value={form.firstName}
            onChange={handleChange} placeholder="Enter First Name" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input className={inputClass} type="text" id="lastName"
            name="lastName" value={form.lastName}
            onChange={handleChange} placeholder="Enter Last Name" />
        </div>
      </div>

      {/* Email & Address */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-20">
        <div>
          <label htmlFor="email">Email</label>
          <input className={`${inputClass} opacity-50 cursor-not-allowed`}
            type="email" id="email" value={user?.email || ""} readOnly />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input className={inputClass} type="text" id="address"
            name="address" value={form.address}
            onChange={handleChange} placeholder="Enter Address" />
        </div>
      </div>

      {/* Password */}
      <div>
        <label>Password Changes</label>
        <div className="space-y-3 mt-1">
          <div>
            <input className={inputClass} type="password"
              name="currentPassword" value={form.currentPassword}
              onChange={handleChange} placeholder="Current Password" />
            {errors.currentPassword && <InputErrorMessage msg={errors.currentPassword} />}
          </div>
          <div>
            <input className={inputClass} type="password"
              name="newPassword" value={form.newPassword}
              onChange={handleChange} placeholder="New Password" />
            {errors.newPassword && <InputErrorMessage msg={errors.newPassword} />}
          </div>
          <div>
            <input className={inputClass} type="password"
              name="confirmPassword" value={form.confirmPassword}
              onChange={handleChange} placeholder="Confirm New Password" />
            {errors.confirmPassword && <InputErrorMessage msg={errors.confirmPassword} />}
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <button type="button" onClick={handleCancel}
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
          Cancel
        </button>
        <Button isLoading={isPending}>Save Changes</Button>
      </div>

    </form>
  )
}

export default ProfileForm