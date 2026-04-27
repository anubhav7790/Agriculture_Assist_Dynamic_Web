import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";

export default function VoiceInstructionsPage() {
  const { showToast } = useAppContext();
  const [message] = useState("Use mask and gloves. Spray in low wind conditions and wash hands after work.");

  const playVoice = () => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(speech);
      showToast("Voice guidance started", "info");
    } else {
      showToast("Speech API not supported on this device", "error");
    }
  };

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Voice Assist"
        title="Voice Instructions"
        description="Use this module to play spoken safety reminders for users who prefer audio guidance."
      />
      <section className="panel voice-panel">
        <p>{message}</p>
        <Button onClick={playVoice}>Play Voice Guidance</Button>
      </section>
    </div>
  );
}
