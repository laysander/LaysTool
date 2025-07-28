export const formatWifi = (data: { ssid: string; encryption: string; password?: string; isHidden?: boolean; }) => {
    let wifiString = `WIFI:T:${data.encryption};S:${data.ssid};`;
    if (data.password) {
        wifiString += `P:${data.password};`;
    }
    if (data.isHidden) {
        wifiString += `H:true;`;
    }
    wifiString += ';';
    return wifiString;
};

export const formatVCard = (data: { firstName: string, lastName: string, phone: string, email: string, website: string, company: string, title: string }) => {
    // Basic vCard format, can be extended
    return `BEGIN:VCARD
VERSION:3.0
N:${data.lastName};${data.firstName}
FN:${data.firstName} ${data.lastName}
ORG:${data.company}
TITLE:${data.title}
TEL;TYPE=WORK,VOICE:${data.phone}
EMAIL:${data.email}
URL:${data.website}
END:VCARD`;
}

export const formatSms = (data: { phone: string, message: string }) => `smsto:${data.phone}:${encodeURIComponent(data.message)}`;

export const formatEmail = (data: { to: string, subject: string, body: string }) => `mailto:${data.to}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.body)}`;

export const formatPhone = (phone: string) => `tel:${phone}`;

export const formatLocation = (data: { latitude: string, longitude: string}) => `geo:${data.latitude},${data.longitude}`;

export const formatBitcoin = (data: { currency: string, receiver: string, amount?: string, message?: string }) => {
    if (!data.receiver) return '';

    const scheme = data.currency.toLowerCase().replace(/\s/g, ''); // e.g., 'bitcoincash'
    let uri = `${scheme}:${data.receiver}`;

    const params = new URLSearchParams();
    if (data.amount && parseFloat(data.amount) > 0) {
        // 'value' for ETH (in Wei), 'amount' for others. For simplicity, we assume standard units.
        const amountParam = scheme === 'ether' ? 'value' : 'amount';
        params.append(amountParam, data.amount);
    }
    if (data.message) {
        params.append('message', encodeURIComponent(data.message));
    }
    
    const queryString = params.toString();
    if (queryString) {
        uri += `?${queryString}`;
    }
    
    return uri;
};
