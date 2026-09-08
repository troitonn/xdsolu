import React from 'react';
import { CodeOfEthicsPage } from './CodeOfEthicsPage';

interface OuvidoriaPageProps {
  onBackToHome: () => void;
  onOpenContact: (subject?: string) => void;
}

/**
 * Re-exporting CodeOfEthicsPage as OuvidoriaPage for backward-compatibility.
 * The company now officially operates under the Código de Conduta e Ética.
 */
export const OuvidoriaPage: React.FC<OuvidoriaPageProps> = (props) => {
  return <CodeOfEthicsPage {...props} />;
};

export default OuvidoriaPage;
