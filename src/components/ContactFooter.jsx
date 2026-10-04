import React, { useState } from 'react';
import { Mail, Youtube, Copy, Check, Send, Sparkles, MapPin, Loader2, AlertCircle } from 'lucide-react';

export function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
  });

  // Updated to the user's requested email address
  const emailAddress = 'arai32350@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Direct email dispatch to arai32350@gmail.com via FormSubmit AJAX service
      const response = await fetch(`https://formsubmit.co/ajax/${emailAddress}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          'Project Format': formData.projectType,
          'Timeline / Budget': formData.budget,
          'Project Notes / Creative Vision': formData.message,
          _subject: `New Project Inquiry: ${formData.projectType} from ${formData.name}`,
          _replyto: formData.email,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true || data.message)) {
        setFormSubmitted(true);
      } else {
        throw new Error(data.message || 'Delivery error. Please try direct mail.');
      }
    } catch (err) {
      console.warn('Form submission notice:', err);
      // Helpful fallback in case adblocker or strict network blocks third-party endpoints
      setSubmitError('Unable to send automatically via network. Please click the button below to launch your email client:');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pre-formatted mailto fallback link with all fields
  const mailtoFallback = `mailto:${emailAddress}?subject=${encodeURIComponent(
    `Project Inquiry: ${formData.projectType} - ${formData.name || 'Client'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nProject Format: ${formData.projectType}\nTimeline/Budget: ${formData.budget}\n\nProject Notes:\n${formData.message}`
  )}`;

  return (
    <footer id="contact" className="pt-16 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Contact Section Header */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-2.5 h-2.5 rounded-full bg-[#C86D51]"></div>
        <h2 className="font-display font-bold text-xl sm:text-2xl text-[#2A211D] tracking-tight">
          WORK WITH ANUSHKA
        </h2>
        <div className="h-px bg-[#DFCEBE]/80 flex-1 ml-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        
        {/* LEFT COLUMN: Direct Info & Social Hub (5 cols) */}
        <div 
          id="contact-info-panel"
          className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-white"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C86D51]/10 text-[#A84E32] border border-[#C86D51]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>LET'S WORK TOGETHER</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#2A211D] tracking-tight">
                Have a project in mind?
              </h3>
              <p className="text-sm text-[#5A483E] leading-relaxed">
                Whether you need sharp brand reels, AI-driven video campaigns, or story-driven travel edits, let's connect and make it happen.
              </p>
            </div>

            {/* Email Direct Box with Copy Button */}
            <div className="p-4 rounded-2xl bg-white/70 border border-white/80 space-y-2">
              <span className="text-[11px] font-bold text-[#7A675B] uppercase tracking-wider block">
                Direct Inquiries & Project Pitches
              </span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${emailAddress}`}
                  className="font-mono font-medium text-xs sm:text-sm text-[#2A211D] hover:text-[#C86D51] transition-colors truncate"
                >
                  {emailAddress}
                </a>
                <button
                  id="copy-email-btn"
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF4EE] border border-[#DFCEBE] text-xs font-semibold text-[#45362E] flex items-center gap-1.5 shadow-xs transition-all cursor-pointer shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#C86D51]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* YouTube Co-Creation Showcase */}
            <a
              id="footer-youtube-card"
              href="https://youtube.com/@Explorersx2"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 border border-white/90 hover:border-[#C86D51]/40 flex items-center justify-between gap-3 group transition-all duration-200 shadow-xs hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <Youtube className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-bold text-xs sm:text-sm text-[#2A211D]">
                    @Explorersx2
                  </div>
                  <div className="text-[11px] text-[#7A675B]">
                    Travel Series & Cinematic Field Vlogs
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#C86D51] group-hover:underline">
                Visit Channel &rarr;
              </span>
            </a>
          </div>

          <div className="mt-8 pt-4 border-t border-white/60 flex items-center gap-2 text-xs text-[#7A675B]">
            <MapPin className="w-3.5 h-3.5 text-[#C86D51]" />
            <span>Available for Remote Projects Worldwide</span>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Inquiry Form (7 cols) */}
        <div 
          id="contact-form-panel"
          className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-white"
        >
          {formSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 sm:p-8 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="font-display font-bold text-xl sm:text-2xl text-[#2A211D]">
                Inquiry Sent to Anushka's Inbox!
              </h4>
              <p className="text-sm text-[#5A483E] max-w-md">
                Thank you for reaching out, <strong>{formData.name || 'there'}</strong>. Your project brief has been sent to <strong>{emailAddress}</strong>. Anushka will review your notes and reply directly to <strong>{formData.email}</strong> within 24 hours.
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setSubmitError(null);
                  setFormData({
                    name: '',
                    email: '',
                    projectType: '',
                    budget: '',
                    message: '',
                  });
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white border border-[#DFCEBE] text-[#2A211D] hover:bg-[#FAF4EE] cursor-pointer transition-colors shadow-xs"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-display font-bold text-lg text-[#2A211D]">
                  Quick Project Inquiry
                </h4>
                <span className="text-[11px] text-[#7A675B]">Sends email to {emailAddress}</span>
              </div>

              {submitError && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-[#5A483E] space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={mailtoFallback}
                      className="px-3 py-1.5 rounded-lg bg-[#C86D51] text-white text-[11px] font-semibold hover:bg-[#B85D41] inline-flex items-center gap-1 shadow-xs"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Open Pre-filled Email</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitError(null)}
                      className="px-2.5 py-1.5 rounded-lg bg-white/80 border border-[#DFCEBE] text-[11px] text-[#45362E] hover:bg-white"
                    >
                      Retry Form
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-[#45362E]">
                    Your Name / Brand
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Chen"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-white focus:outline-none focus:ring-2 focus:ring-[#C86D51]/40 text-xs text-[#2A211D] placeholder:text-[#A8988C]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-[#45362E]">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-white focus:outline-none focus:ring-2 focus:ring-[#C86D51]/40 text-xs text-[#2A211D] placeholder:text-[#A8988C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-project-type" className="block text-xs font-semibold text-[#45362E]">
                    Project Format
                  </label>
                  <input
                    id="contact-project-type"
                    type="text"
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    placeholder="e.g. 9:16 Reel, YouTube Vlog, Commercial Ad"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-white focus:outline-none focus:ring-2 focus:ring-[#C86D51]/40 text-xs text-[#2A211D] placeholder:text-[#A8988C]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-budget" className="block text-xs font-semibold text-[#45362E]">
                    Timeline / Budget
                  </label>
                  <input
                    id="contact-budget"
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g. 1-2 weeks, Flexible, Retainer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-white focus:outline-none focus:ring-2 focus:ring-[#C86D51]/40 text-xs text-[#2A211D] placeholder:text-[#A8988C]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-xs font-semibold text-[#45362E]">
                  Project Notes or Creative Vision
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your brand, reference links, target audience, or desired delivery date..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 border border-white focus:outline-none focus:ring-2 focus:ring-[#C86D51]/40 text-xs text-[#2A211D] placeholder:text-[#A8988C] resize-none"
                ></textarea>
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#C86D51] to-[#A84E32] hover:from-[#B85D41] hover:to-[#964026] disabled:opacity-75 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Inquiry to Anushka...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Project Brief to {emailAddress}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Bottom Copyright & Aesthetic Colophon */}
      <div className="mt-12 pt-6 border-t border-[#DFCEBE]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A675B]">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-[#2A211D]">ANUSHKA RAI</span>
          <span>&bull;</span>
          <span>Video Editor & AI Video Creator</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <a href="#hero-bento" className="hover:text-[#C86D51] transition-colors">
            Back to Top &uarr;
          </a>
        </div>
      </div>

    </footer>
  );
}
