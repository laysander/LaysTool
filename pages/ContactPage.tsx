import React, { useState } from 'react';
import Button from '../components/Button';

const ContactPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('General Inquiry');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email && message) {
            setSubmitted(true);
        }
    };

    const inputClass = "w-full p-3 border-2 border-black font-bold bg-white focus:outline-none focus:ring-2 focus:ring-[#551EFD]";
    const selectClass = "w-full p-3 border-2 border-black font-bold bg-white focus:outline-none focus:ring-2 focus:ring-[#551EFD]";

    return (
        <div className="max-w-3xl mx-auto py-8 space-y-12">
            <header className="text-center">
                <h1 className="text-5xl md:text-6xl font-black mb-4 mt-12">Get In Touch</h1>
                <p className="text-xl md:text-2xl text-gray-700">Have a question, a feature idea, or a bug to report? We'd love to hear it.</p>
            </header>

            <div className="bg-white p-6 md:p-10 border-4 border-black shadow-[8px_8px_0_#551EFD]">
                {submitted ? (
                     <div className="text-center py-12">
                        <h2 className="text-4xl font-black text-green-600 mb-4">Thank You!</h2>
                        <p className="text-xl">Your message has been sent. We appreciate your feedback.</p>
                        <p className="text-gray-600 mt-2">(Note: This is a demo form. No data was actually sent.)</p>
                     </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-lg font-bold mb-2">Name</label>
                                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className={inputClass} required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-lg font-bold mb-2">Email</label>
                                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} required />
                            </div>
                        </div>
                        <div>
                             <label htmlFor="subject" className="block text-lg font-bold mb-2">Topic</label>
                             <select id="subject" value={subject} onChange={e => setSubject(e.target.value)} className={selectClass} required>
                                <option>General Inquiry</option>
                                <option>Feature Request</option>
                                <option>Bug Report</option>
                             </select>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-lg font-bold mb-2">Message</label>
                            <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={6} className={`${inputClass} resize-y`} required></textarea>
                        </div>
                        <div className="text-center">
                            <Button type="submit" variant="primary">Send Message</Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactPage;