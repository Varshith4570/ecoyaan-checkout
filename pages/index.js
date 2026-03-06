import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push('/cart');
    }, [router]);

    return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex items-center gap-3">
                <div className="h-4 w-4 rounded-full bg-emerald-500"></div>
                <div className="h-4 w-4 rounded-full bg-teal-500 delay-75"></div>
                <div className="h-4 w-4 rounded-full bg-emerald-600 delay-150"></div>
            </div>
        </div>
    );
}
