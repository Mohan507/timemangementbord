"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if (res?.error) {
      setError("Invalid email or password")
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE - FORM */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50 px-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-2">
            Welcome back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Remember me
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE - BRAND PANEL */}
      <div className="w-1/2 bg-blue-600 text-white flex items-center justify-center px-16">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6">ticktock</h1>
          <p className="text-blue-100 leading-relaxed">
            Introducing ticktock, our cutting-edge timesheet web
            application designed to revolutionize how you manage
            employee work hours. With ticktock, you can effortlessly
            track and monitor employee attendance and productivity
            from anywhere, anytime.
          </p>
        </div>
      </div>
    </div>
  )
}