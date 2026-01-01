import { CheckCircle, Heart } from 'lucide-react';

export default function PremiumFooter() {
    return (
        <footer className="mt-20 bg-white rounded-[50px] p-8 md:p-12 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-16 mx-6 mb-12">
            <div>
                <h4 className="text-3xl font-black mb-8 text-gray-900 leading-tight">
                    Why Choose<br />
                    <span className="text-red-600 underline decoration-red-100 decoration-4 underline-offset-8">Hungry Brain?</span>
                </h4>
                <div className="space-y-8">
                    {[
                        { t: "Scientific Design", d: "Research-based stimulation for infants and toddlers." },
                        { t: "Professional Images", d: "Real-world photography for accurate identification." },
                        { t: "Bonding Experience", d: "Creating meaningful learning moments with parents." }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start">
                            <div className="bg-red-50 p-2 rounded-xl mr-5 mt-1">
                                <CheckCircle className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <h5 className="font-black text-slate-800 mb-1">{item.t}</h5>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.d}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-slate-900 rounded-[40px] p-10 text-white flex flex-col justify-center relative overflow-hidden group shadow-2xl">
                <div className="relative z-10">
                    <h4 className="text-3xl font-black mb-6 italic leading-snug">"Learning should be as natural as breathing."</h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                        Amader prothiti card bacchader koutuhol barate sahayyo kore. E-ti sudhu ekhti card noy, e-ti bachha ebong baba-maer modhye ekhti shundor bonding-er madhyom.
                    </p>
                    <div className="flex items-center space-x-4">
                        <Heart className="w-10 h-10 text-red-500 fill-current animate-pulse" />
                        <div>
                            <div className="font-black tracking-wide">Hungry Brain Academy</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Early Learning Experts</div>
                        </div>
                    </div>
                </div>
                {/* Decorative Circle */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-slate-800 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            </div>
        </footer>
    );
}
