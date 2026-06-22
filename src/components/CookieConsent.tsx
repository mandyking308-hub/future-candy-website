import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({ essential: true, analytics: false, targeting: false });

  useEffect(() => {
    const consent = localStorage.getItem("futurecandy-cookie-consent");
    if (!consent) setTimeout(() => setShowBanner(true), 1000);
    else setPreferences(JSON.parse(consent));
  }, []);

  const saveConsent = (prefs: typeof preferences) => {
    localStorage.setItem("futurecandy-cookie-consent", JSON.stringify(prefs));
    localStorage.setItem("futurecandy-consent-date", new Date().toISOString());
    setShowBanner(false);
    setShowPreferences(false);
  };

  const acceptAll = () => saveConsent({ essential: true, analytics: true, targeting: true });
  const rejectNonEssential = () => saveConsent({ essential: true, analytics: false, targeting: false });

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
        <div className="container mx-auto max-w-6xl">
          <div className="glass border-2 border-candy-cyan/30 rounded-lg p-6 shadow-[0_0_40px_rgba(34,211,238,0.3)]">
            <div className="flex items-start gap-4">
              <Cookie className="w-6 h-6 text-candy-cyan flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gradient mb-2">We Value Your Privacy</h3>
                <p className="text-sm text-muted-foreground mb-4">FutureCandy uses cookies to keep the website working and, where accepted, to understand site usage. You can accept, reject, or manage optional cookies.</p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={acceptAll} className="bg-gradient-to-r from-candy-pink to-candy-violet hover:scale-105 transition-transform shadow-[0_0_20px_rgba(236,72,153,0.5)]">Accept All</Button>
                  <Button onClick={rejectNonEssential} variant="outline" className="border-candy-cyan/50 text-candy-cyan hover:bg-candy-cyan/10">Reject Non-Essential</Button>
                  <Button onClick={() => setShowPreferences(true)} variant="outline" className="border-candy-violet/50 text-candy-violet hover:bg-candy-violet/10 gap-2"><Settings className="w-4 h-4" />Manage Preferences</Button>
                </div>
                <div className="mt-3"><a href="/cookies" className="text-xs text-candy-cyan hover:underline">Learn more about our Cookie Policy</a></div>
              </div>
              <Button onClick={rejectNonEssential} variant="ghost" size="icon" className="flex-shrink-0 text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="glass border-2 border-candy-violet/30 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gradient">Cookie Preferences</DialogTitle>
            <DialogDescription className="text-muted-foreground">Manage your cookie preferences below. Essential cookies cannot be disabled.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-start justify-between gap-4 p-4 glass rounded-lg border border-candy-cyan/20">
              <div className="flex-1"><Label htmlFor="essential" className="text-lg font-semibold text-candy-cyan">Essential Cookies</Label><p className="text-sm text-muted-foreground mt-2">Required for basic website functionality.</p></div>
              <Switch id="essential" checked={true} disabled className="mt-1" />
            </div>
            <div className="flex items-start justify-between gap-4 p-4 glass rounded-lg border border-candy-pink/20">
              <div className="flex-1"><Label htmlFor="analytics" className="text-lg font-semibold text-candy-pink">Analytics Cookies</Label><p className="text-sm text-muted-foreground mt-2">Help us understand site usage.</p></div>
              <Switch id="analytics" checked={preferences.analytics} onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })} className="mt-1" />
            </div>
            <div className="flex items-start justify-between gap-4 p-4 glass rounded-lg border border-candy-violet/20">
              <div className="flex-1"><Label htmlFor="targeting" className="text-lg font-semibold text-candy-violet">Targeting Cookies</Label><p className="text-sm text-muted-foreground mt-2">Reserved for future marketing and advertising features if enabled.</p></div>
              <Switch id="targeting" checked={preferences.targeting} onCheckedChange={(checked) => setPreferences({ ...preferences, targeting: checked })} className="mt-1" />
            </div>
          </div>
          <div className="flex gap-3 justify-end"><Button onClick={() => saveConsent(preferences)} className="bg-gradient-to-r from-candy-pink to-candy-violet">Save Preferences</Button><Button onClick={() => setShowPreferences(false)} variant="outline" className="border-muted">Cancel</Button></div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;