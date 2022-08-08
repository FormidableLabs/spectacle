import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Wrapper from '@site/src/components/global/wrapper';
import { romanize } from '@site/src/utils/numbers';
import styles from './footer.module.scss';

type Meta = {
  theme: string;
  noMargin: boolean;
  noPadding: boolean;
};

export default function Footer({ content }) {
  const { meta }: { meta: Meta } = content;

  const logoSrc = useBaseUrl('/svg/formidable-logo-white.svg');

  return (
    <Wrapper noPadding={false} noMargin={false} background={meta.theme}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLeft}>
          <a
            href="https://formidable.com"
            title="Formidable"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textAlign: 'center' }}
          >
            <img
              className={styles.footerLogo}
              src={logoSrc}
              alt="Formidable Logo"
              width="200px"
              height="110px"
            />
          </a>
          <ul className={styles.footerLinks}>
            <li>
              <a
                href="https://formidable.com/open-source"
                title="Open Source"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Source
              </a>
            </li>
            <li>
              <a
                href="https://formidable.com/contact"
                title="Contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="https://formidable.com/careers"
                title="Careers"
                target="_blank"
                rel="noopener noreferrer"
              >
                Careers
              </a>
            </li>
          </ul>
        </div>
        <p className={styles.footerDescription}>
          Formidable is a global design and engineering consultancy, and
          open-source software organization, specializing in digital products
          and transformation. The firm has location hubs in Seattle, London,
          Toronto, Denver, Atlanta, and Phoenix with remote consultants
          worldwide. Since 2013, its team has worked with companies ranging in
          size from startups to Fortune 100s to build quality digital products
          and level-up engineering and design teams. For more information please
          visit <a href="https://www.formidable.com">formidable.com</a>.
        </p>
      </div>
      <p className={styles.footerCopyright}>
        © {romanize(new Date().getFullYear())} Formidable Labs, LLC.
      </p>
    </Wrapper>
  );
}
