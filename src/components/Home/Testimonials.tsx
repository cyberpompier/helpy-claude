import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      content: "J'ai eu une fuite d'eau en pleine nuit. Grâce à Artisan Connect, j'ai trouvé un plombier disponible en moins de 30 minutes. Service impeccable!",
      author: "Marie Dupont",
      role: "Propriétaire",
      rating: 5
    },
    {
      content: "Ma serrure s'est bloquée un dimanche. J'ai pu contacter un serrurier via l'application qui est intervenu rapidement. Je recommande!",
      author: "Thomas Martin",
      role: "Locataire",
      rating: 5
    },
    {
      content: "Panne électrique résolue en un temps record. L'électricien était professionnel et efficace. L'application est vraiment pratique en cas d'urgence.",
      author: "Sophie Leroy",
      role: "Gérante de boutique",
      rating: 4
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Témoignages</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Ce que nos utilisateurs disent
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Découvrez les expériences de nos utilisateurs avec Artisan Connect.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-6 py-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill={i < testimonial.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-800 font-medium">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
