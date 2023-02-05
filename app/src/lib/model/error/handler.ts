import { goto } from '$app/navigation';
import { pathId } from '$lib/model/constants';
import { KitchenController, type KitchenArgs } from '$lib/model/kitchen';
import { aiboWebAPIFailedReasonData, type AiboWebAPIFailedReasonData } from './reasons';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function FailedCatchHandler(err: any): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`err => ${err}`);
  let typedErr: AiboWebAPIFailedReasonData;
  if ('message' in err) {
    typedErr = err as AiboWebAPIFailedReasonData;
  } else {
    typedErr = aiboWebAPIFailedReasonData.cannotDetectReason;
  }

  console.error('error occurred from FailedCatchHandler() =>', typedErr.key);

  let args: KitchenArgs;

  console.log('');

  switch (typedErr) {
    case aiboWebAPIFailedReasonData.deviceHashNotFound:
      args = {
        label: '🔑' + typedErr.message,
        dismissButton: false,
        actions: [
          {
            text: '連携しなおす',
            onClick: () => {
              // new Devices().clear();
              void goto(pathId.user);
            }
          }
        ],
        onDismiss: () => null,
        onClosed: () => null,
        props: {
          timeoutMs: -1
        }
      };

      break;
    default:
      args = {
        label: '❌' + typedErr.message,

        dismissButton: true,
        onDismiss: () => null,
        onClosed: () => null,
        props: {
          timeoutMs: -1
        }
      };

      break;
  }
  new KitchenController().push(args);
}
