import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import { Link } from 'react-router-dom';

const SecurityPage: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto py-8 space-y-12">
            <header className="text-center">
                <h1 className="text-5xl md:text-6xl font-black mb-4 mt-12">Security by Design</h1>
                <p className="text-xl md:text-2xl text-gray-700">Our security model is simple: we can't lose what we don't have.</p>
            </header>

            <div className="bg-white p-6 md:p-10 border-4 border-black shadow-[8px_8px_0_#551EFD]">
                <SectionHeader>The Client-Side Advantage</SectionHeader>
                <div className="space-y-4 text-lg leading-relaxed">
                    <p>
                        The biggest security risk with online tools is the server. When you upload a file or submit data, it's stored on someone else's computer, making it a target for data breaches, unauthorized access, or misuse.
                    </p>
                    <p>
                        LayTools eliminates this risk entirely. By performing all operations directly in your web browser, <strong className="text-[#551EFD]">we fundamentally remove the server from the equation.</strong> Your data remains under your control, on your device, at all times.
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="border-2 border-black p-4 bg-red-100">
                        <h3 className="font-black text-xl mb-2 text-red-800">Typical Server-Side Model</h3>
                        <p className="font-bold">You &rarr; Upload &rarr; [Server] &rarr; Process &rarr; Download &rarr; You</p>
                        <p className="text-sm mt-2 text-red-700">Your data sits on a server, creating a point of failure.</p>
                    </div>
                    <div className="border-2 border-black p-4 bg-green-100">
                        <h3 className="font-black text-xl mb-2 text-green-800">LayTools Client-Side Model</h3>
                        <p className="font-bold">You &harr; Process (on your device) &harr; You</p>
                        <p className="text-sm mt-2 text-green-700">Your data never leaves your machine. No server risk.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 md:p-10 border-4 border-black">
                <SectionHeader>Your Security Best Practices</SectionHeader>
                 <ul className="space-y-4 text-lg list-disc list-inside">
                    <li>
                        <strong className="font-bold">Keep Your Browser Updated:</strong> Our tools rely on the security features of modern browsers. Always use the latest version of Chrome, Firefox, Safari, or Edge.
                    </li>
                    <li>
                        <strong className="font-bold">Use a Secure Connection:</strong> Ensure you're visiting our site over HTTPS. All traffic between you and our web host (which only serves the application code, not your data) is encrypted.
                    </li>
                    <li>
                        <strong className="font-bold">Source Code Transparency:</strong> For the technically inclined, the source code for this application is available for inspection. We believe in transparency as a cornerstone of trust.
                    </li>
                </ul>
            </div>
            
            <div className="text-center p-6 bg-[#E1FF01] border-4 border-black">
                <h3 className="text-2xl font-black mb-2">Our Promise</h3>
                <p className="text-lg font-bold">We are committed to building tools that are secure by default. You don't have to trust us with your data, because we never ask for it.</p>
                <p className="mt-4">Read our full <Link to="/privacy" className="font-bold text-[#551EFD] hover:underline">Privacy Policy</Link> for more details.</p>
            </div>
        </div>
    );
};

export default SecurityPage;