import React from 'react';
import {
  CreditCard,
  Zap,
  ArrowLeftRight,
  FileSpreadsheet,
  Receipt,
  Landmark,
  BarChart3,
  Link2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SolutionsTabsProps {
  activeTabId?: string;
  onOpenContact?: (subject: string) => void;
}

export const SolutionsTabs: React.FC<SolutionsTabsProps> = () => {
  const { t } = useLanguage();

  const features = [
    {
      id: 'cartao',
      icon: CreditCard,
      title: t('solutions.feature.cartao.title') || 'Cartão de Crédito',
      description: t('solutions.feature.cartao.desc') || 'Cartão corporativo físico e virtual com limite flexível e gestão em tempo real.'
    },
    {
      id: 'pix',
      icon: Zap,
      title: t('solutions.feature.pix.title') || 'Pix',
      description: t('solutions.feature.pix.desc') || 'Transferências e recebimentos instantâneos 24/7 com chaves e QR Code dinâmico.'
    },
    {
      id: 'ted',
      icon: ArrowLeftRight,
      title: t('solutions.feature.ted.title') || 'TED',
      description: t('solutions.feature.ted.desc') || 'Transferências bancárias pontuais e em lote para qualquer instituição do país.'
    },
    {
      id: 'cobrancas',
      icon: FileSpreadsheet,
      title: t('solutions.feature.cobrancas.title') || 'Gestão de cobranças',
      description: t('solutions.feature.cobrancas.desc') || 'Controle de inadimplência, réguas automáticas e conciliação bancária completa.'
    },
    {
      id: 'boletos',
      icon: Receipt,
      title: t('solutions.feature.boletos.title') || 'Emissão de boletos',
      description: t('solutions.feature.boletos.desc') || 'Emissão simplificada de boletos registrados e boletos híbridos com Pix integrado.'
    },
    {
      id: 'tributos',
      icon: Landmark,
      title: t('solutions.feature.tributos.title') || 'Pagamento de contas e tributos',
      description: t('solutions.feature.tributos.desc') || 'Liquidação de guias (DARF, GPS, FGTS), concessionárias e impostos sem filas.'
    },
    {
      id: 'maquininha',
      icon: BarChart3,
      title: t('solutions.feature.maquininha.title') || 'Maquininha',
      description: t('solutions.feature.maquininha.desc') || 'Aceite pagamentos de qualquer forma, em qualquer lugar, sem complicação.'
    },
    {
      id: 'link',
      icon: Link2,
      title: t('solutions.feature.link.title') || 'Link de Pagamento',
      description: t('solutions.feature.link.desc') || 'Venda online por redes sociais e WhatsApp com total segurança e antifraude.'
    }
  ];

  return (
    <section
      id="solucoes"
      aria-label="Conta digital feita para simplificar"
      className="py-20 md:py-32 bg-white relative border-b border-slate-100"
    >
      <div id="conta-digital" className="absolute -top-24 left-0" />
      <div id="recebiveis" className="absolute -top-24 left-0" />
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-[780px] mb-16 md:mb-20">
          <h2 className="text-[36px] sm:text-[46px] md:text-[54px] font-normal text-[#0B0F19] tracking-[-0.035em] leading-[1.08] mb-4">
            {t('solutions.title') || 'Conta digital feita para simplificar.'}
          </h2>
          <p className="text-[17px] sm:text-[19px] text-slate-500 font-normal leading-relaxed">
            {t('solutions.subtitle') || 'Tudo o que você precisa para ter mais controle e clareza.'}
          </p>
        </div>

        {/* 8 Feature Columns Grid (4 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 sm:gap-x-10 lg:gap-x-12 gap-y-12 sm:gap-y-14">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group flex flex-col text-left select-none transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                {/* Icon Container with minimalist rounded styling */}
                <div className="w-12 h-12 rounded-[14px] bg-[#F3F4F6] border border-slate-200/80 flex items-center justify-center text-[#0B0F19] group-hover:bg-[#A3192E] group-hover:text-white group-hover:border-[#A3192E] group-hover:shadow-md group-hover:shadow-[#A3192E]/15 transition-all duration-300 mb-6 shadow-2xs">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>

                {/* Title */}
                <h3 className="text-[20px] font-normal text-[#0B0F19] tracking-[-0.02em] leading-snug mb-2.5 group-hover:text-[#A3192E] transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[15px] text-slate-500 font-normal leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

