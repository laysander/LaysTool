import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import Callout from '../components/common/Callout';

const TermsPage: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto py-8 space-y-12">
            <header className="text-center">
                <h1 className="text-5xl md:text-6xl font-black mb-4 mt-12">Terms of Use</h1>
                <p className="text-xl md:text-2xl text-gray-700">Simple rules for a simple service. Last updated: {new Date().toLocaleDateString()}.</p>
            </header>

            <div className="bg-white p-6 md:p-10 border-4 border-black shadow-[8px_8px_0_#551EFD] space-y-8 text-lg leading-relaxed">
                <section>
                    <SectionHeader>1. Acceptance of Terms</SectionHeader>
                    <p>
                        By accessing and using LayTools ("the Service"), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you should not use the Service.
                    </p>
                </section>

                <section>
                    <SectionHeader>2. Description of Service</SectionHeader>
                    <p>
                        LayTools provides a collection of free, client-side web tools. All data processing occurs within your local browser, and no user data is uploaded, stored, or processed on our servers.
                    </p>
                    <Callout>
                        <strong>In Plain English:</strong> We provide the tools, but your data stays on your computer. You are in full control.
                    </Callout>
                </section>

                <section>
                    <SectionHeader>3. Acceptable Use Policy</SectionHeader>
                    <p>
                        You agree not to use the Service for any unlawful purpose or to process any content that is illegal, harmful, or infringes on the rights of others. You are solely responsible for the content you process with our tools.
                    </p>
                </section>

                <section>
                    <SectionHeader>4. Disclaimer of Warranties</SectionHeader>
                    <p>
                        The Service is provided "as is" and "as available" without any warranty of any kind. We do not guarantee that the tools will be error-free, completely accurate, or available at all times. You use the Service at your own risk.
                    </p>
                </section>

                 <section>
                    <SectionHeader>5. Limitation of Liability</SectionHeader>
                    <p>
                        Because the Service operates entirely on your client device and we do not handle your data, our liability is strictly limited. To the fullest extent permitted by law, LayTools and its creators shall not be liable for any direct or indirect damages, including data loss, corruption, or business interruption, arising from the use or inability to use the Service.
                    </p>
                    <Callout>
                        <strong>In Plain English:</strong> We are not responsible for any issues that arise from your use of the tools, as we have no access to or control over your data.
                    </Callout>
                </section>

                <section>
                    <SectionHeader>6. Changes to Terms</SectionHeader>
                    <p>
                        We reserve the right to modify these terms at any time. We will post the most current version on this page. By continuing to use the Service after changes are made, you agree to be bound by the revised terms.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsPage;