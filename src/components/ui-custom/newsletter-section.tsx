"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SubscriptionState = "idle" | "loading" | "success" | "error";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubscriptionState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setState("error");
      return;
    }

    setState("loading");

    // Simulate subscription
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setState("success");
    setEmail("");

    // Reset after 5 seconds
    setTimeout(() => setState("idle"), 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-dream-gold/10 via-dream-blue/10 to-dream-purple/10 rounded-2xl blur-sm" />
      
      <div className="relative p-8 sm:p-10 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm">
        <div className="max-w-xl mx-auto text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-14 h-14 rounded-full bg-dream-gold/10 flex items-center justify-center mx-auto mb-6"
          >
            <Mail className="w-6 h-6 text-dream-gold" />
          </motion.div>

          {/* Title */}
          <h3 className="font-serif-display text-2xl mb-3">
            Terima Kabar dari Alam Mimpi
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-6">
            Berlangganan untuk menerima karya terbaru, catatan mimpi, dan refleksi mingguan
            langsung ke emailmu. Tanpa spam, hanya kata-kata yang bermakna.
          </p>

          {/* Form */}
          {state === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-dream-green/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-dream-green" />
              </div>
              <p className="text-dream-green font-medium">
                Terima kasih telah berlangganan!
              </p>
              <p className="text-sm text-muted-foreground">
                Email konfirmasi telah dikirim ke inboxmu.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state === "loading"}
                  className={cn(
                    "h-12 pl-4 pr-10 bg-background/50 border-border/50",
                    state === "error" && "border-destructive"
                  )}
                />
                <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              <Button
                type="submit"
                disabled={state === "loading"}
                className="h-12 px-6 bg-dream-gold/90 hover:bg-dream-gold text-background"
              >
                {state === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Berlangganan
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Privacy note */}
          <p className="text-xs text-muted-foreground mt-4">
            Privasimu dihormati. Email tidak akan dibagikan ke pihak lain.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
