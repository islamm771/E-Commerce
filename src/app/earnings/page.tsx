"use client"

import PathElement from "@/components/PathElement"
import SectionHeader from "@/components/ui/SectionHeader"
import { useSession } from "next-auth/react"
import { FaArrowDown, FaArrowUp, FaCoins, FaShoppingBag, FaWallet } from "react-icons/fa"

// Mock data — هيتبدل بـ API لما يكون جاهز
const transactions = [
  { id: 1, type: "credit", label: "Referral Bonus", amount: 15.00, date: "Jun 28, 2026" },
  { id: 2, type: "debit", label: "Redeemed on Order #12", amount: 10.00, date: "Jun 25, 2026" },
  { id: 3, type: "credit", label: "Cashback — Order #9", amount: 5.50, date: "Jun 20, 2026" },
  { id: 4, type: "credit", label: "Welcome Bonus", amount: 20.00, date: "Jun 15, 2026" },
  { id: 5, type: "debit", label: "Redeemed on Order #7", amount: 20.00, date: "Jun 10, 2026" },
]

const statCards = [
  { icon: <FaWallet size={22} />, label: "Available Balance", value: "$10.50", color: "text-red-500 bg-red-50" },
  { icon: <FaCoins size={22} />, label: "Total Earned", value: "$40.50", color: "text-yellow-500 bg-yellow-50" },
  { icon: <FaShoppingBag size={22} />, label: "Total Redeemed", value: "$30.00", color: "text-purple-500 bg-purple-50" },
]

const EarningsPage = () => {
  const { data: session } = useSession()

  return (
    <div className="container mx-auto px-8 xl:px-24 pb-16">
      <PathElement indexPath="Earnings" />

      {/* Stat Cards */}
      <div className="mb-10">
        <SectionHeader title="Overview" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map(({ icon, label, value, color }) => (
            <div key={label} className="border border-gray-100 shadow-sm rounded-lg p-6 flex items-center gap-4">
              <div className={`p-3 rounded-full ${color}`}>
                {icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Earn */}
      <div className="mb-10">
        <SectionHeader title="How To Earn" />
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { emoji: "👥", title: "Refer a Friend", desc: "Earn $15 for every friend who signs up and places their first order." },
            { emoji: "🛒", title: "Cashback on Orders", desc: "Get up to 5% cashback on every purchase you make." },
            { emoji: "⭐", title: "Write a Review", desc: "Earn $2 for every verified product review you submit." },
          ].map(({ emoji, title, desc }) => (
            <div key={title} className="border border-gray-100 shadow-sm rounded-lg p-5">
              <span className="text-3xl">{emoji}</span>
              <h3 className="font-semibold mt-3 mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <SectionHeader title="Transaction History" />
        <div className="border border-gray-100 shadow-sm rounded-lg overflow-hidden">
          {transactions.map((tx, idx) => (
            <div
              key={tx.id}
              className={`flex items-center justify-between px-6 py-4
                ${idx !== transactions.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-full
                  ${tx.type === "credit" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-400"}`}>
                  {tx.type === "credit" ? <FaArrowDown size={14} /> : <FaArrowUp size={14} />}
                </div>
                <div>
                  <p className="text-sm font-medium">{tx.label}</p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
              </div>
              <span className={`font-semibold text-sm
                ${tx.type === "credit" ? "text-green-500" : "text-red-500"}`}>
                {tx.type === "credit" ? "+" : "-"}${tx.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default EarningsPage