import React, { useState } from 'react';
import { Droplet, Zap, Lock, Wrench, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

export default function EmergencyGuidePage() {
  const [openSection, setOpenSection] = useState<string | null>('water');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const emergencyGuides = [
    {
      id: 'water',
      title: 'Fuite d\'eau',
      icon: <Droplet className="h-6 w-6 text-blue-500" />,
      color: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      steps: [
        {
          title: 'Coupez l\'eau',
          description: 'Localisez le robinet d\'arrêt général (souvent près du compteur d\'eau) et fermez-le en tournant dans le sens des aiguilles d\'une montre.'
        },
        {
          title: 'Coupez l\'électricité',
          description: 'Si l\'eau s\'approche de prises électriques ou d\'appareils, coupez l\'électricité au disjoncteur principal.'
        },
        {
          title: 'Limitez les dégâts',
          description: 'Placez des serviettes, des bassines ou des récipients pour recueillir l\'eau. Déplacez les objets de valeur.'
        },
        {
          title: 'Identifiez la source',
          description: 'Essayez de déterminer d\'où vient la fuite (tuyau, joint, appareil électroménager).'
        },
        {
          title: 'Contactez un plombier',
          description: 'Utilisez notre application pour trouver un plombier disponible près de chez vous.'
        }
      ]
    },
    {
      id: 'electric',
      title: 'Panne électrique',
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      color: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      steps: [
        {
          title: 'Vérifiez le disjoncteur',
          description: 'Regardez si un disjoncteur a sauté dans votre tableau électrique. Si c\'est le cas, remettez-le en position.'
        },
        {
          title: 'Vérifiez si le problème est localisé',
          description: 'Déterminez si la panne affecte tout votre logement ou seulement une partie.'
        },
        {
          title: 'Vérifiez chez vos voisins',
          description: 'Si vos voisins sont également touchés, il peut s\'agir d\'une panne du réseau.'
        },
        {
          title: 'Débranchez les appareils sensibles',
          description: 'Protégez vos appareils électroniques en les débranchant jusqu\'à ce que le courant soit stabilisé.'
        },
        {
          title: 'Contactez un électricien',
          description: 'Si vous ne pouvez pas résoudre le problème, utilisez notre application pour trouver un électricien.'
        }
      ]
    },
    {
      id: 'lock',
      title: 'Serrure bloquée',
      icon: <Lock className="h-6 w-6 text-gray-500" />,
      color: 'bg-gray-50',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-800',
      steps: [
        {
          title: 'Vérifiez votre clé',
          description: 'Assurez-vous que vous utilisez la bonne clé et qu\'elle n\'est pas endommagée.'
        },
        {
          title: 'Lubrifiez la serrure',
          description: 'Si possible, appliquez un lubrifiant spécial serrure dans le cylindre.'
        },
        {
          title: 'Essayez de tourner doucement',
          description: 'Exercez une légère pression en tournant la clé d\'avant en arrière pour débloquer le mécanisme.'
        },
        {
          title: 'Vérifiez d\'autres entrées',
          description: 'Si vous êtes bloqué à l\'extérieur, vérifiez si d\'autres portes ou fenêtres sont accessibles.'
        },
        {
          title: 'Contactez un serrurier',
          description: 'Si vous ne pouvez pas ouvrir la porte, utilisez notre application pour trouver un serrurier.'
        }
      ]
    },
    {
      id: 'heating',
      title: 'Panne de chauffage',
      icon: <Wrench className="h-6 w-6 text-red-500" />,
      color: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      steps: [
        {
          title: 'Vérifiez le thermostat',
          description: 'Assurez-vous que le thermostat est allumé et réglé à la bonne température.'
        },
        {
          title: 'Vérifiez l\'alimentation',
          description: 'Assurez-vous que votre chaudière ou système de chauffage est bien alimenté en électricité.'
        },
        {
          title: 'Vérifiez la pression',
          description: 'Pour les chaudières à gaz, vérifiez que la pression est dans la plage recommandée (généralement entre 1 et 1,5 bar).'
        },
        {
          title: 'Vérifiez les radiateurs',
          description: 'Assurez-vous que les radiateurs ne sont pas bloqués par de l\'air (purgez-les si nécessaire).'
        },
        {
          title: 'Contactez un chauffagiste',
          description: 'Si vous ne pouvez pas résoudre le problème, utilisez notre application pour trouver un chauffagiste.'
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Guide d'urgence
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Que faire en attendant l'intervention d'un artisan?
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">Attention</h3>
            <div className="mt-2 text-sm text-amber-700">
              <p>
                Ces conseils sont donnés à titre indicatif pour vous aider à gérer une situation d'urgence en attendant l'intervention d'un professionnel. En cas d'urgence grave mettant en danger des personnes, appelez immédiatement les services d'urgence au <strong>112</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {emergencyGuides.map((guide) => (
          <div 
            key={guide.id} 
            className={`${guide.color} ${guide.borderColor} border rounded-lg overflow-hidden`}
          >
            <button
              onClick={() => toggleSection(guide.id)}
              className="w-full px-4 py-5 sm:p-6 text-left flex justify-between items-center"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {guide.icon}
                </div>
                <h3 className={`ml-3 text-lg font-medium ${guide.textColor}`}>
                  {guide.title}
                </h3>
              </div>
              {openSection === guide.id ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {openSection === guide.id && (
              <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <div className="space-y-4">
                  {guide.steps.map((step, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="text-base font-medium text-gray-900">
                        {index + 1}. {step.title}
                      </h4>
                      <p className="mt-2 text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
