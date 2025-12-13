'use client';

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PayPalScriptProvider options={{
            clientId: "AXFjBTw4Q2bRlkfrROJVdpT2KzIZmL3kiLXncMZALV-19Jzv-wLJCArjpZNe5B3LgQgHKRbp7RKw96v0",
            currency: "USD",
            intent: "capture"
        }}>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </PayPalScriptProvider>
    );
}
