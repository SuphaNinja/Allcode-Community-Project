import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen flex flex-col items-center px-4 py-12">
            <div className="w-full max-w-4xl space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <ScrollArea className="h-[70vh] rounded-xl border border-neutral-700 p-4 sm:p-8">
                    <div className="space-y-6 text-sm">
                        <section>
                            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                            <p>
                                Welcome to A.C.P. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data and tell you about your privacy rights and how the law protects you.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">2. Data We Collect</h2>
                            <p>
                                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                            </p>
                            <ul className="list-disc list-inside mt-2">
                                <li>Identity Data</li>
                                <li>Contact Data</li>
                                <li>Technical Data</li>
                                <li>Usage Data</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">3. How We Use Your Data</h2>
                            <p>
                                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                            </p>
                            <ul className="list-disc list-inside mt-2">
                                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                                <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
                                <li>Where we need to comply with a legal obligation.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
                            <p>
                                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">5. Your Legal Rights</h2>
                            <p>
                                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                            </p>
                            <ul className="list-disc list-inside mt-2">
                                <li>Request access to your personal data</li>
                                <li>Request correction of your personal data</li>
                                <li>Request erasure of your personal data</li>
                                <li>Object to processing of your personal data</li>
                                <li>Request restriction of processing your personal data</li>
                                <li>Request transfer of your personal data</li>
                                <li>Right to withdraw consent</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">6. Changes to This Privacy Policy</h2>
                            <p>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at:
                            </p>
                            <p className="mt-2">
                                Email: privacy@acp.com<br />
                                Address: 123 Privacy Street, Data City, 12345, Country
                            </p>
                        </section>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}