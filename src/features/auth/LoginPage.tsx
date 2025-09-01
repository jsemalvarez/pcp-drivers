import { useState } from "react";
import { loginWithEmailPassword } from "../../app/firebase/authProvider";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    await loginWithEmailPassword({email, password}); 
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary to-secondary">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg py-12 px-6 mx-4">
        <h1 className="text-2xl font-bold text-center text-primary mb-6">
          Login Chofer
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-primary text-white font-semibold rounded-xl shadow cursor-pointer"
          >
            Ingresar
          </button>
        </form>

      </div>
    </main>
  );
}
