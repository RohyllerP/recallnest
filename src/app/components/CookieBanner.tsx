"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function CookieBanner() {
    const { t } = useLocale();
    const { show, accept, decline } = useCookieConsent();

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:max-w-sm"
                >
                    <div className="bg-white rounded-2xl shadow-xl border border-outline-variant/30 p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <Cookie size={18} className="text-primary shrink-0" />
                            <h3 className="font-bold text-on-surface text-sm">
                                {t.footer.legal.cookies}
                            </h3>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                            {t.footer.legal.cookiesText}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={accept}
                                className="flex-1 bg-primary-container text-on-primary-container text-sm font-semibold py-2 rounded-xl hover:opacity-90 transition-opacity"
                            >
                                {t.footer.legal.cookiesAccept}
                            </button>
                            <button
                                onClick={decline}
                                className="flex-1 bg-surface text-on-surface-variant text-sm font-semibold py-2 rounded-xl border border-outline-variant/40 hover:bg-surface-variant/30 transition-colors"
                            >
                                {t.footer.legal.cookiesDecline}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}