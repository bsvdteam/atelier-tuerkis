import { MessageCircle, Mail } from "lucide-react";
import { buildWhatsAppUrl, buildMailtoUrl } from "@/lib/whatsapp";

export function ContactCta({
  whatsappText,
  emailSubject,
  whatsappLabel = "Per WhatsApp schreiben",
  emailLabel = "Per E-Mail schreiben",
}: {
  whatsappText: string;
  emailSubject?: string;
  whatsappLabel?: string;
  emailLabel?: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={buildWhatsAppUrl(whatsappText)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--primary"
      >
        <MessageCircle size={18} /> {whatsappLabel}
      </a>
      <a href={buildMailtoUrl(emailSubject)} className="btn btn--ghost">
        <Mail size={18} /> {emailLabel}
      </a>
    </div>
  );
}
