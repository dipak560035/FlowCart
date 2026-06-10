"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  MoreHorizontal,
  Search,
  Bell,
  Settings,
} from "lucide-react";
import { CHART_DATA, PRODUCTS } from "@/lib/data";
import { formatPrice, formatNumber } from "@/lib/utils";
import Link from "next/link";

const STAT_CARDS = [
  {
    label: "Total Revenue",
    value: "$1.08M",
    change: "+23.5%",
    up: true,
    icon: TrendingUp,
    color: "#e8ff47",
  },
  {
    label: "Total Orders",
    value: "8,940",
    change: "+18.2%",
    up: true,
    icon: ShoppingBag,
    color: "#4747ff",
  },
  {
    label: "Customers",
    value: "52,341",
    change: "+9.1%",
    up: true,
    icon: Users,
    color: "#47ffb4",
  },
  {
    label: "Products",
    value: "214",
    change: "-2.3%",
    up: false,
    icon: Package,
    color: "#ff7847",
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl p-3 shadow-xl">
        <p className="text-[#888] text-xs mb-2">{label}</p>
        <p className="font-display font-bold text-white text-sm">{formatPrice(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [chartType, setChartType] = useState<"area" | "bar">("area");

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Sidebar */}
      <div className="flex">
        <aside className="hidden lg:flex flex-col w-64 fixed top-0 left-0 bottom-0 bg-[#111] border-r border-[#1a1a1a] p-6">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="w-7 h-7 bg-[#e8ff47] rounded flex items-center justify-center">
              <Zap size={14} className="text-[#080808]" fill="#080808" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              Flow<span className="text-[#e8ff47]">Cart</span>
            </span>
          </Link>

          <nav className="space-y-1">
            {[
              { label: "Overview", active: true },
              { label: "Orders", active: false },
              { label: "Products", active: false },
              { label: "Customers", active: false },
              { label: "Analytics", active: false },
              { label: "Settings", active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-[#e8ff47]/10 text-[#e8ff47] border border-[#e8ff47]/20"
                    : "text-[#555] hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto">
            <div className="p-4 bg-[#1a1a1a] rounded-2xl">
              <p className="text-[#888] text-xs mb-2">Storage Used</p>
              <div className="w-full bg-[#222] rounded-full h-1.5 mb-2">
                <div className="h-1.5 bg-[#e8ff47] rounded-full" style={{ width: "68%" }} />
              </div>
              <p className="text-white text-xs font-medium">6.8 GB / 10 GB</p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 lg:ml-64 p-6 lg:p-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-[#555] text-sm mt-1">Welcome back, Admin ✦</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
                <input
                  placeholder="Search..."
                  className="bg-[#111] border border-[#1a1a1a] rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#2e2e2e] w-48"
                />
              </div>
              <button className="p-2.5 bg-[#111] border border-[#1a1a1a] rounded-xl text-[#555] hover:text-white transition-colors">
                <Bell size={16} />
              </button>
              <button className="p-2.5 bg-[#111] border border-[#1a1a1a] rounded-xl text-[#555] hover:text-white transition-colors">
                <Settings size={16} />
              </button>
              <div className="w-8 h-8 bg-[#e8ff47] rounded-xl flex items-center justify-center">
                <span className="text-[#080808] font-display font-bold text-xs">A</span>
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {STAT_CARDS.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-5 hover:border-[#2e2e2e] transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#555] text-xs font-medium">{stat.label}</span>
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon size={14} style={{ color: stat.color }} />
                  </div>
                </div>
                <div className="font-display font-bold text-2xl text-white mb-2">{stat.value}</div>
                <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? "text-green-400" : "text-red-400"}`}>
                  {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.change} vs last month
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid xl:grid-cols-3 gap-6 mb-8">
            {/* Revenue Chart */}
            <div className="xl:col-span-2 bg-[#111] border border-[#1a1a1a] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-bold text-white">Revenue Overview</h3>
                  <p className="text-[#555] text-xs mt-0.5">Full year 2025</p>
                </div>
                <div className="flex items-center gap-2">
                  {(["area", "bar"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setChartType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                        chartType === type
                          ? "bg-[#e8ff47]/10 text-[#e8ff47] border border-[#e8ff47]/20"
                          : "text-[#555] hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={220}>
                {chartType === "area" ? (
                  <AreaChart data={CHART_DATA}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e8ff47" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#e8ff47" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                    <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="revenue" stroke="#e8ff47" strokeWidth={2} fill="url(#revenueGrad)" dot={false} />
                  </AreaChart>
                ) : (
                  <BarChart data={CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                    <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="revenue" fill="#e8ff47" radius={[4, 4, 0, 0]} opacity={0.8} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Top Stats */}
            <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6">
              <h3 className="font-display font-bold text-white mb-6">Monthly Orders</h3>
              <div className="space-y-4">
                {CHART_DATA.slice(-5).reverse().map((d) => (
                  <div key={d.month} className="flex items-center gap-3">
                    <span className="text-[#555] text-xs w-8">{d.month}</span>
                    <div className="flex-1 bg-[#1a1a1a] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-[#e8ff47] rounded-full"
                        style={{ width: `${(d.orders / 1450) * 100}%` }}
                      />
                    </div>
                    <span className="text-white text-xs font-medium w-10 text-right">{d.orders}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-[#e8ff47]/5 border border-[#e8ff47]/15 rounded-xl">
                <p className="text-[#e8ff47] text-xs font-bold mb-1">Peak Month</p>
                <p className="font-display font-bold text-white text-xl">December</p>
                <p className="text-[#888] text-xs mt-0.5">1,450 orders · $167K revenue</p>
              </div>
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
              <div>
                <h3 className="font-display font-bold text-white">Product Performance</h3>
                <p className="text-[#555] text-xs mt-0.5">{PRODUCTS.length} products total</p>
              </div>
              <button className="text-[#555] hover:text-white transition-colors p-1">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1a1a1a]">
                    {["Product", "Category", "Price", "Reviews", "Status"].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-[#555] text-xs font-medium uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((product, i) => (
                    <tr
                      key={product.id}
                      className="border-b border-[#0e0e0e] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-[#1a1a1a] rounded-xl flex items-center justify-center text-lg">
                            {product.image}
                          </div>
                          <div>
                            <p className="font-display font-semibold text-white text-sm">{product.name}</p>
                            {product.tag && (
                              <span className="text-[10px] text-[#e8ff47] font-bold">{product.tag}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#888] text-sm">{product.category}</td>
                      <td className="px-6 py-4">
                        <span className="font-display font-bold text-white text-sm">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-[#555] text-xs line-through ml-2">{formatPrice(product.originalPrice)}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-[#888] text-sm">{product.reviews.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                            product.inStock
         








































// "use client";

// import { useState } from "react";
// import { ArrowRight, Check } from "lucide-react";

// export default function Newsletter() {
//   const [email, setEmail] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email) return;
//     setSubmitted(true);
//   };

//   return (
//     <section className="py-24 border-t border-[#1a1a1a]">
//       <div className="max-w-2xl mx-auto px-6 text-center">
//         <p className="text-[#e8ff47] text-xs font-bold tracking-[0.2em] uppercase mb-4">Stay in the Loop</p>
//         <h2 className="font-display text-4xl font-bold text-white mb-4">
//           Get Early Access to<br />New Drops
//         </h2>
//         <p className="text-[#888] mb-10">
//           Join 40,000+ subscribers. No spam, only launches and rare deals.
//         </p>

//         {submitted ? (
//           <div className="flex flex-col items-center gap-3">
//             <div className="w-14 h-14 bg-[#e8ff47]/10 rounded-full flex items-center justify-center">
//               <Check size={24} className="text-[#e8ff47]" />
//             </div>
//             <p className="font-display font-bold text-white text-xl">You're in!</p>
//             <p className="text-[#888] text-sm">Welcome to the inner circle. Watch your inbox.</p>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="your@email.com"
//               className="flex-1 bg-[#111] border border-[#222] rounded-xl px-5 py-4 text-white placeholder-[#444] focus:outline-none focus:border-[#e8ff47]/50 transition-colors text-sm"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-[#e8ff47] text-[#080808] font-display font-bold px-6 py-4 rounded-xl hover:bg-[#c8df2a] transition-colors flex items-center gap-2 group whitespace-nowrap"
//             >
//               Subscribe
//               <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
//             </button>
//           </form>
//         )}

//         <p className="text-[#333] text-xs mt-6">
//           By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
//         </p>
//       </div>
//     </section>
//   );
// }
