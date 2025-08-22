# Integracion SF <--> Redsys

Integración de la pasarela de pago **Redsys TPV Virtual** para comercios online.  
Este proyecto permite enviar pagos seguros a Redsys mediante **redirección** o **REST**, generando y validando firmas de seguridad (HMAC SHA-256).

---

## ✨ Características

- Envío de pagos hacia TPV Virtual Redsys.
- Generación automática de firmas seguras.
- Compatibilidad con integración **Redirección** y **REST**.
- Recepción y validación de notificaciones online.
- Configuración sencilla mediante variables de entorno.

---

## 📦 Requisitos

- PHP 7.4+ (adaptable a otros entornos).
- Extensión **cURL** (para REST).
- Credenciales de Redsys:
  - `Merchant Code` (FUC).
  - `Terminal`.
  - `Clave secreta` (SHA-256).
- Acceso a los entornos de Redsys (test o producción).

---

## 🔧 Instalación

Si utilizas Composer:

```bash
composer require psagredo99/integracionRedsys
