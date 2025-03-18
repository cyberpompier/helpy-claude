import React from 'react';
import { MapPin, Search, MessageSquare, Tool } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      title: 'Localisez-vous',
      description: 'Activez votre géolocalisation pour trouver les artisans disponibles près de chez vous.',
      icon: <MapPin className="h-10 w-10 text-indigo-600" />
    },
    {
      title: 'Trouvez un artisan',
      description: 'Consultez la carte pour voir les artisans disponibles et leurs spécialités.',
      icon: <Search className="h-10 w-10 text-indigo-600" />
    },
    {
      title: 'Contactez-le',
      description: 'Discutez directement avec l\'artisan via notre messagerie intégrée.',
      icon: <MessageSquare className="h-10 w-10 text-indigo-600" />
    },
    {
      title: 'Problème résolu',
      description: 'L\'artisan intervient rapidement pour résoudre votre problème.',
      icon: <Tool className="h-10 w-10 text-indigo-600" />
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Comment ça marche</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Simple, rapide et efficace
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Artisan Connect vous permet de trouver un professionnel qualifié en quelques clics.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                        {step.icon}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{step.title}</h3>
                    <p className="mt-5 text-base text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
