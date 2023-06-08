import { ComponentStory } from '@storybook/react';

import { useModal } from './hooks';
import { Modal } from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
};

const Template: ComponentStory<typeof Modal> = (args) => {
  const state = useModal({ defaultOpen: true });

  return (
    <Modal title="Test" state={state}>
      <p>Test</p>
    </Modal>
  );
};

export const Example = Template.bind({});
Example.args = {};
