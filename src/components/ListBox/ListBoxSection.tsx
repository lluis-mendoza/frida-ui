import type { Node } from '@react-types/shared';
import { useListBoxSection } from 'react-aria';
import { ListState } from 'react-stately';

import { ItemSection, SectionTitle } from './ListBox.styled';
import Option from './Option';

interface SectionProps {
  section: Node<unknown>;
  state: ListState<unknown>;
}

export function ListBoxSection({ section, state }: SectionProps) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });

  return (
    <>
      <ItemSection {...itemProps}>
        {section.rendered !== null && (
          <SectionTitle {...headingProps}>{section.rendered}</SectionTitle>
        )}
        <ul {...groupProps}>
          {[...section.childNodes].map((node) => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </ItemSection>
    </>
  );
}
