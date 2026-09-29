'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toAssistantCard } from '@/lib/ai-api';
import type { AssistantDatasetCard, ChatResponse } from '@/lib/ai-types';
import { useDiscoveryChat, useAiWorkspace } from '@/hooks/use-discovery-assistant';
import { DEMO_MODE } from '@/lib/demo-story';
import { getDemoChatResponse } from '@/lib/demo-ai-responses';
import { GlassCard } from '@/components/site/section';
import { Button } from '@/components/ui/button';
import {
  Bot, X, Maximize2, Minimize2, Send, Terminal, Search, BookOpen,
  RefreshCw, Copy, Download, Layers, Cpu,
} from 'lucide-react';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  type?: string;
  data?: AssistantDatasetCard[];
  response?: ChatResponse;
}

const SUGGESTIONS = [
  'Find agricultural datasets for Masvingo',
  'Show agriculture data for Masvingo',
  'Generate a Python API example',
  'Find datasets suitable for RAG',
  'Historical documents in Shona',
  'Population statistics by province',
];

export function DiscoveryAssistant({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [selectedLang, setSelectedLang] = useState('python');
  const [selectedApi, setSelectedApi] = useState<'rest' | 'graphql'>('rest');

  const bottomRef = useRef<HTMLDivElement>(null);
  const chatMutation = useDiscoveryChat();
  const { data: workspace } = useAiWorkspace();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatMutation.isPending]);

  const sendUserMessage = async (text: string) => {
    if (!text.trim() || chatMutation.isPending) return;

    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInputMsg('');

    try {
      let response: ChatResponse;
      if (DEMO_MODE) {
        await new Promise((r) => setTimeout(r, 600));
        response = getDemoChatResponse(text);
      } else {
        response = await chatMutation.mutateAsync({ message: text, sessionId });
      }
      setSessionId(response.session_id);
      const cards = response.results.map(toAssistantCard);

      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: response.text,
          type: response.response_type,
          data: cards,
          response,
        },
      ]);
    } catch {
      const response = getDemoChatResponse(text);
      setSessionId(response.session_id);
      const cards = response.results.map(toAssistantCard);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: response.text,
          type: response.response_type,
          data: cards,
          response,
        },
      ]);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/50 backdrop-blur-sm z-[90]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={`fixed right-0 top-0 bottom-0 z-[100] bg-[#060b18]/98 border-l border-border/80 flex flex-col md:flex-row shadow-glow select-none ${
              isFullscreen ? 'left-0' : 'w-full md:w-[450px] lg:w-[500px]'
            }`}
          >
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between bg-card/20 relative z-10">
                <div>
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    <Bot className="h-4.5 w-4.5 text-primary animate-pulse" />
                    AI Applications Assistant
                  </h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5 max-w-[280px] sm:max-w-md truncate">
                    Discover datasets, generate APIs, SDKs, and build AI solutions with sovereign data.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AI ONLINE
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hidden md:inline-flex" onClick={() => setIsFullscreen(!isFullscreen)}>
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 relative">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center h-full max-w-sm mx-auto">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/30 bg-primary/5 text-primary shadow-glow animate-pulse">
                      <Bot className="h-6 w-6" />
                    </div>
                    <h4 className="text-base font-extrabold text-foreground mt-5">What would you like to build today?</h4>
                    <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                      Type a query or select a prompt to search sovereign datasets with semantic AI.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => sendUserMessage(s)}
                          className="text-[10px] font-mono border border-border/80 bg-secondary/35 text-slate-300 hover:text-primary hover:border-primary/45 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {messages.map((msg, idx) => {
                      const isUser = msg.sender === 'user';
                      const resp = msg.response;

                      return (
                        <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                            isUser ? 'bg-primary text-primary-foreground font-semibold shadow-soft'
                              : 'bg-secondary/40 border border-border/60 text-slate-300 shadow-glow'
                          }`}>
                            <p>{msg.text}</p>

                            {!isUser && msg.type === 'dataset' && msg.data && (
                              <div className="mt-4 space-y-4">
                                {msg.data.map((dataset) => (
                                  <GlassCard key={dataset.id} className="p-4 border-border/60 bg-card/60" hover={false}>
                                    <div className="flex justify-between items-start border-b border-border/50 pb-2.5">
                                      <div>
                                        <h5 className="text-[11px] font-bold text-foreground">{dataset.name}</h5>
                                        <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest">{dataset.provider}</span>
                                      </div>
                                      <span className="text-[8px] font-mono font-bold bg-primary/10 border border-primary/20 text-primary px-1.5 py-0.5 rounded">
                                        {dataset.similarityScore}% Match
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">{dataset.desc}</p>
                                    <div className="mt-3 grid grid-cols-3 gap-2 text-[9px] font-mono text-slate-400">
                                      <div><span className="block text-[8px] uppercase text-muted-foreground">Records</span><span className="font-semibold text-foreground">{dataset.records}</span></div>
                                      <div><span className="block text-[8px] uppercase text-muted-foreground">Quality</span><span className="font-semibold text-emerald-400">{dataset.qualityScore}%</span></div>
                                      <div><span className="block text-[8px] uppercase text-muted-foreground">AI Ready</span><span className="font-semibold text-primary">{dataset.llmScore}%</span></div>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-1">
                                      {dataset.formats.map((f) => (
                                        <span key={f} className="text-[8px] border border-border/60 px-1.5 py-0.5 rounded">{f}</span>
                                      ))}
                                    </div>
                                  </GlassCard>
                                ))}
                              </div>
                            )}

                            {!isUser && msg.type === 'code' && resp && (
                              <div className="mt-4 space-y-3">
                                {resp.sdk_code && (
                                  <>
                                    <div className="flex border-b border-border/60 pb-2 gap-3 text-[10px] font-mono text-muted-foreground">
                                      <span className="text-primary border-b border-primary pb-1">{resp.sdk_language ?? 'python'}</span>
                                    </div>
                                    <pre className="bg-[#0b1329] p-3 rounded-lg border border-border/60 text-[10px] font-mono text-foreground overflow-x-auto whitespace-pre">{resp.sdk_code}</pre>
                                    <Button size="sm" variant="outline" className="text-[9px] h-7" onClick={() => handleCopyCode(resp.sdk_code!)}>
                                      <Copy className="h-3 w-3 mr-1" /> Copy Script
                                    </Button>
                                  </>
                                )}
                                {(resp.rest_example || resp.graphql_example) && (
                                  <>
                                    <div className="flex border-b border-border/60 pb-2 gap-3 text-[10px] font-mono">
                                      <button onClick={() => setSelectedApi('rest')} className={selectedApi === 'rest' ? 'text-primary border-b border-primary pb-1' : 'text-muted-foreground'}>REST</button>
                                      <button onClick={() => setSelectedApi('graphql')} className={selectedApi === 'graphql' ? 'text-primary border-b border-primary pb-1' : 'text-muted-foreground'}>GraphQL</button>
                                    </div>
                                    <pre className="bg-[#0b1329] p-3 rounded-lg border border-border/60 text-[10px] font-mono overflow-x-auto whitespace-pre">
                                      {selectedApi === 'rest' ? resp.rest_example : resp.graphql_example}
                                    </pre>
                                  </>
                                )}
                              </div>
                            )}

                            {!isUser && msg.type === 'readiness' && msg.data && (
                              <div className="mt-4 space-y-3">
                                {msg.data.map((d) => (
                                  <div key={d.id} className="bg-secondary/30 border border-border/60 p-3 rounded-lg text-[10px] font-mono">
                                    <div className="flex justify-between items-center mb-2">
                                      <span className="font-bold text-foreground truncate max-w-[150px]">{d.name}</span>
                                      <span className="text-primary font-bold">{d.llmScore}% Ready</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary/80 rounded-full overflow-hidden">
                                      <div className="h-full bg-primary" style={{ width: `${d.llmScore}%` }} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {!isUser && msg.type === 'architecture' && resp?.architecture && (
                              <div className="mt-4 space-y-3">
                                {resp.architecture.map((arch) => (
                                  <div key={arch.pattern} className="bg-secondary/30 border border-border/60 p-3 rounded-lg">
                                    <div className="flex items-center gap-2 text-[11px] font-bold text-foreground">
                                      <Cpu className="h-3.5 w-3.5 text-primary" /> {arch.title}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground mt-1">{arch.description}</p>
                                    <div className="mt-2 flex flex-wrap gap-1">
                                      {arch.components.map((c) => (
                                        <span key={c} className="text-[8px] border border-primary/30 bg-primary/5 px-1.5 py-0.5 rounded">{c}</span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {!isUser && msg.type === 'notebook' && resp?.notebook_download_url && (
                              <div className="mt-4">
                                <Button size="sm" variant="outline" className="text-[9px] h-8 gap-1.5" asChild>
                                  <a href={`${process.env.NEXT_PUBLIC_CONNECTOR_API_URL ?? 'http://127.0.0.1:8000'}${resp.notebook_download_url}`} download>
                                    <Download className="h-3 w-3" /> Download Notebook (.ipynb)
                                  </a>
                                </Button>
                              </div>
                            )}

                            {!isUser && resp?.explanations && resp.explanations.length > 0 && msg.type === 'dataset' && (
                              <div className="mt-4 border-t border-border/40 pt-3 space-y-2">
                                <span className="text-[9px] font-mono uppercase text-muted-foreground">Why this dataset?</span>
                                <p className="text-[10px] text-muted-foreground">{resp.explanations[0].why_this_dataset}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {chatMutation.isPending && (
                      <div className="flex justify-start">
                        <div className="bg-secondary/35 border border-border/60 rounded-2xl px-4 py-3 flex items-center gap-2 text-xs text-muted-foreground font-mono">
                          <RefreshCw className="h-3.5 w-3.5 animate-spin text-primary" />
                          Embedding prompt → semantic search → ranking results...
                        </div>
                      </div>
                    )}
                    <div ref={bottomRef} />
                  </div>
                )}
              </div>

              <div className="px-5 py-4 border-t border-border/60 bg-card/25 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask the Data Assistant..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendUserMessage(inputMsg)}
                  className="flex-1 bg-secondary/35 border border-border/80 focus:border-primary/45 rounded-xl h-10 px-3.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none font-mono"
                />
                <Button size="icon" onClick={() => sendUserMessage(inputMsg)} disabled={chatMutation.isPending} className="h-10 w-10 shrink-0 rounded-xl shadow-glow">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {isFullscreen && (
              <div className="w-full md:w-[280px] border-t md:border-t-0 md:border-l border-border/70 p-5 bg-card/10 flex flex-col justify-between overflow-y-auto">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-2.5">Workspace</h4>
                  <div className="space-y-4 mt-5 text-[10px] font-mono text-slate-300">
                    <div className="bg-secondary/30 p-3 rounded-lg border border-border/60">
                      <span className="text-[8px] uppercase tracking-wider text-slate-400 block">Saved Searches</span>
                      <span className="font-bold text-foreground">{workspace?.saved_searches.length ?? 0}</span>
                    </div>
                    <div className="bg-secondary/30 p-3 rounded-lg border border-border/60">
                      <span className="text-[8px] uppercase tracking-wider text-slate-400 block">Saved Datasets</span>
                      <span className="font-bold text-primary">{workspace?.saved_datasets.length ?? 0}</span>
                    </div>
                    <div className="bg-secondary/30 p-3 rounded-lg border border-border/60">
                      <span className="text-[8px] uppercase tracking-wider text-slate-400 block">Collections</span>
                      <span className="font-bold text-foreground">{workspace?.collections.length ?? 0}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/50 text-[10px] font-mono text-slate-400 space-y-2">
                  <a href="/marketplace" className="block hover:text-primary transition-colors">Browse Marketplace</a>
                  <a href="/developers#api-playground" className="block hover:text-primary transition-colors">API Playground</a>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
