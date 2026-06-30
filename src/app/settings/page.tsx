"use client"

import PathElement from "@/components/PathElement"
import SectionHeader from "@/components/ui/SectionHeader"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { FaBell, FaGlobe, FaLock, FaMoon, FaSun, FaTrashAlt } from "react-icons/fa"
import { MdNotifications, MdPrivacyTip } from "react-icons/md"

interface ToggleProps {
  enabled: boolean
  onChange: () => void
}

const Toggle = ({ enabled, onChange }: ToggleProps) => (
  <button
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none
      ${enabled ? "bg-red-500" : "bg-gray-300"}`}
  >
    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300
      ${enabled ? "translate-x-1" : "-translate-x-4"}`} />
  </button>
)



const SettingsPage = () => {
  const { data: session } = useSession()

  const [settings, setSettings] = useState({
    darkMode: false,
    language: "English",
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    smsNotifications: false,
    twoFactor: false,
    profileVisible: true,
  })

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="container mx-auto px-8 xl:px-24 pb-16">
      <PathElement indexPath="Settings" />

      <div className="space-y-10">

        {/* Appearance */}
        <section className="shadow-sm border border-gray-100 rounded-lg p-6">
          <SectionHeader title="Appearance" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.darkMode ? <FaMoon className="text-gray-600" /> : <FaSun className="text-yellow-500" />}
              <div>
                <p className="font-medium text-sm">Dark Mode</p>
                <p className="text-xs text-gray-400">Switch between light and dark theme</p>
              </div>
            </div>
            <Toggle enabled={settings.darkMode} onChange={() => toggle("darkMode")} />
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              <FaGlobe className="text-blue-500" />
              <div>
                <p className="font-medium text-sm">Language</p>
                <p className="text-xs text-gray-400">Select your preferred language</p>
              </div>
            </div>
            <select
              value={settings.language}
              onChange={e => setSettings(prev => ({ ...prev, language: e.target.value }))}
              className="text-sm border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-400"
            >
              <option>English</option>
              <option>Arabic</option>
              <option>French</option>
              <option>Spanish</option>
            </select>
          </div>
        </section>

        {/* Notifications */}
        <section className="shadow-sm border border-gray-100 rounded-lg p-6">
          <SectionHeader title="Notifications" />
          <div className="space-y-5">
            {[
              { key: "emailNotifications", icon: <MdNotifications className="text-red-500" />, label: "Email Notifications", desc: "Receive notifications via email" },
              { key: "orderUpdates", icon: <FaBell className="text-orange-400" />, label: "Order Updates", desc: "Get notified about your order status" },
              { key: "promotions", icon: <FaBell className="text-purple-400" />, label: "Promotions & Offers", desc: "Receive deals and special offers" },
              { key: "smsNotifications", icon: <FaBell className="text-green-500" />, label: "SMS Notifications", desc: "Receive notifications via SMS" },
            ].map(({ key, icon, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {icon}
                  <div>
                    <p className="font-medium text-sm">{label}</p>
                    <p className="text-xs text-gray-400">{desc}</p>
                  </div>
                </div>
                <Toggle
                  enabled={settings[key as keyof typeof settings] as boolean}
                  onChange={() => toggle(key as keyof typeof settings)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Security */}
        <section className="shadow-sm border border-gray-100 rounded-lg p-6">
          <SectionHeader title="Security & Privacy" />
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaLock className="text-red-500" />
                <div>
                  <p className="font-medium text-sm">Two-Factor Authentication</p>
                  <p className="text-xs text-gray-400">Add an extra layer of security</p>
                </div>
              </div>
              <Toggle enabled={settings.twoFactor} onChange={() => toggle("twoFactor")} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MdPrivacyTip className="text-blue-500" />
                <div>
                  <p className="font-medium text-sm">Public Profile</p>
                  <p className="text-xs text-gray-400">Make your profile visible to others</p>
                </div>
              </div>
              <Toggle enabled={settings.profileVisible} onChange={() => toggle("profileVisible")} />
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="shadow-sm border border-red-100 rounded-lg p-6">
          <h5 className="text-sm font-semibold relative pl-6 text-red-600 mb-6
            before:content-[''] before:absolute before:-top-1 before:left-0
            before:w-3 before:h-7 before:bg-red-600 before:rounded-sm">
            Danger Zone
          </h5>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Delete Account</p>
              <p className="text-xs text-gray-400">Permanently delete your account and all data</p>
            </div>
            <button className="flex items-center gap-2 text-sm text-red-500 border border-red-300
              px-4 py-2 rounded-md hover:bg-red-50 transition-colors">
              <FaTrashAlt size={13} />
              Delete
            </button>
          </div>
        </section>

      </div>
    </div>
  )
}

export default SettingsPage