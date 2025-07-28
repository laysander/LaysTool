import React from 'react';
import SectionHeader from '../components/common/SectionHeader';
import { Link } from 'react-router-dom';

const CheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={`w-6 h-6 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5"/>
    </svg>
);

const AboutPage: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto py-8 space-y-12">
            <header className="text-center">
                <h1 className="text-5xl md:text-6xl font-black mb-4 mt-12">Empowering Digital Printing</h1>
                <p className="text-xl md:text-2xl text-gray-700">A suite of tools from Laysander Technology, designed for efficiency.</p>
            </header>
            
            <div className="bg-white p-6 md:p-10 border-4 border-black shadow-[8px_8px_0_#551EFD]">
                <SectionHeader>Who We Are</SectionHeader>
                <div className="space-y-4 text-lg leading-relaxed">
                    <p><strong>Laysander (PT Laysander Technology)</strong> is a leading distributor and supplier of digital printing machinery, catering to businesses of all sizes—from small startups to large industrial factories. Our mission is to help our clients build profitable digital printing businesses through the latest technology and professional, comprehensive service.</p>
                    <p>We serve a diverse range of industries, including advertising, textiles, creative industries, and manufacturing, providing state-of-the-art equipment for every need. Our product lineup includes printers for advertising (banners, posters, stickers), textiles (jerseys, fashion), and industrial applications (large-scale UV printing and laser cutting).</p>
                     <p>This collection of tools, <strong>LayTools</strong>, was born from a direct need within our own teams and from observing the daily challenges our customers face. We created LayTools to provide a fast, efficient, and private way to handle common digital workflow tasks, helping our partners and the wider community become more productive.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="bg-[#E1FF01] p-6 border-4 border-black">
                    <h3 className="text-2xl font-black mb-2">100% Client-Side</h3>
                    <p className="font-bold">Your data never leaves your computer.</p>
                </div>
                 <div className="bg-white p-6 border-4 border-black">
                    <h3 className="text-2xl font-black mb-2">No Tracking</h3>
                    <p className="font-bold">We don't know who you are, and we like it that way.</p>
                </div>
                 <div className="bg-[#551EFD] p-6 border-4 border-black text-white">
                    <h3 className="text-2xl font-black mb-2">Always Free</h3>
                    <p className="font-bold">Powerful tools, accessible to everyone.</p>
                </div>
            </div>

            <div className="bg-white p-6 md:p-10 border-4 border-black">
                <SectionHeader>Our Roadmap</SectionHeader>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-2xl font-bold text-[#551EFD] mb-3">Next Up: PDF Powerhouse</h3>
                        <ul className="space-y-3 text-lg">
                            <li className="flex items-center gap-3"><CheckIcon className="text-gray-400" /> <span>Merge & Split PDFs</span></li>
                            <li className="flex items-center gap-3"><CheckIcon className="text-gray-400" /> <span>Convert PDF to JPG & vice-versa</span></li>
                            <li className="flex items-center gap-3"><CheckIcon className="text-gray-400" /> <span>Add Page Numbers & Watermarks</span></li>
                            <li className="flex items-center gap-3"><CheckIcon className="text-gray-400" /> <span>Rotate PDF Pages</span></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-[#551EFD] mb-3">Future: AI-Powered Utilities</h3>
                        <ul className="space-y-3 text-lg">
                             <li className="flex items-center gap-3"><CheckIcon className="text-gray-400" /> <span>AI Title & Prompt Generators</span></li>
                             <li className="flex items-center gap-3"><CheckIcon className="text-gray-400" /> <span>AI Image Meta Description Generator</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <Link to="/contact" className="px-8 py-4 border-2 border-black font-bold transition-all duration-150 ease-in-out bg-white text-black shadow-[4px_4px_0_#551EFD] hover:shadow-[2px_2px_0_#551EFD] active:shadow-none hover:-translate-x-px hover:-translate-y-px active:translate-x-1 active:translate-y-1">
                    Have an idea? Let us know!
                </Link>
            </div>
        </div>
    );
};

export default AboutPage;