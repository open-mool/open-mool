import Link from "next/link";
import { Logo } from "@/components/Logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Open Mool",
    description: "How Open Mool collects, uses, and protects your data while preserving Himalayan cultural heritage.",
};

export default function PrivacyPolicy() {
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
                <h1 className="font-heading text-4xl mb-2 text-text-primary">Privacy Policy</h1>
                <p className="text-sm text-text-secondary mb-8">Last Updated: {lastUpdated}</p>
                <div className="w-12 h-1 bg-primary mb-12"></div>

                {/* Introduction */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">1. Introduction</h2>
                    <p className="mb-4">
                        Open Mool (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy of our users (&quot;you&quot; or &quot;Guardians&quot;) while fulfilling our mission to preserve Himalayan cultural heritage. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform at openmool.org and related services.
                    </p>
                    <p className="mb-4">
                        By using Open Mool, you consent to the data practices described in this policy. If you do not agree with any part of this Privacy Policy, please do not use our services.
                    </p>
                </section>

                {/* Information We Collect */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">2. Information We Collect</h2>

                    <h3 className="font-heading text-xl text-text-primary mb-3">2.1 Information You Provide</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                        <li><strong>Account Information:</strong> When you register via Auth0, we collect your email address, name, and authentication credentials. We do not store passwords directly.</li>
                        <li><strong>Profile Data:</strong> Optional information you provide such as your affiliation (researcher, guardian, institution), location, and areas of cultural expertise.</li>
                        <li><strong>Uploaded Content:</strong> Audio recordings, video files, images, documents, and associated metadata (geolocation, timestamps, cultural context, transcriptions) that you contribute to the archive.</li>
                        <li><strong>Communications:</strong> Any messages, feedback, or correspondence you send to us.</li>
                    </ul>

                    <h3 className="font-heading text-xl text-text-primary mb-3">2.2 Information Collected Automatically</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                        <li><strong>Usage Data:</strong> Pages viewed, features used, search queries, and interaction patterns to improve user experience.</li>
                        <li><strong>Device Information:</strong> Browser type, operating system, device identifiers, and IP address (anonymized where possible).</li>
                        <li><strong>Cookies:</strong> Essential cookies for authentication and session management. We do not use advertising or tracking cookies.</li>
                    </ul>

                    <h3 className="font-heading text-xl text-text-primary mb-3">2.3 Information from Third Parties</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Authentication Provider (Auth0):</strong> Basic profile information from your identity provider (e.g., Google, email) when you log in.</li>
                        <li><strong>Institutional Partners:</strong> Metadata about collections when partnering organizations bulk-upload archives.</li>
                    </ul>
                </section>

                {/* How We Use Your Information */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">3. How We Use Your Information</h2>
                    <p className="mb-4">We use collected information to:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Operate the Archive:</strong> Store, organize, transcribe (via AI), and make cultural content searchable and accessible.</li>
                        <li><strong>Authenticate Users:</strong> Verify your identity and maintain account security.</li>
                        <li><strong>Attribution &amp; Karma:</strong> Credit contributors, award reputation points, and display contribution history publicly (with your consent).</li>
                        <li><strong>AI Processing:</strong> Use machine learning to transcribe audio, generate embeddings for semantic search, and tag content with metadata. AI processing is performed on our infrastructure or trusted processors.</li>
                        <li><strong>Research &amp; Analytics:</strong> Aggregate, anonymized data to understand usage patterns and improve services.</li>
                        <li><strong>Communication:</strong> Send service updates, security alerts, and (with consent) newsletters about the project.</li>
                        <li><strong>Legal Compliance:</strong> Respond to legal requests and enforce our terms.</li>
                    </ul>
                </section>

                {/* Cultural Content & Special Considerations */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">4. Cultural Content &amp; Special Considerations</h2>
                    <p className="mb-4">
                        Open Mool handles culturally sensitive material. We take additional precautions:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Consent of Subjects:</strong> When uploading recordings of individuals, you must have obtained appropriate consent. We encourage contributors to document consent (written or oral).</li>
                        <li><strong>Sacred &amp; Sensitive Content:</strong> Content marked as ceremonially sensitive or restricted may have limited access controls applied at the contributor&apos;s request.</li>
                        <li><strong>Indigenous Data Sovereignty:</strong> We recognize the rights of Himalayan communities to their cultural heritage. The Open Mool Foundation acts as a custodian, not an owner, of cultural data.</li>
                        <li><strong>Right to Removal:</strong> Community members or their representatives can request removal of content that was uploaded without proper consent or that causes harm.</li>
                    </ul>
                </section>

                {/* Data Sharing & Disclosure */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">5. Data Sharing &amp; Disclosure</h2>
                    <p className="mb-4">We do not sell your personal information. We may share data in the following circumstances:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Public Archive:</strong> Contributed cultural content (audio, video, images, transcriptions) is made publicly accessible as part of Open Mool&apos;s mission, with attribution to contributors.</li>
                        <li><strong>Service Providers:</strong> Trusted third parties who assist in operating our platform (e.g., Cloudflare for hosting, AI providers for transcription). These parties are bound by confidentiality agreements.</li>
                        <li><strong>Research Partners:</strong> Anonymized or aggregated data may be shared with academic researchers for non-commercial cultural research, subject to data use agreements.</li>
                        <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect the rights, safety, or property of Open Mool, users, or others.</li>
                        <li><strong>Organizational Changes:</strong> In case of merger, acquisition, or asset sale, data may be transferred with prior notice to users.</li>
                    </ul>
                </section>

                {/* Data Retention */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">6. Data Retention</h2>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Account Data:</strong> Retained while your account is active. Upon account deletion, personal data is removed within 30 days (except for data required for legal compliance).</li>
                        <li><strong>Contributed Content:</strong> Cultural content is archived in perpetuity as part of our preservation mission. Contributors can request attribution changes or, under specific circumstances, removal.</li>
                        <li><strong>Usage Logs:</strong> Anonymized and aggregated logs retained for up to 2 years for analytics purposes.</li>
                    </ul>
                </section>

                {/* Data Security */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">7. Data Security</h2>
                    <p className="mb-4">We implement industry-standard security measures:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Encryption:</strong> Data in transit is encrypted using TLS 1.3. Sensitive data at rest is encrypted using AES-256.</li>
                        <li><strong>Access Controls:</strong> Role-based access, multi-factor authentication for administrative accounts, and regular access reviews.</li>
                        <li><strong>Infrastructure:</strong> Hosted on Cloudflare&apos;s edge network with DDoS protection, WAF, and global redundancy.</li>
                        <li><strong>Incident Response:</strong> Documented procedures for detecting, responding to, and notifying users of security incidents.</li>
                    </ul>
                    <p className="mb-4">
                        While we strive to protect your information, no method of transmission or storage is 100% secure. We cannot guarantee absolute security.
                    </p>
                </section>

                {/* Your Rights */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">8. Your Privacy Rights</h2>
                    <p className="mb-4">Depending on your jurisdiction, you may have the following rights:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li><strong>Access:</strong> Request a copy of personal data we hold about you.</li>
                        <li><strong>Rectification:</strong> Correct inaccurate or incomplete personal data.</li>
                        <li><strong>Deletion:</strong> Request deletion of your account and personal data (subject to legal retention requirements and archival exceptions for contributed content).</li>
                        <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format.</li>
                        <li><strong>Objection:</strong> Object to certain processing activities (e.g., marketing communications).</li>
                        <li><strong>Withdrawal of Consent:</strong> Withdraw consent where processing is based on consent.</li>
                    </ul>
                    <p className="mb-4">
                        To exercise these rights, contact us at <a href="mailto:privacy@openmool.org" className="text-primary hover:underline">privacy@openmool.org</a>.
                    </p>
                </section>

                {/* International Data Transfers */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">9. International Data Transfers</h2>
                    <p className="mb-4">
                        Open Mool operates globally. Your data may be processed in countries outside your residence, including India and the United States. We ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) where required.
                    </p>
                </section>

                {/* Children's Privacy */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">10. Children&apos;s Privacy</h2>
                    <p className="mb-4">
                        Open Mool is not directed at children under 13 (or 16 in the EEA). We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us, and we will delete it promptly.
                    </p>
                </section>

                {/* Third-Party Links */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">11. Third-Party Links</h2>
                    <p className="mb-4">
                        Our platform may contain links to external websites or services not operated by us. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
                    </p>
                </section>

                {/* Changes to This Policy */}
                <section className="mb-12">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">12. Changes to This Policy</h2>
                    <p className="mb-4">
                        We may update this Privacy Policy periodically. Material changes will be communicated via email or a prominent notice on our website. Your continued use after changes constitutes acceptance of the updated policy.
                    </p>
                </section>

                {/* Contact Us */}
                <section className="mb-12 bg-subtle p-6 rounded-lg border border-primary/10">
                    <h2 className="font-heading text-2xl text-text-primary mb-4">13. Contact Us</h2>
                    <p className="mb-4">For privacy-related inquiries or to exercise your rights:</p>
                    <ul className="list-none space-y-2 mb-4">
                        <li><strong>Email:</strong> <a href="mailto:privacy@openmool.org" className="text-primary hover:underline">privacy@openmool.org</a></li>
                        <li><strong>General Contact:</strong> <a href="mailto:team@openmool.org" className="text-primary hover:underline">team@openmool.org</a></li>
                    </ul>
                    <p className="text-sm text-text-secondary">
                        The Open Mool Foundation is the data controller for personal data processed under this policy.
                    </p>
                </section>

                {/* Footer Links */}
                <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
                    <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                    <Link href="/about" className="text-primary hover:underline">About Open Mool</Link>
                    <Link href="/" className="text-text-secondary hover:text-primary">Home</Link>
                </div>
            </article>
        </main>
    );
}
