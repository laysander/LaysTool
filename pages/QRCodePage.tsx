import React, { useState, useEffect, ChangeEvent, useCallback, Suspense } from 'react';
import type { Options as QRCodeStylingOptions } from 'qr-code-styling';
import { useQRCodeStyling } from '../hooks/useQRCodeStyling';
import { formatWifi, formatVCard, formatSms, formatEmail, formatPhone, formatLocation, formatBitcoin } from '../utils/qrFormatters';
import Button from '../components/Button';
import Accordion from '../components/common/Accordion';
import ColorPicker from '../components/common/ColorPicker';
import QRScannerModal from '../components/qr-code/QRScannerModal';

type ContentType = 'url' | 'text' | 'email' | 'phone' | 'sms' | 'vcard' | 'wifi' | 'location' | 'bitcoin';

const initialOptions: QRCodeStylingOptions = {
    data: 'https://www.laysander.com/',
    width: 300,
    height: 300,
    margin: 10, // Default to a standard padding
    image: '',
    dotsOptions: {
        color: '#0b0b0b',
        type: 'rounded'
    },
    backgroundOptions: {
        color: '#ffffff',
    },
    cornersSquareOptions: {
        color: '#0b0b0b',
        type: 'extra-rounded'
    },
    cornersDotOptions: {
        color: '#0b0b0b',
        type: 'dot'
    },
    imageOptions: {
        crossOrigin: 'anonymous',
        margin: 5
    },
    qrOptions: {
        errorCorrectionLevel: 'Q'
    }
};

const cryptoCurrencies = ['Bitcoin', 'Bitcoin Cash', 'Ether', 'Litecoin', 'Dash'];
const sizePresets = [300, 600, 900, 1200];
const checkerboardStyle = {
    backgroundImage: 'linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
};


const QRCodePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ContentType>('url');
  const [options, setOptions] = useState<QRCodeStylingOptions>(initialOptions);
  
  // State for each content type's data
  const [textData, setTextData] = useState('Your text here');
  const [urlData, setUrlData] = useState('https://www.laysander.com/');
  const [wifiData, setWifiData] = useState({ ssid: 'MyNetwork', encryption: 'WPA', password: 'password123', isHidden: false });
  const [vCardData, setVCardData] = useState({ firstName: 'John', lastName: 'Doe', phone: '+123456789', email: 'john.doe@example.com', website: 'johndoe.com', company: 'Example Inc.', title: 'Developer' });
  const [smsData, setSmsData] = useState({ phone: '+123456789', message: 'Hello!' });
  const [emailData, setEmailData] = useState({ to: 'example@example.com', subject: 'Inquiry', body: 'Hello there,' });
  const [phoneData, setPhoneData] = useState('+123456789');
  const [locationData, setLocationData] = useState({ latitude: '40.7128', longitude: '-74.0060' });
  const [bitcoinData, setBitcoinData] = useState({ currency: 'Bitcoin', receiver: '', amount: '', message: '' });

  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const { ref, handleDownload } = useQRCodeStyling(options);
  
  // Update QR data when form inputs change
  useEffect(() => {
    let data = '';
    switch (activeTab) {
      case 'text': data = textData; break;
      case 'url': data = urlData; break;
      case 'wifi': data = formatWifi(wifiData); break;
      case 'vcard': data = formatVCard(vCardData); break;
      case 'sms': data = formatSms(smsData); break;
      case 'email': data = formatEmail(emailData); break;
      case 'phone': data = formatPhone(phoneData); break;
      case 'location': data = formatLocation(locationData); break;
      case 'bitcoin': data = formatBitcoin(bitcoinData); break;
    }
    setOptions(prev => ({ ...prev, data }));
  }, [activeTab, textData, urlData, wifiData, vCardData, smsData, emailData, phoneData, locationData, bitcoinData]);

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setOptions(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSizeSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = sizePresets[Number(e.target.value)] || 300;
    setOptions(prev => ({ ...prev, width: newSize, height: newSize }));
  };
  
  const onScanSuccess = useCallback((decodedText: string) => {
    alert(`Scanned QR Code:\n\n${decodedText}`);
    setIsScannerOpen(false);
  }, []);
  
  const handleScannerClose = useCallback(() => {
    setIsScannerOpen(false);
  }, []);
  
  const TabButton: React.FC<{tabName: ContentType, children: React.ReactNode}> = ({tabName, children}) => {
    const isActive = activeTab === tabName;
    return (
        <button 
            onClick={() => setActiveTab(tabName)}
            className={`px-3 py-2 text-sm font-bold border-2 border-black transition-colors duration-200 ${isActive ? 'bg-[#E1FF01] shadow-[2px_2px_0_#0b0b0b]' : 'bg-white hover:bg-gray-100'}`}
        >{children}</button>
    )
  }

  const renderForm = () => {
    const inputClass = "w-full p-2 border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-[#551EFD]";
    const selectClass = "w-full p-2 border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-[#551EFD]";
    switch(activeTab) {
        case 'url': return <input type="url" value={urlData} onChange={e => setUrlData(e.target.value)} placeholder="https://example.com" className={inputClass} />;
        case 'text': return <textarea value={textData} onChange={e => setTextData(e.target.value)} placeholder="Your text here" className={`${inputClass} resize-y bg-white`} rows={4}></textarea>;
        case 'email': return (
            <div className="space-y-2">
                <input type="email" placeholder="Email Address" value={emailData.to} onChange={e => setEmailData(s => ({...s, to: e.target.value}))} className={inputClass} />
                <input type="text" placeholder="Subject" value={emailData.subject} onChange={e => setEmailData(s => ({...s, subject: e.target.value}))} className={inputClass} />
                <textarea placeholder="Message" value={emailData.body} onChange={e => setEmailData(s => ({...s, body: e.target.value}))} className={`${inputClass} resize-y`} rows={3}></textarea>
            </div>
        );
        case 'phone': return <input type="tel" placeholder="Phone Number" value={phoneData} onChange={e => setPhoneData(e.target.value)} className={inputClass} />;
        case 'sms': return (
            <div className="space-y-2">
                <input type="tel" placeholder="Phone Number" value={smsData.phone} onChange={e => setSmsData(s => ({...s, phone: e.target.value}))} className={inputClass} />
                <textarea placeholder="Message" value={smsData.message} onChange={e => setSmsData(s => ({...s, message: e.target.value}))} className={`${inputClass} resize-y`} rows={3}></textarea>
            </div>
        );
        case 'wifi': return (
            <div className="space-y-2">
                <input type="text" placeholder="SSID (Network Name)" value={wifiData.ssid} onChange={e => setWifiData(s => ({ ...s, ssid: e.target.value }))} className={inputClass} />
                <input type="password" placeholder="Password" value={wifiData.password} onChange={e => setWifiData(s => ({ ...s, password: e.target.value }))} className={inputClass} />
                <select value={wifiData.encryption} onChange={e => setWifiData(s => ({ ...s, encryption: e.target.value }))} className={selectClass}>
                    <option value="WPA">WPA/WPA2</option><option value="WEP">WEP</option><option value="nopass">None</option>
                </select>
                 <label className="flex items-center gap-2"><input type="checkbox" checked={wifiData.isHidden} onChange={e => setWifiData(s => ({...s, isHidden: e.target.checked}))} /> Hidden Network</label>
            </div>
        );
        case 'vcard': return (
            <div className="space-y-2">
                <input type="text" placeholder="First Name" value={vCardData.firstName} onChange={e => setVCardData(s => ({...s, firstName: e.target.value}))} className={inputClass} />
                <input type="text" placeholder="Last Name" value={vCardData.lastName} onChange={e => setVCardData(s => ({...s, lastName: e.target.value}))} className={inputClass} />
                <input type="tel" placeholder="Phone" value={vCardData.phone} onChange={e => setVCardData(s => ({...s, phone: e.target.value}))} className={inputClass} />
                <input type="email" placeholder="Email" value={vCardData.email} onChange={e => setVCardData(s => ({...s, email: e.target.value}))} className={inputClass} />
            </div>
        );
        case 'location': return (
            <div className="flex gap-2">
                <input type="text" placeholder="Latitude" value={locationData.latitude} onChange={e => setLocationData(s => ({...s, latitude: e.target.value}))} className={inputClass} />
                <input type="text" placeholder="Longitude" value={locationData.longitude} onChange={e => setLocationData(s => ({...s, longitude: e.target.value}))} className={inputClass} />
            </div>
        );
        case 'bitcoin': return (
             <div className="space-y-2">
                <select value={bitcoinData.currency} onChange={e => setBitcoinData(s => ({...s, currency: e.target.value}))} className={selectClass}>
                    {cryptoCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input type="text" placeholder="Receiver Address" value={bitcoinData.receiver} onChange={e => setBitcoinData(s => ({...s, receiver: e.target.value}))} className={inputClass} />
                <input type="number" placeholder="Amount (optional)" value={bitcoinData.amount} onChange={e => setBitcoinData(s => ({...s, amount: e.target.value}))} className={inputClass} />
                <input type="text" placeholder="Message (optional)" value={bitcoinData.message} onChange={e => setBitcoinData(s => ({...s, message: e.target.value}))} className={inputClass} />
            </div>
        );
        default: return <input type="text" value={urlData} onChange={e => setUrlData(e.target.value)} className={inputClass} />;
    }
  }

  return (
    <div>
        <header>
          <h1 className="text-5xl font-black mb-2 mt-12">Enhanced QR Code Generator</h1>
          <p className="text-xl text-gray-600 mb-8">Create and customize QR codes for any purpose.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Column: Controls */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0_#0b0b0b]">
                    <h2 className="text-2xl font-black mb-4">Content</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <TabButton tabName="url">URL</TabButton>
                        <TabButton tabName="text">Text</TabButton>
                        <TabButton tabName="email">Email</TabButton>
                        <TabButton tabName="phone">Phone</TabButton>
                        <TabButton tabName="sms">SMS</TabButton>
                        <TabButton tabName="vcard">vCard</TabButton>
                        <TabButton tabName="wifi">WiFi</TabButton>
                        <TabButton tabName="location">Location</TabButton>
                        <TabButton tabName="bitcoin">Bitcoin</TabButton>
                    </div>
                    {renderForm()}
                </div>
                
                <div className="space-y-2">
                    <Accordion title="Styling">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-2">Padding</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer font-normal">
                                        <input
                                            type="radio"
                                            name="padding"
                                            value="none"
                                            checked={!options.margin || options.margin === 0}
                                            onChange={() => setOptions(prev => ({ ...prev, margin: 0 }))}
                                            className="w-4 h-4 accent-[#551EFD]"
                                        />
                                        <span>None</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer font-normal">
                                        <input
                                            type="radio"
                                            name="padding"
                                            value="padded"
                                            checked={!!options.margin && options.margin > 0}
                                            onChange={() => setOptions(prev => ({ ...prev, margin: 10 }))}
                                            className="w-4 h-4 accent-[#551EFD]"
                                        />
                                        <span>With Padding</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="qr-size" className="block text-sm font-bold mb-1 flex justify-between">
                                    <span>Size</span>
                                    <span className="font-mono">{options.width}px</span>
                                </label>
                                <input
                                    id="qr-size"
                                    type="range"
                                    min="0"
                                    max={sizePresets.length - 1}
                                    step="1"
                                    value={sizePresets.indexOf(options.width || 300)}
                                    onChange={handleSizeSliderChange}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#551EFD]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Dot Style</label>
                                <select value={options.dotsOptions?.type} onChange={e => setOptions(o => ({ ...o, dotsOptions: { ...o.dotsOptions, type: e.target.value as any } }))} className="w-full p-2 border-2 border-black bg-white">
                                    <option value="rounded">Rounded</option><option value="dots">Dots</option><option value="classy">Classy</option><option value="classy-rounded">Classy Rounded</option><option value="square">Square</option><option value="extra-rounded">Extra Rounded</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Corner Square Style</label>
                                <select value={options.cornersSquareOptions?.type} onChange={e => setOptions(o => ({ ...o, cornersSquareOptions: { ...o.cornersSquareOptions, type: e.target.value as any } }))} className="w-full p-2 border-2 border-black bg-white">
                                    <option value="extra-rounded">Extra Rounded</option><option value="dot">Dot</option><option value="square">Square</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-bold mb-1">Corner Dot Style</label>
                                <select value={options.cornersDotOptions?.type} onChange={e => setOptions(o => ({ ...o, cornersDotOptions: { ...o.cornersDotOptions, type: e.target.value as any } }))} className="w-full p-2 border-2 border-black bg-white">
                                   <option value="dot">Dot</option><option value="square">Square</option>
                                </select>
                            </div>
                        </div>
                    </Accordion>
                    <Accordion title="Colors">
                        <div className="grid grid-cols-2 gap-4">
                            <ColorPicker id="dot-color" label="Dots" value={options.dotsOptions?.color || '#000000'} onChange={e => setOptions(o => ({ ...o, dotsOptions: { ...o.dotsOptions, color: e.target.value } }))} />
                            <ColorPicker id="bg-color" label="Background" value={options.backgroundOptions?.color || '#ffffff'} onChange={e => setOptions(o => ({ ...o, backgroundOptions: { ...o.backgroundOptions, color: e.target.value } }))} />
                            <ColorPicker id="corner-square-color" label="Corner Squares" value={options.cornersSquareOptions?.color || '#000000'} onChange={e => setOptions(o => ({ ...o, cornersSquareOptions: { ...o.cornersSquareOptions, color: e.target.value } }))} />
                            <ColorPicker id="corner-dot-color" label="Corner Dots" value={options.cornersDotOptions?.color || '#000000'} onChange={e => setOptions(o => ({ ...o, cornersDotOptions: { ...o.cornersDotOptions, color: e.target.value } }))} />
                        </div>
                    </Accordion>
                    <Accordion title="Logo">
                        <div>
                           <label className="block text-sm font-bold mb-1">Upload Logo</label>
                           <input type="file" accept="image/png, image/jpeg, image/svg+xml" onChange={handleLogoUpload} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:font-bold file:bg-[#E1FF01] file:text-black hover:file:bg-[#E1FF01]/80" />
                           {options.image && <Button className="w-full mt-2" variant="secondary" onClick={() => setOptions(o => ({...o, image: ''}))}>Remove Logo</Button>}
                        </div>
                    </Accordion>
                </div>
                
                 <div className="bg-white border-4 border-black p-4 space-y-2">
                    <h2 className="text-2xl font-black mb-2">Tools</h2>
                    <Button onClick={() => setIsScannerOpen(true)} className="w-full" variant="secondary">Scan QR Code</Button>
                </div>
            </div>

            {/* Right Column: Preview & Download */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center bg-white p-6 border-4 border-black shadow-[8px_8px_0_#551EFD]">
                <div 
                  ref={ref} 
                  style={checkerboardStyle}
                  className="w-full max-w-full aspect-square border-2 border-dashed border-black flex items-center justify-center overflow-hidden"
                />
                
                <div className="w-full max-w-md mt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <Button onClick={() => handleDownload('png')} disabled={!options.data} variant="primary" className="w-full">Download PNG</Button>
                        <Button onClick={() => handleDownload('svg')} disabled={!options.data} variant="primary" className="w-full">Download SVG</Button>
                    </div>
                </div>
            </div>
        </div>
        <Suspense fallback={
            <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
                <p className="text-white text-xl font-bold">Initializing Camera...</p>
            </div>
        }>
            <QRScannerModal isOpen={isScannerOpen} onClose={handleScannerClose} onScanSuccess={onScanSuccess} />
        </Suspense>
    </div>
  );
};

export default QRCodePage;