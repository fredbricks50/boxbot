import './bootstrap';
import './currency';
import QRCode from 'qrcode';

window.generateQRCodeImage = (text) => {
  return QRCode.toDataURL(text, {
      width: 300,
      height: 300,
      colorDark: "#000000",
      colorLight: "#ffffff",
      errorCorrectionLevel: 'H' // use string version for this lib
  });
};