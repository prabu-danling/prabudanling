"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wand2, Mic, Moon, BarChart3, Sparkles, Trophy,
  QrCode, Award, Radio, Brain, Copy, Check, Loader2,
  Play, Square
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const features = [
  { id: "ai-writer", name: "AI Writing Assistant", icon: Wand2, color: "text-dream-gold" },
  { id: "voice", name: "Voice to Poetry", icon: Mic, color: "text-dream-blue" },
  { id: "dream-ai", name: "Dream Interpretation", icon: Moon, color: "text-dream-purple" },
  { id: "analytics", name: "Reading Analytics", icon: BarChart3, color: "text-dream-green" },
  { id: "recommend", name: "Smart Recommendations", icon: Sparkles, color: "text-dream-gold" },
  { id: "challenges", name: "Writing Challenges", icon: Trophy, color: "text-dream-blue" },
  { id: "qr", name: "Magic QR Share", icon: QrCode, color: "text-dream-purple" },
  { id: "nft", name: "NFT Certificate", icon: Award, color: "text-dream-green" },
  { id: "live", name: "Live Reading Room", icon: Radio, color: "text-dream-gold" },
  { id: "mindmap", name: "Mind Map Writing", icon: Brain, color: "text-dream-blue" },
];

// AI Writing Assistant Component
function AIWritingAssistant() {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("puisi");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/ai/writing-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type }),
      });
      
      const data = await response.json();
      if (data.success) {
        setSuggestions(data.data.suggestions);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (index: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {["puisi", "esai", "cerpen"].map((t) => (
          <Button
            key={t}
            variant={type === t ? "default" : "outline"}
            size="sm"
            onClick={() => setType(t)}
            className={cn(type === t && "bg-dream-gold/90 hover:bg-dream-gold text-background")}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </div>
      
      <Textarea
        placeholder="Tuliskan ide atau tema yang ingin dikembangkan..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-32"
      />
      
      <Button
        onClick={handleGenerate}
        disabled={isLoading || !prompt}
        className="bg-dream-gold/90 hover:bg-dream-gold text-background"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Menulis...
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4 mr-2" />
            Generate
          </>
        )}
      </Button>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <h4 className="font-medium text-sm text-muted-foreground">Saran AI:</h4>
            {suggestions.map((suggestion, i) => (
              <Card key={i} className="bg-card/30 border-border/30">
                <CardContent className="p-4">
                  <pre className="whitespace-pre-wrap font-serif text-sm leading-relaxed mb-3">
                    {suggestion}
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(i, suggestion)}
                  >
                    {copied === i ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Tersalin
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Salin
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Voice to Poetry Component
function VoiceToPoetry() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [poem, setPoem] = useState("");

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setTranscript("");
      setIsRecording(true);
      // Simulate recording
      setTimeout(() => {
        setTranscript("Malam ini aku bermimpi tentang laut yang tenang");
        setIsRecording(false);
      }, 3000);
    }
  };

  const convertToPoem = async () => {
    if (!transcript) return;
    setIsProcessing(true);
    
    await new Promise(r => setTimeout(r, 1500));
    
    setPoem(`Malam ini aku bermimpi
tentang laut yang tenang

Di sana gelombang berbisik
tentang rahasia yang terpendam

Dan aku, seorang penantang
menunggu fajar menjelma`);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <Button
          size="lg"
          className={cn(
            "w-20 h-20 rounded-full",
            isRecording 
              ? "bg-red-500 hover:bg-red-600 animate-pulse" 
              : "bg-dream-blue/90 hover:bg-dream-blue"
          )}
          onClick={toggleRecording}
        >
          {isRecording ? (
            <Square className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </Button>
        <p className="text-sm text-muted-foreground">
          {isRecording ? "Mendengarkan..." : "Klik untuk mulai berbicara"}
        </p>
      </div>

      {transcript && (
        <Card className="bg-card/30 border-border/30">
          <CardContent className="p-4">
            <p className="text-sm mb-4">{transcript}</p>
            <Button onClick={convertToPoem} disabled={isProcessing} variant="outline">
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Mengubah ke puisi...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Ubah ke Puisi
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {poem && (
        <Card className="bg-dream-purple/5 border-dream-purple/20">
          <CardContent className="p-6">
            <pre className="whitespace-pre-wrap font-serif text-center leading-relaxed">
              {poem}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Dream Interpretation Component
function DreamInterpretation() {
  const [dreamContent, setDreamContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [interpretation, setInterpretation] = useState<{
    summary: string;
    symbols: { symbol: string; meaning: string }[];
    archetype: string;
    guidance: string;
  } | null>(null);

  const handleInterpret = async () => {
    if (!dreamContent) return;
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/ai/dream-interpretation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dreamContent }),
      });
      
      const data = await response.json();
      if (data.success) {
        setInterpretation(data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Textarea
        placeholder="Ceritakan mimpi Anda dengan detail..."
        value={dreamContent}
        onChange={(e) => setDreamContent(e.target.value)}
        className="min-h-40"
      />
      
      <Button
        onClick={handleInterpret}
        disabled={isLoading || !dreamContent}
        className="bg-dream-purple/90 hover:bg-dream-purple text-background"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Menafsirkan...
          </>
        ) : (
          <>
            <Moon className="w-4 h-4 mr-2" />
            Tafsirkan Mimpi
          </>
        )}
      </Button>

      <AnimatePresence>
        {interpretation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card className="bg-dream-purple/5 border-dream-purple/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-dream-purple/20 text-dream-purple">
                    {interpretation.archetype}
                  </Badge>
                </div>
                <p className="font-serif leading-relaxed">{interpretation.summary}</p>
              </CardContent>
            </Card>

            <Card className="bg-card/30 border-border/30">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Simbol dalam Mimpi:</h4>
                <div className="space-y-2">
                  {interpretation.symbols.map((s, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-dream-purple font-medium">{s.symbol}</span>
                      <span className="text-muted-foreground">{s.meaning}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dream-gold/5 border-dream-gold/20">
              <CardContent className="p-4">
                <h4 className="font-medium text-dream-gold mb-2">Panduan:</h4>
                <p className="text-sm">{interpretation.guidance}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// QR Code Generator
function QRCodeGenerator() {
  const [workTitle, setWorkTitle] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [copied, setCopied] = useState(false);

  const generateQR = () => {
    const code = `SA-${Date.now().toString(36).toUpperCase()}`;
    setQrCode(code);
  };

  return (
    <div className="space-y-6">
      <Input
        placeholder="Judul karya untuk QR code"
        value={workTitle}
        onChange={(e) => setWorkTitle(e.target.value)}
      />
      
      <Button
        onClick={generateQR}
        disabled={!workTitle}
        className="bg-dream-purple/90 hover:bg-dream-purple"
      >
        <QrCode className="w-4 h-4 mr-2" />
        Generate QR Magic
      </Button>

      {qrCode && (
        <Card className="bg-card/30 border-border/30">
          <CardContent className="p-6 text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 25 }).map((_, i) => {
                  // Deterministic pattern based on index (no Math.random for SSR consistency)
                  const isFilled = (i * 7 + 3) % 3 !== 0;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "w-4 h-4 rounded-sm",
                        isFilled ? "bg-black" : "bg-white"
                      )}
                    />
                  );
                })}
              </div>
            </div>
            <p className="font-mono text-sm mb-4">{qrCode}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(qrCode);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Tersalin
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Salin Kode
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Writing Challenges
function WritingChallenges() {
  const challenges = [
    { id: 1, title: "500 Kata Pagi", target: 500, progress: 320, reward: "Badge Dawn Writer" },
    { id: 2, title: "7 Hari Streak", target: 7, progress: 5, reward: "Badge Consistency" },
    { id: 3, title: "3 Puisi Bulan Ini", target: 3, progress: 1, reward: "Badge Poet" },
  ];

  return (
    <div className="space-y-4">
      {challenges.map((challenge) => (
        <Card key={challenge.id} className="bg-card/30 border-border/30">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium">{challenge.title}</h4>
                <p className="text-sm text-muted-foreground">{challenge.reward}</p>
              </div>
              <Badge variant="outline">
                {challenge.progress}/{challenge.target}
              </Badge>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-dream-gold transition-all duration-500"
                style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Main Futuristic Features Page
export default function FuturisticFeaturesPage() {
  const [activeFeature, setActiveFeature] = useState("ai-writer");

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case "ai-writer":
        return <AIWritingAssistant />;
      case "voice":
        return <VoiceToPoetry />;
      case "dream-ai":
        return <DreamInterpretation />;
      case "qr":
        return <QRCodeGenerator />;
      case "challenges":
        return <WritingChallenges />;
      default:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-dream-gold/10 flex items-center justify-center mx-auto mb-4">
              {features.find(f => f.id === activeFeature) && (
                (() => {
                  const Icon = features.find(f => f.id === activeFeature)!.icon;
                  return <Icon className="w-8 h-8 text-dream-gold" />;
                })()
              )}
            </div>
            <h3 className="font-serif-display text-xl mb-2">
              {features.find(f => f.id === activeFeature)?.name}
            </h3>
            <p className="text-muted-foreground mb-4">
              Fitur ini sedang dalam pengembangan
            </p>
            <Badge variant="outline">Coming Soon</Badge>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-serif-display text-3xl mb-2">
            Fitur Futuristik
          </h1>
          <p className="text-muted-foreground">
            10 fitur canggih untuk pengalaman menulis masa depan
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              {features.map((feature) => {
                const Icon = feature.icon;
                const isActive = activeFeature === feature.id;
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                      isActive
                        ? "bg-dream-gold/10 text-dream-gold border border-dream-gold/20"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", feature.color)} />
                    <span className="text-sm font-medium">{feature.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="bg-card/30 border-border/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {features.find(f => f.id === activeFeature)?.icon && (
                        (() => {
                          const Icon = features.find(f => f.id === activeFeature)!.icon;
                          return <Icon className={cn("w-5 h-5", features.find(f => f.id === activeFeature)?.color)} />;
                        })()
                      )}
                      {features.find(f => f.id === activeFeature)?.name}
                    </CardTitle>
                    <CardDescription>
                      Fitur canggih untuk meningkatkan pengalaman menulis Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderFeatureContent()}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
