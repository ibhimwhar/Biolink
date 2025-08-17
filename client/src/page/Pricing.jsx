
const PricingPage = () => {
    const plans = [
        {
            name: 'Free',
            price: '$0',
            description: 'Perfect for getting started with BioLink 🚀',
            features: [
                'Basic BioLink card',
                'Limited customization',
                'Public access only',
                'Basic analytics',
            ],
            buttonText: 'Get Started',
            featured: false,
        },
        {
            name: 'Pro',
            price: '$9/mo',
            description: 'For creators who want more control and insights 🔍',
            features: [
                'Advanced customization',
                'Private links with Clerk auth',
                'Real-time analytics',
                'Priority support',
            ],
            buttonText: 'Upgrade to Pro',
            featured: true,
        },
        {
            name: 'Creator',
            price: '$19/mo',
            description: 'Built for serious creators and influencers 🎤',
            features: [
                'All Pro features',
                'Team collaboration',
                'Custom domains',
                'API access',
            ],
            buttonText: 'Go Creator',
            featured: false,
        },
    ];

    return (
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 border-t border-slate-700 pt-10 pb-6 rounded-lg py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-white">💸 Simple, Transparent Pricing</h2>
                <p className="mt-4 text-lg text-neutral-200">
                    🎯 Choose the plan that fits your creative journey.
                </p>
            </div>

            <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`mt-6 relative border rounded-lg px-6 pt-16 pb-6 bg-white transition-all duration-300 ${plan.featured
                            ? 'md:scale-110 z-10 border-indigo-600 shadow-xl'
                            : 'border-indigo-300 md:scale-90'
                            }`}
                    >
                        {plan.featured && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                🔥 Most Popular
                            </div>
                        )}
                        <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                        <p className="mt-2 text-4xl font-bold text-indigo-600">{plan.price}</p>
                        <p className="mt-2 text-gray-600">{plan.description}</p>
                        <ul className="mt-4 space-y-2 text-sm text-gray-700 ml-4">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="list-disc">{feature}</li>
                            ))}
                        </ul>
                        <button className="mt-6 w-full bg-indigo-600 cursor-pointer text-white py-2 rounded hover:bg-indigo-700 transition">
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PricingPage;