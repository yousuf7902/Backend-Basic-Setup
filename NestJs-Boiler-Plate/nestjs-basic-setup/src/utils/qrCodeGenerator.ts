import * as QRcode from 'qrcode';

export const generateQrCode = async (text: string): Promise<string> => {
  const qrCodeUrl = await QRcode.toDataURL(text, {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    width: 250, 
    quality: 0.3,
    margin: 2,
    scale: 8  ,
    color: {
        dark: '#000000',
        light: '#FFFFFF' 
    },
  });
  return qrCodeUrl;
};
