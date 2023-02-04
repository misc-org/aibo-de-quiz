import { get } from 'svelte/store';
import { currentKitchen } from './store';

export type KitchenArgs = {
  props?: {
    variant?: 'stacked';
    timeoutMs?: number;
    leading?: boolean;
  };
  label: string;
  actions?: {
    onClick: () => void;
    text: string;
  }[];
  dismissButton: boolean;
  onDismiss: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClosed: (e: any) => void;
};

export class KitchenController {
  public reason = '';
  public action = '';

  public push(args: KitchenArgs): void {
    get(currentKitchen).push(args);
  }

  public test() {
    this.push({
      props: {
        variant: 'stacked',
        timeoutMs: 4000,
        leading: false
      },
      label: 'Kitchen経由でのスナックバーの呼び出しテストです',
      actions: [
        {
          onClick: () => (this.action = 'Something'),
          text: 'アクション１'
        },
        {
          onClick: () => (this.action = 'Another'),
          text: 'アクション２'
        }
      ],
      dismissButton: true,
      onDismiss: () => (this.action = 'Dismissed'),
      onClosed: () => null
    });
  }
}
