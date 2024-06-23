import { AppProps } from "next/app";

export default function SideBar({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />
}