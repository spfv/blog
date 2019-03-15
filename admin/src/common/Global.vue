// 全局变量

<script>
//全局变量
import CryptoJS from 'crypto-js'
const LicenseID = Encrypt("0005"); // 加密后的LicenseID
	const Key = Encrypt('csA9pXFfyJXmdtBbQKpBDkAFPGWbWs2x'); // 加密后的key
	const Source = 'E0B38BCEE4C447CC';
	const headers={  //平台头
		LicenseID:LicenseID, 
		Key:Key,
		Source:Source,
	}
 export default
 {
  LicenseID,//加密后的LicenseID
  Key,//加密后的key
  Source,
  headers,
 }
function Encrypt(data) {
	var key = CryptoJS.enc.Latin1.parse('csA9pXFfyJXmdtBbQKpBDkAFPGWbWs2x'); // 接口验证key
	var iv = CryptoJS.enc.Latin1.parse('E0B38BCEE4C447CC'); //  接口识别号
	var encrypted = CryptoJS.AES.encrypt(data, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.ZeroPadding
	});
	return encodeURIComponent(CryptoJS.enc.Base64.stringify(encrypted.ciphertext));
}

</script>