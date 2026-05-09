"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import CookiesModal from "../components/CookiesModal";
import { useLocale } from "@/context/LocaleContext";
import { Share2, Mail } from "lucide-react";

export default function Footer() {
    const { t } = useLocale();
    const shareUrl = "http://localhost:3000/";
    const [cookiesOpen, setCookiesOpen] = useState(false);

    return (
        <footer className="w-full py-12 bg-surface border-t border-outline-variant/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Marca */}
                    <div className="md:col-span-1">
                        <p className="text-2xl font-bold text-primary mb-3">{t.brand}</p>
                        <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                            {t.footer.tagline}
                        </p>
                        <div className="flex gap-3">
                            <a href={shareUrl || ""}
                                target="_blank"
                                aria-label="Share"
                                className="w-9 h-9 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors">
                                <Share2 size={16} />
                            </a>
                            <a href="mailto:rohyllerpereira@gmail.com" aria-label="Email" className="w-9 h-9 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors">
                                <Mail size={16} />
                            </a>
                            <a href="https://www.linkedin.com/in/rohyller-pereira/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                            <a href="https://github.com/RohyllerP" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-9 h-9 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Producto */}
                    <div>
                        <h5 className="text-xs font-bold text-on-surface mb-4 uppercase tracking-widest">
                            {t.footer.product.title}
                        </h5>
                        <ul className="space-y-3 text-sm text-on-surface-variant">
                            <li><a href="#features" className="hover:text-primary transition-colors">{t.footer.product.features}</a></li>
                            <li><a href="#download" className="hover:text-primary transition-colors">{t.footer.product.apps}</a></li>
                        </ul>
                    </div>

                    {/* Compañía */}
                    <div>
                        <h5 className="text-xs font-bold text-on-surface mb-4 uppercase tracking-widest">
                            {t.footer.company.title}
                        </h5>
                        <ul className="space-y-3 text-sm text-on-surface-variant">
                            <li><a href="https://www.rohyller.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t.footer.company.about}</a></li>
                            <li><a href="https://www.rohyller.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t.footer.company.contact}</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h5 className="text-xs font-bold text-on-surface mb-4 uppercase tracking-widest">
                            {t.footer.legal.title}
                        </h5>
                        <ul className="space-y-3 text-sm text-on-surface-variant">
                            <li><a href="https://rohyllerp.github.io/privacy-policy-recallnest/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t.footer.legal.privacy}</a></li>
                            <li><a href="https://rohyllerp.github.io/terms-of-service-recallnest/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t.footer.legal.terms}</a></li>
                            <li>
                                <button
                                    type="button"
                                    className="hover:text-primary transition-colors focus:outline-none bg-transparent cursor-pointer"
                                    onClick={() => setCookiesOpen(true)}
                                >
                                    {t.footer.legal.cookies}
                                </button>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-outline-variant/30 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-on-surface-variant">
                        © {new Date().getFullYear()} RecallNest. {t.footer.rights}
                    </p>
                    <p className="text-xs text-on-surface-variant/50 italic">
                        {t.footer.made}
                    </p>
                </div>

            </div>
            <CookiesModal
                open={cookiesOpen}
                onClose={() => setCookiesOpen(false)}
                text={t.footer.legal.cookiesText}
            />
        </footer>
    );
}