import { Meta, Story } from '@storybook/react/types-6-0';
import { Button, ButtonProps } from '.';
import { VpnKey } from '@styled-icons/material-outlined/VpnKey';

export default {
  title: 'Button',
  component: Button,
  args: {
    children: 'Texto do botão',
    icon: <VpnKey />,
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: '3.2rem' }}>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    icon: {
      type: null,
    },
  },
} as Meta<ButtonProps>;

export const Template: Story<ButtonProps> = (args) => {
  return (
    <div>
      <Button {...args} />
    </div>
  );
};
