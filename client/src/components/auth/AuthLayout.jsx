import React from 'react';

const AuthLayout = ({ children, title, subtitle, features }) => {
    return (
        <div className="min-h-screen bg-[#020420] flex">
            {/* Left Side - Brand Section */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-violet-900">
                <div className="absolute inset-0 mix-blend-overlay bg-gradient-to-t from-[#020420] via-transparent to-transparent"></div>
                <div className="relative z-10 px-16 flex flex-col justify-center">
                    <div className="absolute -left-20 -top-20 w-60 h-60 bg-blue-500/30 rounded-full filter blur-3xl"></div>
                    <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-violet-500/30 rounded-full filter blur-3xl"></div>
                    
                    <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 text-6xl font-bold leading-tight mb-6">
                        {title}
                    </h1>
                    <p className="text-blue-100/80 text-lg mb-8">{subtitle}</p>
                    <div className="grid grid-cols-2 gap-4">
                        {features.map((item) => (
                            <div key={item} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg px-4 py-3 hover:border-blue-500/50 transition-colors">
                                <span className="text-blue-300 text-sm font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-[#020420]/95">
                <div className="w-full max-w-md relative">
                    <div className="absolute -left-20 -top-20 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
