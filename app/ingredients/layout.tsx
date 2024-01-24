import Loading from "@/app/ui/loading";
import React, {ReactNode, Suspense} from "react";

export default function RootLayout({children}: { children: ReactNode }) {
    return <Suspense fallback={<Loading/>}>
        {children}
    </Suspense>
}
