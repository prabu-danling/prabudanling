"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Feather, Eye, EyeOff, Loader2, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useMemberStore } from "@/lib/store/member-store";
import { cn } from "@/lib/utils";

const tiers = [
  { id: "free", name: "Free", price: "Gratis", features: ["Akses semua karya", "Bookmark 10 karya", "Newsletter"] },
  { id: "supporter", name: "Supporter", price: "Rp 50K/bulan", features: ["Semua fitur Free", "Bookmark unlimited", "Reading insights", "Badge supporter"] },
  { id: "patron", name: "Patron", price: "Rp 150K/bulan", features: ["Semua fitur Supporter", "Early access", "AI writing assistant", "Badge patron"] },
  { id: "legend", name: "Legend", price: "Rp 500K/bulan", features: ["Semua fitur Patron", "Personal mentoring", "NFT certificate", "Badge legend"] },
];

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  
  const { login } = useMemberStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password tidak cocok");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, username: username || undefined, password }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || "Pendaftaran gagal");
        return;
      }

      login(data.data.member, data.data.token);
      window.location.href = "/member/profile";
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dream-purple/5 via-background to-dream-gold/5" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-lg"
      >
        {/* Back button */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </a>

        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 rounded-2xl bg-dream-purple/10 flex items-center justify-center mx-auto mb-4">
              <Feather className="w-8 h-8 text-dream-purple" />
            </div>
            <CardTitle className="font-serif-display text-2xl">
              Bergabung dengan Portal Kesadaran
            </CardTitle>
            <CardDescription>
              Mulai perjalanan spiritual dan literasi Anda
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-4">
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    step >= s
                      ? "bg-dream-gold text-background"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nama Lengkap</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Nama Anda"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Username */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Username <span className="text-muted-foreground">(opsional)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                      <Input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    className="w-full bg-dream-gold/90 hover:bg-dream-gold text-background"
                    onClick={() => setStep(2)}
                    disabled={!name || !email}
                  >
                    Lanjutkan
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimal 6 karakter"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Konfirmasi Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Ulangi password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive"
                    >
                      {error}
                    </motion.p>
                  )}

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Kembali
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-dream-gold/90 hover:bg-dream-gold text-background"
                      disabled={isLoading || !password || password !== confirmPassword}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Memproses...
                        </>
                      ) : (
                        "Daftar"
                      )}
                    </Button>
                  </div>
                </>
              )}
            </form>

            {/* Login link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Sudah punya akun?{" "}
              <a href="/member/login" className="text-dream-gold hover:underline">
                Masuk di sini
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
