import Link from 'next/link';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col font-sans text-slate-800">
            <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100 transition-all duration-300">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold group-hover:shadow-lg transition-all duration-300">
                                E
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
                                Ecoyaan
                            </span>
                        </Link>
                        <nav className="flex items-center space-x-6">
                            <Link href="/cart" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors border-b-2 border-transparent hover:border-emerald-600 pb-1">
                                Cart
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl rounded-tr-none translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" aria-hidden="true" />
                {children}
            </main>

            <footer className="bg-white border-t border-slate-200 mt-auto">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500 font-medium">
                        © {new Date().getFullYear()} Ecoyaan. All rights reserved.
                    </p>
                    <div className="flex space-x-4 text-sm text-slate-400">
                        <span className="hover:text-emerald-500 cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-emerald-500 cursor-pointer transition-colors">Terms of Service</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
