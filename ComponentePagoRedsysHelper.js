({
	prepareRedsysData: function(component, merchantData, secretKey) {

		var jsonString = JSON.stringify(merchantData);
        let jsonStringLimpio = jsonString.replace(/:/g, ': ');
	
        var merchantDataBase64Data = btoa(jsonStringLimpio);
        var secretKeyBase64 = CryptoJS.enc.Base64.parse(secretKey);        
        var iv = CryptoJS.enc.Hex.parse('0000000000000000'); 
        
        try {
            var cipher = CryptoJS.TripleDES.encrypt(merchantData.DS_MERCHANT_ORDER, secretKeyBase64, {
            iv:iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
        } catch (error) {
            console.error("Error occurred:" + error);
        }
        
        var signature = CryptoJS.HmacSHA256(merchantDataBase64Data, cipher.ciphertext);
        var signatureBase64 = signature.toString(CryptoJS.enc.Base64);        
                
        return {	
            signatureVersion: "HMAC_SHA256_V1",
            merchantParameters: merchantDataBase64Data,
            signature: signatureBase64
        };
        
    	},
    
})