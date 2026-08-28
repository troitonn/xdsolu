```tsx
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import xdLogo from '../assets/images/xd-logo.png';

interface FooterProps {
  onSelectSolution: (id: string) => void;
  onOpenContact: (subject: string) => void;
  onNavigateView: (
    view:
      | 'home'
      | 'fale-com-a-gente'
      | 'politica-de-privacidade'
      | 'termos-de-uso'
      | 'lgpd'
      | 'ouvidoria'
      | 'pld-ft'
      | 'sobre-a-xd'
  ) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectSolution,
  onOpenContact,
  onNavigateView,
}) => {
  const { language, t } = useLanguage();

  const isEn = language === 'en';
  const isEs = language === 'es';

  return (
    <footer
      id="main-footer"
      className="bg-[#F1F3F7] border-t border-slate-200/90 pt-20 pb-14 text-slate-800"
    >
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">

          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">

            {/* Logo */}
            <a
              href="/"
              className="group flex flex-col items-start mb-5"
              aria-label="XD Capital - Início"
            >
              <img
                src={xdLogo}
                alt="XD Capital"
                className="h-10 w-auto object-contain"
              />

              <span className="text-[9px] uppercase tracking-[0.32em] text-[#A3192E] mt-1">
                {isEn
                  ? 'FINANCIAL SOLUTIONS'
                  : isEs
                    ? 'SOLUCIONES FINANCIERAS'
                    : 'SOLUÇÕES FINANCEIRAS'}
              </span>
            </a>

            <p className="text-[14.5px] leading-relaxed text-slate-600 mb-6 max-w-[400px]">
              {isEn
                ? 'Financial solutions that combine technology, security, and strategic credit to accelerate enterprises across Brazil.'
                : isEs
                  ? 'Soluciones financieras que combinan tecnología, seguridad y estrategia para impulsar empresas en todo Brasil.'
                  : 'Soluções financeiras que unem tecnologia, segurança e estratégia para acelerar empresas em todo o Brasil.'}
            </p>
          </div>

          {/* Col 2: Soluções */}
          <div className="lg:col-span-3">
            <h4 className="text-[12px] uppercase font-normal tracking-[0.14em] text-[#A3192E] mb-5">
              {t('footer.solutions')}
            </h4>

            <ul className="space-y-3 text-[14.5px] text-slate-600">
              <li>
                <a
                  href="#solucoes"
                  onClick={() => onSelectSolution('conta-pj')}
                  className="hover:text-[#0B0F19] hover:underline transition-colors"
                >
                  {isEn
                    ? 'Business & Personal Digital Account'
                    : isEs
                      ? 'Cuenta Digital PF y PJ'
                      : 'Conta Digital PF e PJ'}
                </a>
              </li>

              <li>
                <a
                  href="#solucoes"
                  onClick={() => onSelectSolution('setor-publico')}
                  className="hover:text-[#0B0F19] hover:underline transition-colors"
                >
                  {isEn
                    ? 'Salary On-Demand Advance'
                    : isEs
                      ? 'Anticipo de Salario'
                      : 'Antecipação de Salário'}
                </a>
              </li>

              <li>
                <a
                  href="#folha-consignado"
                  onClick={() => onSelectSolution('folha-consignado')}
                  className="hover:text-[#0B0F19] hover:underline transition-colors"
                >
                  {isEn
                    ? 'Private Payroll Loans'
                    : isEs
                      ? 'Crédito de Nómina Privada'
                      : 'Consignado Privado'}
                </a>
              </li>

              <li>
                <a
                  href="#folha-consignado"
                  onClick={() => onSelectSolution('folha-consignado')}
                  className="hover:text-[#0B0F19] hover:underline transition-colors"
                >
                  {isEn
                    ? 'Public Sector Payroll Loans'
                    : isEs
                      ? 'Crédito de Nómina Pública'
                      : 'Consignado Público'}
                </a>
              </li>

              <li>
                <a
                  href="#xd-pay"
                  className="hover:text-[#0B0F19] hover:underline transition-colors"
                >
                  XD Pay{' '}
                  {isEn
                    ? '(POS Terminals)'
                    : isEs
                      ? '(Terminales POS)'
                      : '(Maquininhas)'}
                </a>
              </li>

              <li>
                <a
                  href="#solucoes"
                  onClick={() => onSelectSolution('pagamentos')}
                  className="hover:text-[#0B0F19] hover:underline transition-colors"
                >
                  {isEn
                    ? 'Payment Methods & Merchant Acquiring'
                    : isEs
                      ? 'Medios de Pago y Adquirencia'
                      : 'Meios de Pagamento & captura'}
                </a>
              </li>

              <li>
                <div className="flex items-center gap-2 text-slate-400 select-none">
                  <span>
                    {isEn
                      ? 'Debit Card'
                      : isEs
                        ? 'Tarjeta de Débito'
                        : 'Cartão de Débito'}
                  </span>

                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono">
                    {isEn
                      ? 'coming soon'
                      : isEs
                        ? 'próximamente'
                        : 'em breve'}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Institucional */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] uppercase font-normal tracking-[0.14em] text-[#A3192E] mb-5">
              {t('footer.institutional')}
            </h4>

            <ul className="space-y-3 text-[14.5px] text-slate-600">
              <li>
                <a
                  href="https://www.ib.xdcapital.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0B0F19] hover:underline transition-colors flex items-center gap-1"
                >
                  <span>{t('nav.accessAccount')}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>
              </li>

              <li>
                <button
                  onClick={() => onOpenContact('Contato Geral via Rodapé')}
                  className="hover:text-[#0B0F19] hover:underline transition-colors text-left cursor-pointer"
                >
                  {t('nav.contact')}
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigateView('sobre-a-xd')}
                  className="hover:text-[#0B0F19] hover:underline transition-colors text-left cursor-pointer"
                >
                  {t('nav.about')}
                </button>
              </li>

              <li>
                <button
                  onClick={() => onOpenContact('Carreiras / Trabalhe Conosco')}
                  className="hover:text-[#0B0F19] hover:underline transition-colors text-left cursor-pointer"
                >
                  {isEn
                    ? 'Careers'
                    : isEs
                      ? 'Trabaja con nosotros'
                      : 'Trabalhe conosco'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] uppercase font-normal tracking-[0.14em] text-[#A3192E] mb-5">
              {t('footer.legal')}
            </h4>

            <ul className="space-y-3 text-[14.5px] text-slate-600">
              <li>
                <button
                  onClick={() => onNavigateView('politica-de-privacidade')}
                  className="hover:text-[#0B0F19] hover:underline transition-colors text-left cursor-pointer"
                >
                  {t('footer.privacy')}
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigateView('pld-ft')}
                  className="hover:text-[#0B0F19] hover:underline transition-colors text-left cursor-pointer"
                >
                  {t('footer.pldft')}
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigateView('termos-de-uso')}
                  className="hover:text-[#0B0F19] hover:underline transition-colors text-left cursor-pointer"
                >
                  {t('footer.terms')}
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigateView('lgpd')}
                  className="hover:text-[#0B0F19] hover:underline transition-colors text-left cursor-pointer"
                >
                  LGPD /{' '}
                  {isEn
                    ? 'Privacy Data'
                    : isEs
                      ? 'Privacidad'
                      : 'Privacidade'}
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigateView('ouvidoria')}
                  className="hover:text-[#0B0F19] hover:underline transition-colors text-left cursor-pointer"
                >
                  {isEn
                    ? 'Ombudsman'
                    : isEs
                      ? 'Defensoría'
                      : 'Ouvidoria'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Regulatory Disclaimer */}
        <div className="pt-8 border-t border-slate-200 flex flex-col gap-4 text-[13px] text-slate-500 leading-relaxed">
          <div className="font-normal text-slate-700">
            © 2026 XD Capital Serviço de Intermediação Financeira Ltda. · CNPJ
            55.038.166/0001-99
          </div>

          <p>
            {isEn
              ? 'XD Capital is not a direct financial institution and operates as a registered banking correspondent under Brazilian regulations. Payment accounts and settlements are operated by Fidúcia SCM, an institution authorized by the Central Bank of Brazil under code 382.'
              : isEs
                ? 'XD Capital no es una institución financiera directa y opera como corresponsal bancario bajo la regulación brasileña vigente. Las cuentas de pago y la liquidación son operadas por Fidúcia SCM, autorizada por el Banco Central do Brasil bajo el código 382.'
                : 'A XD Capital não é instituição financeira e atua como correspondente bancário nos termos da regulamentação vigente. As contas de pagamento e a liquidação financeira são operadas pela Fidúcia SCM, instituição autorizada pelo Banco Central do Brasil sob o código 382.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
```
