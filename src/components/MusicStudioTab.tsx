import React, { useState } from 'react';
import { Language } from '../types';
import { Music, Sparkles, Loader2, Play, Radio } from 'lucide-react';

interface MusicStudioTabProps {
  language: Language;
}

export const MusicStudioTab: React.FC<MusicStudioTabProps> = ({ language }) => {
  const [prompt, setPrompt] = useState('Calming sitar and soothing bansuri flute melody for senior relaxation and meditation.');
  const [model, setModel] = useState<'lyria-3-clip-preview' | 'lyria-3-pro-preview'>('lyria-3-clip-preview');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const presets = [
    language === 'hi' ? 'शांतिपूर्ण बांसुरी और सितार धुन' : 'Soothing Bansuri Flute & Sitar',
    language === 'hi' ? 'शाम की शांत आरती और भजन धुन' : 'Devotional Evening Ambient Bhajan',
    language === 'hi' ? 'सुबह की सैर के लिए हल्की धुन' : 'Gentle Morning Walk Melody',
  ];

  const handleGenerateMusic = async () => {
    setLoading(true);
    setError(null);
    setAudioUrl(null);
    setLyrics(null);

    try {
      const res = await fetch('/api/ai/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model }),
      });
      const data = await res.json();
      if (data.audioBase64) {
        const binaryString = atob(data.audioBase64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
        setAudioUrl(URL.createObjectURL(blob));
        if (data.lyrics) setLyrics(data.lyrics);
      } else {
        setError(data.error || 'Music generation returned no audio.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error generating music.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center">
          <Music className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            {language === 'hi' ? 'संगीत और भजन जनरेटर (Lyria Music Studio)' : 'Therapeutic & Devotional Music Studio (Lyria)'}
          </h3>
          <p className="text-sm text-slate-600">
            {language === 'hi' ? 'बुजुर्गों के मानसिक सुकून के लिए गूगल लिरिया मॉडल से संगीत बनाएं।' : 'Generate soothing tracks or devotional clips using lyria-3-clip-preview'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Music Style / Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-teal-700"
              placeholder="Describe music mood..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Quick Presets</label>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(preset)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-teal-900 hover:text-white text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Duration Model</label>
            <div className="flex gap-4">
              <button
                onClick={() => setModel('lyria-3-clip-preview')}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs border ${
                  model === 'lyria-3-clip-preview' ? 'bg-teal-900 text-white border-teal-900' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Lyria Clip (~30s)
              </button>
              <button
                onClick={() => setModel('lyria-3-pro-preview')}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs border ${
                  model === 'lyria-3-pro-preview' ? 'bg-teal-900 text-white border-teal-900' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Lyria Pro (Full Track)
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerateMusic}
            disabled={loading}
            className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-black text-base rounded-xl shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Composing Lyria Music...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Music Track</span>
              </>
            )}
          </button>

          {error && <p className="text-xs text-red-600 font-bold">{error}</p>}
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[320px] text-center text-white">
          {audioUrl ? (
            <div className="w-full space-y-4">
              <div className="w-16 h-16 bg-amber-500 text-teal-950 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
                <Radio className="w-8 h-8" />
              </div>
              <p className="font-bold text-lg">Pranaam Care Relaxing Track</p>
              <audio controls src={audioUrl} className="w-full" />
              {lyrics && (
                <div className="bg-slate-800 p-3 rounded-xl text-xs text-slate-300 text-left">
                  <p className="font-bold text-amber-400 mb-1">Generated Metadata & Lyrics:</p>
                  <p>{lyrics}</p>
                </div>
              )}
              <a
                href={audioUrl}
                download="pranaam_care_music.wav"
                className="inline-block px-4 py-2 bg-amber-500 hover:bg-amber-600 text-teal-950 font-bold text-xs rounded-lg"
              >
                Download Audio WAV
              </a>
            </div>
          ) : (
            <div className="text-slate-400 space-y-3 p-6">
              <Music className="w-12 h-12 mx-auto opacity-40 text-amber-400" />
              <p className="text-sm font-medium">Generated music will be ready to play here.</p>
              <p className="text-xs text-slate-500">Created via Google Lyria-3 API.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
