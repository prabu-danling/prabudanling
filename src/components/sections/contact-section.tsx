"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Send, MapPin, MessageSquare, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Pesan Terkirim",
      description: "Terima kasih telah menghubungi. InsyaAllah akan dibalas segera.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={containerRef}
      id="kontak"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-card" />
      
      {/* Decorative elements */}
      <motion.div
        style={{ y }}
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-dream-gold/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y }}
        className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-dream-purple/5 rounded-full blur-3xl"
      />

      <motion.div style={{ y }} className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-dream-gold" />
              <span className="text-sm text-dream-gold tracking-widest uppercase">
                Menyapa
              </span>
            </div>
            <h2 className="font-serif-display text-fluid-2xl mb-6">
              Hubungi
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Punya pertanyaan, ingin berkolaborasi, atau sekadar ingin menyapa?
              Silakan tuliskan pesan Anda.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8">
              
              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:col-span-2 space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-dream-gold/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-dream-gold" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-sm text-muted-foreground">
                        santri.angon@email.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-dream-blue/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-dream-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Lokasi</h4>
                      <p className="text-sm text-muted-foreground">
                        Indonesia
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <Card className="bg-card/30 border-border/30">
                  <CardContent className="p-4">
                    <p className="text-sm italic text-muted-foreground">
                      &ldquo;Setiap pesan adalah jembatan antara dua jiwa yang belum bertemu.&rdquo;
                    </p>
                  </CardContent>
                </Card>

                {/* Social links */}
                <div className="pt-4">
                  <p className="text-xs text-muted-foreground mb-3">
                    Ikuti perjalanan:
                  </p>
                  <div className="flex gap-2">
                    {["Twitter", "Instagram", "Medium"].map((platform) => (
                      <Button
                        key={platform}
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs"
                      >
                        {platform}
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="md:col-span-3"
              >
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Nama
                          </label>
                          <Input
                            name="name"
                            placeholder="Nama Anda"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-background/50 border-border/50"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Email
                          </label>
                          <Input
                            name="email"
                            type="email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="bg-background/50 border-border/50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Subjek
                        </label>
                        <Input
                          name="subject"
                          placeholder="Apa yang ingin dibahas?"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="bg-background/50 border-border/50"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Pesan
                        </label>
                        <Textarea
                          name="message"
                          placeholder="Tuliskan pesan Anda..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="bg-background/50 border-border/50 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-dream-gold/90 hover:bg-dream-gold text-background"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Kirim Pesan
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

            </div>
          </div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-20"
          >
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4 text-dream-gold" />
              <span>
                Dibuat dengan cinta untuk mereka yang mencari makna
              </span>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
