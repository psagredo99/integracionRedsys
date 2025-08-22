# integracionRedsys para Salesforce (LWC)

Integración de la pasarela de pago **Redsys TPV Virtual** en **Salesforce** utilizando **Lightning Web Components (LWC)** y **Apex**.  
Este proyecto facilita la conexión entre Salesforce y Redsys, permitiendo a los usuarios realizar pagos seguros directamente desde un componente Lightning.

---

## ✨ Características

- ✅ Integración Redsys en Salesforce.
- ✅ Soporte para **entorno de pruebas (sandbox)** y **producción**.
- ✅ Generación y validación de firmas HMAC SHA-256.
- ✅ Redirección del cliente a la pasarela de pago desde un LWC.
- ✅ Recepción y validación de notificaciones (Webhook) en Apex.

---

## 📦 Requisitos

- Salesforce org con **Lightning Web Components** habilitados.
- Acceso a **Apex classes** y **Named Credentials**.
- Credenciales de Redsys:
  - `Merchant Code` (FUC).
  - `Terminal`.
  - `Clave secreta (SHA-256)`.
- Acceso al entorno de pruebas o producción de Redsys.

---

## ⚙️ Configuración en Salesforce

1. **Credenciales de Redsys**  
   Configura en **Custom Metadata** o **Custom Settings**:
   - Merchant Code (FUC).
   - Terminal.
   - Clave secreta (SHA-256).
   - Entorno (`test` o `production`).

2. **Endpoints de Redsys**
   - **Sandbox:** `https://sis-t.redsys.es:25443/sis/realizarPago`
   - **Producción:** `https://sis.redsys.es/sis/realizarPago`

3. **Notificación Online (Webhook)**  
   Configura en Redsys la URL pública de tu Salesforce (ejemplo usando **Sites** o **Experience Cloud**) para recibir la notificación `Ds_MerchantParameters`.

---

## 🚀 Ejemplo de uso en LWC

### LWC (JavaScript)
```js
import { LightningElement, api, track, wire } from 'lwc';
import generateRedsysForm from '@salesforce/apex/RedsysController.generateRedsysForm';

export default class RedsysPayment extends LightningElement {
    @track formHtml;

    connectedCallback() {
        generateRedsysForm({ amount: 1000, orderId: 'SF20250822001' })
            .then(result => {
                this.formHtml = result;
                this.template.querySelector('.form-container').innerHTML = this.formHtml;
                this.template.querySelector('form').submit(); // Auto-submit
            })
            .catch(error => {
                console.error('Error generando formulario Redsys:', error);
            });
    }
}
