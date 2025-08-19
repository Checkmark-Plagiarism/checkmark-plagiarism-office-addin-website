import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/homepage/hero";
import CallToAction from "@/components/sections/homepage/call-to-action";
import Features from "@/components/sections/homepage/features";
import HowItWorks from "@/components/sections/homepage/how-it-works";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-10 text-slate-900">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Checkmark Plagiarism – Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Effective date: <span className="font-medium">2025-08-18</span>
          </p>
          <p className="mt-2 text-slate-700">
            This Privacy Policy explains how <span className="font-semibold">Checkmark Plagiarism Inc</span>{" "}
            (“we,” “us,” or “our”) handles personal information when you use the{" "}
            <span className="font-semibold">Checkmark Plagiarism</span> Microsoft Office Add‑in and
            the accompanying paid plagiarism‑detection service (collectively, the “Service”). This
            policy refers to the Service only—not to any website.
          </p>
        </header>

        <section className="space-y-6">
          <section>
            <h2 className="text-xl font-bold">1) What the Service Does</h2>
            <p className="mt-2">
              <span className="font-semibold">Checkmark Plagiarism</span> is a Microsoft Office
              Add‑in that assists authors and reviewers by analyzing document content in real time to
              detect potential plagiarism, copying, and pasting. The add‑in generates document
              metadata (for example, similarity metrics and document fingerprints) and—so the analysis
              can be completed—uploads the document and generated metadata to our paid Service for
              processing. The Service can optionally capture keystroke‑dynamics signals (sometimes
              considered biometrics) related to how a document is typed, such as key timing and paste
              events, solely to support plagiarism and copy‑detection features.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">2) Personal Information We Collect</h2>
            <p className="mt-2">
              The categories of personal information we may collect through the Service include:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>
                <span className="font-semibold">Account &amp; billing information</span> – name,
                email, organization, role, subscription tier, and payment status (payment details are
                handled by our payment processor).
              </li>
              <li>
                <span className="font-semibold">Document content</span> – text and embedded data you
                choose or are required to submit for analysis, plus document IDs and titles.
              </li>
              <li>
                <span className="font-semibold">Plugin‑generated metadata</span> – similarity scores,
                document fingerprints/hashes, flags, match excerpts, paste events, timestamps, add‑in
                version, and analysis settings.
              </li>
              <li>
                <span className="font-semibold">Keystroke‑dynamics/biometric signals</span> (optional)
                – timing and cadence of keystrokes and other input signals collected during active
                editing to help distinguish original writing from pasted text. We do{" "}
                <span className="font-semibold">not</span> collect raw audio/video/face/voice
                biometrics.
              </li>
              <li>
                <span className="font-semibold">Usage &amp; diagnostics</span> – feature usage, error
                logs, performance data, and device/host application information (e.g., Office version,
                OS type) to maintain and improve the Service.
              </li>
              <li>
                <span className="font-semibold">Support communications</span> – messages you send to
                us, and related attachments you provide for troubleshooting.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold">3) How We Use Personal Information</h2>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>Provide, operate, and secure the Service and your account.</li>
              <li>
                Perform plagiarism/copy detection on submitted documents and generated metadata, and
                return reports and similarity results.
              </li>
              <li>
                Process keystroke‑dynamics/biometric signals (if enabled) to help identify pasted
                content or sudden authorship changes.
              </li>
              <li>Troubleshoot, detect abuse/fraud, and enforce acceptable‑use and license terms.</li>
              <li>Analyze and improve Service quality, performance, and accuracy.</li>
              <li>
                Communicate with you about updates, security notices, and service‑related messages.
              </li>
              <li>Comply with legal obligations and respond to lawful requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold">4) Legal Bases (where applicable)</h2>
            <p className="mt-2">
              Where required (e.g., the EEA/UK/Switzerland), we rely on one or more of the following
              legal bases: (i) performance of a contract to deliver the Service; (ii) our legitimate
              interests in securing and improving the Service; (iii) your consent—especially for
              keystroke‑dynamics/biometric processing; and (iv) compliance with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">5) Keystroke‑Dynamics / Biometrics</h2>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>
                We collect keystroke‑dynamics signals only to support plagiarism and paste‑detection
                features and <span className="font-semibold">do not</span> use them for general
                identity verification or marketing.
              </li>
              <li>
                Where required by law, we obtain your explicit consent before collecting these
                signals, and you can disable them in the add‑in or via your organization’s admin
                settings.
              </li>
              <li>
                Signals are stored separately from full document content whenever feasible and are
                retained only as long as needed to operate the feature (see Retention below).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold">6) Document Submission to the Paid Service</h2>
            <p className="mt-2">
              For the Service to run a complete analysis, the add‑in submits your document and
              plugin‑generated metadata to our paid processing back end. Without this submission, the
              analysis may be unavailable or limited. Where your organization has enabled it, documents
              can be pseudonymized (e.g., with hashed IDs) before matching against reference sources.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">7) Sharing of Personal Information</h2>
            <p className="mt-2">
              We do not sell personal information. We share personal information only with:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>
                <span className="font-semibold">Service providers/processors</span> that host, store,
                process payments, provide analytics/error logging, or support our operations—under
                contracts that restrict their use of the data.
              </li>
              <li>
                <span className="font-semibold">Your organization</span> (for enterprise customers) in
                accordance with your admin’s settings and our agreement.
              </li>
              <li>
                <span className="font-semibold">Legal reasons</span> – to comply with law, enforce our
                terms, or protect rights, safety, and security.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold">8) Retention &amp; Deletion</h2>
            <p className="mt-2">
              We retain personal information for as long as necessary to provide the Service and for
              legitimate business or legal purposes. Unless your organization opts into longer
              retention to enable longitudinal analysis or auditability:
            </p>
            <p className="mt-2">
              You or your organization may request deletion earlier where applicable (see Your Rights
              below).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">9) Security</h2>
            <p className="mt-2">
              We employ industry‑standard safeguards, including encryption in transit and at rest,
              access controls, and audit logging. No method of transmission or storage is 100% secure,
              but we work continuously to protect the Service and your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">10) Your Privacy Choices &amp; Rights</h2>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>
                Access, correct, or delete personal information stored by the Service, subject to
                applicable law and our agreement with your organization.
              </li>
              <li>
                Opt in/out of keystroke‑dynamics/biometric processing where available in settings.
              </li>
              <li>
                Object to or restrict certain processing, and request portability of your data (EEA/UK
                and similar jurisdictions).
              </li>
              <li>
                California residents: we do not sell or share personal information for cross‑context
                behavioral advertising. You may exercise applicable CCPA/CPRA rights by contacting us.
              </li>
            </ul>
            <p className="mt-2">
              We may need to verify your identity or route your request through your organization’s
              administrator.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">11) Microsoft Office Environment</h2>
            <p className="mt-2">
              The add‑in runs inside Microsoft Office host applications. Use of Microsoft software and
              APIs is subject to Microsoft’s terms. <span className="font-semibold">Checkmark Plagiarism</span>{" "}
              is developed and operated by <span className="font-semibold">[Your Company]</span> and
              is not owned by or affiliated with Microsoft.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">12) International Data Transfers</h2>
            <p className="mt-2">
              We may transfer, process, and store information outside your country of residence. Where
              required, we use appropriate safeguards (e.g., standard contractual clauses) to protect
              cross‑border transfers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">13) Children’s Privacy</h2>
            <p className="mt-2">
              The Service is not directed to children under 13 (or the age required by local law), and
              we do not knowingly collect personal information from them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">14) Changes to This Policy</h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. If changes materially affect your
              rights, we will provide notice through the Service or by contacting your account owner or
              administrator.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">15) Contact Us</h2>
            <address className="not-italic mt-2">
              Checkmark Plagiarism Inc <br />
              131 Continental Dr Suite 305 <br />
              Newark, DE 19713<br />
              <a
                href="mailto:contact@email.com"
                className="font-medium text-blue-700 underline underline-offset-2"
              >
                support@checkmarkplagiarism.com
              </a>
            </address>
          </section>

        </section>
      </main>
      <Footer />
    </div>
  );
}
