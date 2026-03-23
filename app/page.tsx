'use client';

import { useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useChat } from 'ai/react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Page() {
  const [bulletCount, setBulletCount] = useState(5);
  
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [linkedinBlurb, setLinkedinBlurb] = useState("");
  const [resumeBullets, setResumeBullets] = useState("");
  const [useJobTitle, setUseJobTitle] = useState(true);
  const [useJobDescription, setUseJobDescription] = useState(true);
  const [useLinkedinBlurb, setUseLinkedinBlurb] = useState(false);
  const [useResumeBullets, setUseResumeBullets] = useState(true);
  
  const [wantBullets, setWantBullets] = useState(true);
  const [wantLinkedin, setWantLinkedin] = useState(false);
  
  const [modelMode, setModelMode] = useState("auto");
  const bulletPointsRef = useRef<null | HTMLDivElement>(null);

  const scrollToResults = () => {
    if (bulletPointsRef.current !== null) {
      bulletPointsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    const payload: Record<string, unknown> = {
  bulletCount,
  modelMode,
  outputs: {
    bullets: wantBullets,
    linkedin: wantLinkedin,
  },
};

if (useJobTitle && jobTitle.trim()) payload.jobTitle = jobTitle.trim();
if (useJobDescription && jobDescription.trim()) payload.jobDescription = jobDescription.trim();
if (useLinkedinBlurb && linkedinBlurb.trim()) payload.linkedinBlurb = linkedinBlurb.trim();
if (useResumeBullets && resumeBullets.trim()) payload.resumeBullets = resumeBullets.trim();
    useChat({
      api: '/api/chat',
      onResponse(res) {
        scrollToResults();
        if (res.status === 429) {
          toast.error('You are being rate limited. Please try again later.');
        }
      },
    });

<div className="col-span-full">
  <label htmlFor="bulletCount" className="block font-bold leading-6 text-gray-900">
    Number of bullet options
  </label>
  <div className="mt-2">
    <select
      id="bulletCount"
      value={bulletCount}
      onChange={(e) => setBulletCount(Number(e.target.value))}
      className="w-full rounded-md border px-3 py-2"
    >
      <option value={3}>3</option>
      <option value={5}>5</option>
      <option value={8}>8</option>
    </select>
  </div>
</div>
<div className="col-span-full space-y-3">
  <label className="flex items-center gap-3">
    <input
      type="checkbox"
      checked={useJobTitle}
      onChange={(e) => setUseJobTitle(e.target.checked)}
    />
    Use Job Title
  </label>

  <label className="flex items-center gap-3">
    <input
      type="checkbox"
      checked={useJobDescription}
      onChange={(e) => setUseJobDescription(e.target.checked)}
    />
    Use Job Description
  </label>

  <label className="flex items-center gap-3">
    <input
      type="checkbox"
      checked={useLinkedinBlurb}
      onChange={(e) => setUseLinkedinBlurb(e.target.checked)}
    />
    Use LinkedIn Blurb
  </label>

  <label className="flex items-center gap-3">
    <input
      type="checkbox"
      checked={useResumeBullets}
      onChange={(e) => setUseResumeBullets(e.target.checked)}
    />
    Use Resume Bullets
  </label>
</div>
  const lastMessage = messages[messages.length - 1];
  const generatedPoints =
    lastMessage?.role === 'assistant' ? lastMessage.content : null;

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="w-full">
        <div className="space-y-2 max-w-xl text-center mx-auto py-4 sm:py-8">
          <h1 className="text-4xl font-bold tracking-tighter py-2 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-950 to-gray-500">
            Let AI craft the perfect resume for you in seconds.
          </h1>
          <p className="max-w-[600px] text-zinc-800 md:text-xl mx-auto">
            10,183 bullet points generated so far.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-10 grid grid-cols-1 max-w-xl mx-auto gap-y-4 px-4">
            <div className="col-span-full">
              <label
                htmlFor="sentence"
                className="block font-bold leading-6 text-gray-900"
              >
                Write sentence from your resume
              </label>
              <div className="mt-2">
                <textarea
                  id="sentence"
                  name="sentence"
                  value={input}
                  onChange={handleInputChange}
                  rows={6}
                  className="block w-full rounded-xl resize-y border-0 py-1.5 text-gray-900 shadow-sm ring-1 font-medium ring-inset ring-gray-300 placeholder:font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  placeholder={
                    'Developed web scraping program in Python to help the firm download public data, including over 10,000 company descriptions and stock quotes, enriching internal data and increasing research efficiency by over 50% '
                  }
                  required
                />
              </div>
            </div>
            <div className="col-span-full flex justify-center">
              {!isLoading && (
                <button
                  type="submit"
                  className="relative rounded-full w-full sm:w-auto px-5 py-2.5 overflow-hidden group bg-indigo-600 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-indigo-500 transition-all ease-out duration-300"
                >
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease" />
                  <span className="relative font-semibold">
                    Generate suggestions
                  </span>
                </button>
              )}
              {isLoading && (
                <button
                  className="relative rounded-full min-w-[200px] w-full sm:w-auto px-5 py-2.5 overflow-hidden bg-indigo-500"
                  disabled
                >
                  <span className="loading relative">
                    <span style={{ backgroundColor: 'white' }} />
                    <span style={{ backgroundColor: 'white' }} />
                    <span style={{ backgroundColor: 'white' }} />
                  </span>
                </button>
              )}
            </div>

            <div>
              <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{ duration: 2000 }}
              />
              {generatedPoints && <hr className="h-px bg-gray-500 mt-2 mb-6" />}
              <output>
                {generatedPoints && (
                  <div ref={bulletPointsRef} className="space-y-6">
                    <div>
                      {messages.length >= 2 &&
                        messages[messages.length - 2].role == 'user' && (
                          <div>
                            <h2 className="text-lg font-bold text-slate-900">
                              Your sentence
                            </h2>
                            <p className="font-medium">
                              {messages[messages.length - 2].content}
                            </p>
                          </div>
                        )}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 mb-4">
                        Suggested bullet points
                      </h2>
                      <div className="space-y-6 flex flex-col items-center justify-center max-w-xl">
                        {generatedPoints.split('•').map((generatedSentence) => {
                          const trimmedSentence = generatedSentence.trim();

                          if (
                            trimmedSentence !== '' &&
                            trimmedSentence.length > 3
                          )
                            return (
                              <div
                                className="w-full rounded-xl px-4 py-2 shadow-sm hover:bg-gray-50 transition cursor-copy border"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    trimmedSentence
                                  );
                                  toast.success(
                                    'Sentence copied to clipboard',
                                    {
                                      style: {
                                        fontWeight: 600,
                                      },
                                    }
                                  );
                                }}
                                key={trimmedSentence}
                              >
                                <p className="font-medium">{trimmedSentence}</p>
                              </div>
                            );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </output>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
