import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Zap, Lock, Wrench, AlertTriangle } from 'lucide-react';

export default function EmergencyGuide() {
  const emergencies = [
    {
      title: 'Fuite d\'eau',
      description: 'Que faire en cas de fuite d\'eau et comment limiter les dégâts en attendant un plombier.',
      icon: <Droplet className="h-8 w-8 text-blue-500" />,
      color: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800'
    },
    {
      title: 'Panne électrique',
      description: 'Les vérifications à faire et les précautions à prendre en cas de panne électrique.',
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      color: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800'
    },
    {
      title: 'Serrure bloquée',
      description: 'Comment réagir si vous êtes bloqué à l\'extérieur de votre domicile.',
      icon: <Lock className="h-8 w-8 text-gray-500" />,
      color: 'bg-gray-50',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-800'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Guide d'urgence</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Que faire en attendant l'artisan?
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Consultez nos guides pour savoir comment réagir en cas d'urgence.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-1 md:grid-cols-3">
          {emergencies.map((emergency, index) => (
            <div 
              key={index} 
              className={`${emergency.color} ${emergency.borderColor} border overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {emergency.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-medium ${emergency.textColor}`}>{emergency.title}</h3>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">{emergency.description}</p>
                </div>
                <div className="mt-6">
                  <Link 
                    to="/emergency" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Voir le guide
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-amber-500 mr-2" />
            <p className="text-sm text-amber-800">
              En cas d'urgence grave mettant en danger des personnes, appelez immédiatement les services d'urgence au <strong>112</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
