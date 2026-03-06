import '../styles/globals.css';
import { CheckoutProvider } from '../context/CheckoutContext';
import Layout from '../components/Layout';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Ecoyaan Checkout</title>
                <meta name="description" content="Ecoyaan simplified checkout flow" />
            </Head>
            <CheckoutProvider>
                <div className={inter.className}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </div>
            </CheckoutProvider>
        </>
    );
}

export default MyApp;
