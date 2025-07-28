import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import Accordion from '../components/common/Accordion';

const PrivacyPage: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto py-8 space-y-12">
             <header className="text-center">
                <h1 className="text-5xl md:text-6xl font-black mb-4 mt-12">Your Privacy is Our Priority</h1>
                <p className="text-xl md:text-2xl text-gray-700">We don't collect your data. It's as simple as that.</p>
            </header>

            <div className="bg-white p-6 md:p-10 border-4 border-black shadow-[8px_8px_0_#551EFD]">
                <SectionHeader>Our Core Principle</SectionHeader>
                <p className="text-lg leading-relaxed">
                    Unlike most web services, BenTools is designed to respect your privacy from the ground up. All data processing happens locally, in your browser. Nothing you type, upload, or generate is ever sent to our servers, because we don't have any that process user data.
                </p>
                <p className="mt-4 text-center font-black text-lg text-green-900 border-2 border-dashed border-black p-4 bg-green-50">
                    Your data never leaves your computer.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 border-4 border-black">
                <SectionHeader>Privacy FAQ</SectionHeader>
                <div className="space-y-4">
                    <Accordion title="Do you use cookies or tracking scripts?">
                        <p>No. We do not use any tracking cookies, analytics scripts (like Google Analytics), or advertising pixels. Your activity on this site is your business, not ours.</p>
                    </Accordion>
                    <Accordion title="What is LocalStorage and how do you use it?">
                        <p>LocalStorage is a feature of your web browser that allows websites to store small amounts of data on your computer. We use it to save your settings for some tools (like your find/replace history) for your convenience. This data is never sent to us and stays on your machine. You can clear it anytime by clearing your browser's site data.</p>
                    </Accordion>
                     <Accordion title="Are there any third-party services involved?">
                        <p>We load some common, open-source libraries from Content Delivery Networks (CDNs) for performance. These are standard, widely-used scripts (like React, TailwindCSS, etc.) and do not track personal data. The core functionality of our tools is entirely self-contained.</p>
                    </Accordion>
                    <Accordion title="If the tools are free, what's the catch?">
                        <p>There is no catch. This project is a passion project built on the belief that fundamental web utilities should be private and accessible. It's supported by the creator, not by selling data.</p>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;