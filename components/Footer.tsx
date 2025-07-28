import React from 'react';
import { Link } from 'react-router-dom';

const TwitterIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
);

const TikTokIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg>
);

const InstagramIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.441c-3.117 0-3.483.011-4.71.069-2.734.123-3.951 1.348-4.074 4.074-.058 1.226-.069 1.591-.069 4.71s.011 3.483.069 4.71c.123 2.726 1.34 3.951 4.074 4.074 1.226.058 1.591.069 4.71.069s3.483-.011 4.71-.069c2.726-.123 3.951-1.348 4.074-4.074.058-1.226.069-1.591.069-4.71s-.011-3.483-.069-4.71c-.123-2.726-1.34-3.951-4.074-4.074-1.226-.058-1.591-.069-4.71-.069zM12 6.875a5.125 5.125 0 1 0 0 10.25 5.125 5.125 0 0 0 0-10.25zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"></path></svg>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t-4 border-black mt-auto">
            <div className="container mx-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Brand Section */}
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black">LayTools</h2>
                        <p className="font-bold text-lg text-[#551EFD]">Free. Fast. Yours.</p>
                        <p className="text-gray-700">Powerful web tools that work entirely in your browser. No uploads, no tracking, just pure functionality.</p>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:mx-auto">
                        <h3 className="text-xl font-black mb-3 uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="font-bold hover:underline">All Tools</Link></li>
                            <li><Link to="/about" className="font-bold hover:underline">About</Link></li>
                            <li><Link to="/security" className="font-bold hover:underline">Security</Link></li>
                            <li><Link to="/contact" className="font-bold hover:underline">Contact</Link></li>
                            <li><Link to="/privacy" className="font-bold hover:underline">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="font-bold hover:underline">Terms of Use</Link></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="lg:mx-auto">
                        <h3 className="text-xl font-black mb-3 uppercase tracking-wider">Follow Us</h3>
                        <div className="flex justify-center md:justify-start gap-4">
                            <a href="https://twitter.com/laysander" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#551EFD] transition-colors"><TwitterIcon /></a>
                            <a href="https://www.tiktok.com/@laysander.technology" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#551EFD] transition-colors"><TikTokIcon /></a>
                            <a href="https://www.instagram.com/laysander.technology/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#551EFD] transition-colors"><InstagramIcon /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t-2 border-black mt-8 pt-6 text-center text-sm text-gray-600 space-y-2 md:flex md:justify-between md:space-y-0">
                    <p className="font-bold">&copy; {new Date().getFullYear()} LayTools. All rights reserved.</p>
                    <p className="font-bold">Made with ❤️ for productivity</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
