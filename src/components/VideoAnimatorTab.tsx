import React, { useState } from 'react';
import { Language } from '../types';
import { Film, Upload, Sparkles, Loader2, Play } from 'lucide-react';

interface VideoAnimatorTabProps {
  language: Language;
}

export const VideoAnimatorTab: React.FC<VideoAnimatorTabProps> = ({ language }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [prompt, setPrompt] = useState('Gentle golden hour lighting, cherry blossom petals floating around our parents in the Green Park garden, cinematic 4k quality.');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setSelectedImage(result);
      const base64Data = result.split(',')[1];
      setImageBase64(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateVideo = async () => {
    setLoading(true);
    setError(null);
    setVideoUrl(null);

    try {
      const res = await fetch('/api/ai/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageData: imageBase64 || selectedImage?.split(',')[1],
          mimeType,
          aspectRatio,
        }),
      });
      const data = await res.json();
      if (data.videoBase64) {
        const videoBlob = new Blob([Buffer.from(data.videoBase64, 'base64') as any], { type: data.mimeType || 'video/mp4' });
        // Use standard ArrayBuffer conversion for browser compatibility
        const binaryString = atob(data.videoBase64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'video/mp4' });
        setVideoUrl(URL.createObjectURL(blob));
      } else {
        setError(data.error || 'Video generation failed.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Network error during video generation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-teal-900 text-amber-400 rounded-xl flex items-center justify-center">
          <Film className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            {language === 'hi' ? 'माता-पिता की फोटो को वीडियो में बदलें (AI Video)' : 'Animate Parent Photos into Cinematic Video'}
          </h3>
          <p className="text-sm text-slate-600">
            {language === 'hi' ? 'जेमिनी ओमनी फ्लैश मॉडल द्वारा फोटो को जीवंत एनिमेटेड वीडियो बनाएं।' : 'Powered by Gemini Omni Flash (gemini-omni-1.1-flash) via Interactions API'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input Settings */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">1. Upload or Select Parent Photo</label>
            <div className="flex items-center gap-4">
              {selectedImage && (
                <img src={selectedImage} alt="Selected" className="w-24 h-24 rounded-xl object-cover border-2 border-teal-800" />
              )}
              <label className="flex-1 border-2 border-dashed border-slate-300 hover:border-teal-700 p-4 rounded-xl text-center cursor-pointer bg-slate-50 flex flex-col items-center justify-center">
                <Upload className="w-6 h-6 text-teal-700 mb-1" />
                <span className="text-xs font-bold text-slate-700">Choose New Photo</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">2. Motion & Scene Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-teal-700"
              placeholder="Describe motion (e.g. gentle breeze, smiling, sunset glow)..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">3. Video Aspect Ratio</label>
            <div className="flex gap-4">
              <button
                onClick={() => setAspectRatio('16:9')}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs border ${
                  aspectRatio === '16:9' ? 'bg-teal-900 text-white border-teal-900' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Landscape (16:9)
              </button>
              <button
                onClick={() => setAspectRatio('9:16')}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs border ${
                  aspectRatio === '9:16' ? 'bg-teal-900 text-white border-teal-900' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Portrait (9:16)
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerateVideo}
            disabled={loading}
            className="w-full py-4 bg-teal-900 hover:bg-teal-800 text-white font-black text-base rounded-xl shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Cinematic Video (Omni Flash)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Animate Photo into Video</span>
              </>
            )}
          </button>

          {error && <p className="text-xs text-red-600 font-bold">{error}</p>}
        </div>

        {/* Video Output Box */}
        <div className="bg-slate-900 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[320px] text-center">
          {videoUrl ? (
            <div className="w-full space-y-3">
              <video controls autoPlay loop src={videoUrl} className="w-full rounded-xl shadow-lg max-h-[360px] object-contain" />
              <a
                href={videoUrl}
                download="pranaam_care_parent_animation.mp4"
                className="inline-block px-4 py-2 bg-amber-500 hover:bg-amber-600 text-teal-950 font-bold text-xs rounded-lg"
              >
                Download Video MP4
              </a>
            </div>
          ) : (
            <div className="text-slate-400 space-y-3 p-6">
              <Film className="w-12 h-12 mx-auto opacity-40 text-teal-400" />
              <p className="text-sm font-medium">Generated cinematic video will appear here.</p>
              <p className="text-xs text-slate-500">Takes about 15-30 seconds to render via Gemini Omni Flash.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
