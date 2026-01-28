import Link from "next/link";
import { Logo } from "@/components/Logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Open Mool",
    description: "Terms and conditions for using the Open Mool cultural heritage archive platform.",
};

export default function TermsOfService() {
    const lastUpdated = "January 23, 2026";

    return (
        <main className="min-h-screen bg-bg-canvas p-8 md:p-24 max-w-4xl mx-auto">
            <div className="mb-12 flex justify-between items-center">
                <Link href="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-human text-sm">
                    &larr; Back to Home
                </Link>
                <Logo showText={false} />
            </div>

            <article className="prose prose-lg prose-slate max-w-none font-body text-text-secondary">
                <h1 className="font-heading text-4xl mb-2 text-text-primary">Terms of Service</h1>
                <p className="text-sm text-text-secondary mb-8">Last Updated: {lastUpdated}</p>
                <div className="w-12 h-1 bg-primary mb-12"></div>

                {/* Agreement to Terms */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">1. Agreement to Terms</h2>
                    <p className="mb-4">
                        Welcome to Open Mool. These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and the Open Mool Foundation (&quot;Open Mool,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) governing your access to and use of openmool.org and all associated services, applications, and content (collectively, the &quot;Platform&quot;).
                    </p>
                    <p className="mb-4">
                        By accessing or using the Platform, you agree to be bound by these Terms and our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. If you do not agree, you must not use the Platform.
                    </p>
                    <p className="mb-4">
                        You must be at least 13 years old (or 16 in the European Economic Area) to use our services. By using the Platform, you represent that you meet this age requirement.
                    </p>
                </section>

                {/* Our Mission */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">2. Our Mission</h2>
                    <p className="mb-4">
                        Open Mool is a non-profit, open-source initiative building a sovereign digital archive for Himalayan cultural heritage. Our mission is to preserve oral traditions, dialects, folklore, and historical knowledge before they are lost to time.
                    </p>
                    <p className="mb-4">
                        We operate as a public utility for cultural data, similar to how Wikipedia serves knowledge. Understanding this mission is fundamental to these Terms, as content contributed is intended for the public benefit and long-term preservation.
                    </p>
                </section>

                {/* User Accounts */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">3. User Accounts</h2>
                    <h3 className="font-heading text-xl text-text-primary mb-3">3.1 Registration</h3>
                    <p className="mb-4">
                        To contribute content or access certain features, you must create an account through our authentication provider (Auth0). You agree to provide accurate information and keep your credentials secure.
                    </p>
                    <h3 className="font-heading text-xl text-text-primary mb-3">3.2 Account Responsibilities</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>You are responsible for all activity under your account.</li>
                        <li>You must notify us immediately of any unauthorized access.</li>
                        <li>We may suspend or terminate accounts that violate these Terms.</li>
                    </ul>
                    <h3 className="font-heading text-xl text-text-primary mb-3">3.3 Guardian Status</h3>
                    <p className="mb-4">
                        Contributors who regularly upload verified content may earn &quot;Guardian&quot; status with additional privileges. Guardian status is earned through contribution and is not a contractual right.
                    </p>
                </section>

                {/* Content Contribution */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">4. Content Contribution</h2>

                    <h3 className="font-heading text-xl text-text-primary mb-3">4.1 Content License Grant</h3>
                    <p className="mb-4">
                        By uploading content to Open Mool, you grant the Open Mool Foundation a <strong>worldwide, non-exclusive, royalty-free, perpetual, irrevocable license</strong> to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Host, store, reproduce, and publicly display your contributions.</li>
                        <li>Process content using AI/ML for transcription, translation, tagging, and semantic indexing.</li>
                        <li>Create derivative works (e.g., translated transcriptions, embeddings for search).</li>
                        <li>Distribute content through the archive and federation partners (Mool Nodes).</li>
                        <li>Archive content on decentralized storage (IPFS, Arweave) for permanent preservation.</li>
                    </ul>
                    <p className="mb-4">
                        This license is necessary to fulfill our preservation mission. You retain ownership of your original content.
                    </p>

                    <h3 className="font-heading text-xl text-text-primary mb-3">4.2 Content Requirements</h3>
                    <p className="mb-4">When contributing content, you represent and warrant that:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>You have rights:</strong> You own or have obtained necessary permissions to share the content.</li>
                        <li><strong>Consent obtained:</strong> For recordings of individuals, you have obtained appropriate consent (especially for sacred, ceremonial, or personal content).</li>
                        <li><strong>Accurate metadata:</strong> Information provided (location, date, cultural context) is accurate to the best of your knowledge.</li>
                        <li><strong>No harmful content:</strong> Content does not contain malware, spam, harassment, hate speech, or illegal material.</li>
                    </ul>

                    <h3 className="font-heading text-xl text-text-primary mb-3">4.3 Cultural Sensitivity</h3>
                    <p className="mb-4">
                        Open Mool handles culturally sensitive material. You agree to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Respect the cultural significance of the content you upload.</li>
                        <li>Flag content that may be ceremonially restricted or require limited access.</li>
                        <li>Respect removal requests from community members or their representatives.</li>
                        <li>Not exploit cultural content for commercial purposes without appropriate agreements.</li>
                    </ul>

                    <h3 className="font-heading text-xl text-text-primary mb-3">4.4 Attribution &amp; Karma</h3>
                    <p className="mb-4">
                        Contributors receive public attribution and &quot;Karma&quot; reputation points for verified contributions. You agree that your username, profile, and contribution history may be publicly displayed.
                    </p>
                </section>

                {/* Prohibited Conduct */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">5. Prohibited Conduct</h2>
                    <p className="mb-4">You agree not to:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Upload content you don&apos;t have rights to share or that violates third-party rights.</li>
                        <li>Misrepresent content authenticity, origin, or cultural context.</li>
                        <li>Use automated systems (bots, scrapers) to access the Platform without permission.</li>
                        <li>Attempt to circumvent security measures or access unauthorized areas.</li>
                        <li>Harass, abuse, or harm other users or community members.</li>
                        <li>Upload malware, viruses, or malicious code.</li>
                        <li>Use the Platform for commercial exploitation without appropriate licensing agreements.</li>
                        <li>Impersonate others or create fake accounts.</li>
                        <li>Interfere with the operation of the Platform.</li>
                    </ul>
                </section>

                {/* Intellectual Property */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">6. Intellectual Property</h2>

                    <h3 className="font-heading text-xl text-text-primary mb-3">6.1 Platform IP</h3>
                    <p className="mb-4">
                        The Open Mool Platform, including its source code, is released under the <strong>MIT License</strong> (open source). The Open Mool name, logo, and branding are trademarks of the Open Mool Foundation.
                    </p>

                    <h3 className="font-heading text-xl text-text-primary mb-3">6.2 Contributed Content</h3>
                    <p className="mb-4">
                        Contributed cultural content is held in stewardship by the Open Mool Foundation under the <strong>Open Mool Content License</strong>:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Non-commercial use:</strong> Freely available for personal, educational, and research purposes with attribution.</li>
                        <li><strong>Commercial use:</strong> Requires a license agreement with revenue-sharing provisions benefiting the original communities.</li>
                        <li><strong>AI training:</strong> Content may be used to train AI models for cultural preservation purposes (e.g., dialect transcription). External AI training requires explicit agreements.</li>
                    </ul>

                    <h3 className="font-heading text-xl text-text-primary mb-3">6.3 DMCA &amp; Takedown</h3>
                    <p className="mb-4">
                        We respect intellectual property rights. If you believe content infringes your rights, submit a takedown notice to <a href="mailto:legal@openmool.org" className="text-primary hover:underline">legal@openmool.org</a> with:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Description of the copyrighted work.</li>
                        <li>Location (URL) of the infringing content.</li>
                        <li>Your contact information.</li>
                        <li>A statement of good faith belief and accuracy, under penalty of perjury.</li>
                    </ul>
                </section>

                {/* AI Processing */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">7. AI Processing &amp; Machine Learning</h2>
                    <p className="mb-4">
                        By using Open Mool, you acknowledge and consent to the following AI/ML processing:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Automatic Transcription:</strong> Audio and video content may be automatically transcribed using speech-to-text AI.</li>
                        <li><strong>Vector Embedding:</strong> Content is converted to vector embeddings for semantic search capabilities.</li>
                        <li><strong>Tagging &amp; Classification:</strong> AI may suggest metadata tags such as language, region, and content type.</li>
                        <li><strong>Translation:</strong> Transcriptions may be automatically translated to increase accessibility.</li>
                    </ul>
                    <p className="mb-4">
                        AI-generated outputs (transcriptions, tags) may contain errors. Users are encouraged to review and correct AI outputs. Corrected outputs improve future accuracy.
                    </p>
                </section>

                {/* Institutional Partners */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">8. Institutional Partners</h2>
                    <p className="mb-4">
                        NGOs, universities, museums, and cultural trusts (&quot;Foundations&quot;) may enter into partnership agreements with Open Mool for bulk uploads and branded collections. Institutional terms are governed by separate partnership agreements that supplement these Terms.
                    </p>
                </section>

                {/* Disclaimers */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">9. Disclaimers</h2>
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                        <p className="font-medium text-yellow-800 mb-2">IMPORTANT</p>
                        <p className="text-yellow-700 text-sm">
                            THE PLATFORM IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
                        </p>
                    </div>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>We do not guarantee the accuracy, completeness, or authenticity of user-contributed content.</li>
                        <li>AI-generated transcriptions, translations, and tags may contain errors.</li>
                        <li>We do not guarantee uninterrupted or error-free service.</li>
                        <li>We are not responsible for content uploaded by users that violates third-party rights.</li>
                    </ul>
                </section>

                {/* Limitation of Liability */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">10. Limitation of Liability</h2>
                    <p className="mb-4">
                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, OPEN MOOL AND ITS AFFILIATES, DIRECTORS, OFFICERS, EMPLOYEES, AND VOLUNTEERS SHALL NOT BE LIABLE FOR:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Any indirect, incidental, special, consequential, or punitive damages.</li>
                        <li>Loss of profits, data, or goodwill.</li>
                        <li>Any damages arising from user-contributed content.</li>
                        <li>Service interruptions or data loss.</li>
                    </ul>
                    <p className="mb-4">
                        Our total liability shall not exceed the greater of $100 USD or any amounts you have paid to Open Mool in the 12 months preceding the claim.
                    </p>
                </section>

                {/* Indemnification */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">11. Indemnification</h2>
                    <p className="mb-4">
                        You agree to indemnify and hold harmless Open Mool, its Foundation, affiliates, and volunteers from any claims, losses, damages, liabilities, and expenses (including legal fees) arising from:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Your use of the Platform.</li>
                        <li>Content you upload or share.</li>
                        <li>Your violation of these Terms.</li>
                        <li>Your violation of any third-party rights.</li>
                    </ul>
                </section>

                {/* Modifications */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">12. Modifications to Terms</h2>
                    <p className="mb-4">
                        We may modify these Terms at any time. Material changes will be communicated via email or a prominent notice on the Platform at least 30 days before taking effect. Your continued use constitutes acceptance of modified Terms.
                    </p>
                </section>

                {/* Termination */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">13. Termination</h2>
                    <p className="mb-4">
                        You may terminate your account at any time by contacting us. We may suspend or terminate accounts that violate these Terms without notice.
                    </p>
                    <p className="mb-4">
                        Upon termination, content you have contributed remains part of the archive (per the license grant in Section 4.1), but your personal data will be handled per our Privacy Policy.
                    </p>
                </section>

                {/* Governing Law */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">14. Governing Law &amp; Disputes</h2>
                    <p className="mb-4">
                        These Terms are governed by the laws of India, without regard to conflict of law principles. Any disputes shall be resolved through:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 mb-4">
                        <li><strong>Informal Resolution:</strong> Contact us first to attempt amicable resolution.</li>
                        <li><strong>Mediation:</strong> If informal resolution fails, disputes will be submitted to mediation.</li>
                        <li><strong>Arbitration:</strong> Binding arbitration in Dehradun, Uttarakhand, India, under the Arbitration and Conciliation Act, 1996.</li>
                    </ol>
                    <p className="mb-4">
                        Nothing prevents either party from seeking injunctive relief in courts of competent jurisdiction.
                    </p>
                </section>

                {/* Miscellaneous */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">15. Miscellaneous</h2>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Entire Agreement:</strong> These Terms, along with the Privacy Policy, constitute the entire agreement.</li>
                        <li><strong>Severability:</strong> If any provision is found unenforceable, the remainder stays in effect.</li>
                        <li><strong>Waiver:</strong> Failure to enforce any right is not a waiver of that right.</li>
                        <li><strong>Assignment:</strong> You may not assign these Terms. We may assign to affiliates or successors.</li>
                        <li><strong>Force Majeure:</strong> We are not liable for failures due to circumstances beyond our control.</li>
                    </ul>
                </section>

                {/* Contact */}
                <section className="mb-12 bg-subtle p-6 rounded-lg border border-primary/10">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">16. Contact Us</h2>
                    <p className="mb-4">For questions about these Terms:</p>
                    <ul className="list-none space-y-2 mb-4">
                        <li><strong>Email:</strong> <a href="mailto:legal@openmool.org" className="text-primary hover:underline">legal@openmool.org</a></li>
                        <li><strong>General:</strong> <a href="mailto:team@openmool.org" className="text-primary hover:underline">team@openmool.org</a></li>
                    </ul>
                    <p className="text-sm text-text-secondary">
                        The Open Mool Foundation<br />
                        Dehradun, Uttarakhand, India
                    </p>
                </section>

                {/* Footer Links */}
                <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
                    <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    <Link href="/about" className="text-primary hover:underline">About Open Mool</Link>
                    <Link href="/" className="text-text-secondary hover:text-primary">Home</Link>
                </div>
            </article>
        </main>
    );
}
