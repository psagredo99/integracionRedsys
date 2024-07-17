({
   
doInit : function(component, event, helper) {
    	console.log('DoInit - PASA DONINIT');
    	var amountFormatted = component.get("v.Ds_Merchant_Amount")/100;
    	component.set("v.Ds_Merchant_Amount_Mod",amountFormatted);
    	
    	var merchantData={ 
            "DS_MERCHANT_AMOUNT": component.get("v.Ds_Merchant_Amount"),
            "DS_MERCHANT_CURRENCY":"978",
            "DS_MERCHANT_ORDER":component.get("v.Ds_Merchant_Order"),		
            "DS_MERCHANT_MERCHANTCODE":component.get("v.Ds_Merchant_MerchantCode"),
            "DS_MERCHANT_TRANSACTIONTYPE":"0",
            "DS_MERCHANT_TERMINAL":component.get("v.Ds_Merchant_Terminal")
            
        };     
    	
    	component.set("v.merchantData", merchantData);
		    
    	var secretKey = component.get("v.Signature");    
        var preparedData = helper.prepareRedsysData(component, merchantData, secretKey);
    	var merchantParametersValue=preparedData.merchantParameters;
        var signatureValue=preparedData.signature;

    	component.set("v.merchantParameters",merchantParametersValue);
    	component.set("v.Signature",signatureValue);
    
    },

    handleSubmit: function(component, event, helper) {
            
        var form = component.find("paymentForm").getElement();
        form.submit();
    },
   
})