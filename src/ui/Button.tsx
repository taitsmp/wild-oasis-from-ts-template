import styled, { css, RuleSet } from 'styled-components';

type Size = 'small' | 'medium' | 'large';
type Variation = 'primary' | 'secondary' | 'danger';

const sizes: Record<Size, RuleSet> = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `
};

const variations: Record<Variation, RuleSet> = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `
};

interface Props {
  variation?: Variation;
  size?: Size;
}

const Button = styled.button<Props>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  //destructuring "Props" primary and medium are the default values
  ${({ size = 'medium' }) => sizes[size]}
  ${({ variation = 'primary' }) => variations[variation]}
`;

export default Button;
