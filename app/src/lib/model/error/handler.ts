import { goto } from '$app/navigation';
import { PathId } from '$lib/model/constants';
import { KitchenController, type KitchenArgs } from '$lib/model/kitchen';
import { AiboWebAPIFailedReasonData } from './reasons';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function FailedCatchHandler(err: any) {
  console.log(`err => ${err}`);
  let typedErr: AiboWebAPIFailedReasonData;
  if ('message' in err) {
    typedErr = err as AiboWebAPIFailedReasonData;
  } else {
    typedErr = AiboWebAPIFailedReasonData.cannotDetectReason;
  }

  console.error('error occurred from FailedCatchHandler() =>', typedErr.key);

  let args: KitchenArgs;

  switch (typedErr) {
    case AiboWebAPIFailedReasonData.deviceHashNotFound:
      {
        args = {
          label: '🔑' + typedErr.message,
          dismissButton: false,
          actions: [
            {
              text: '連携しなおす',
              onClick: () => {
                // new Devices().clear();
                void goto(PathId.user);
              }
            }
          ],
          onDismiss: () => null,
          onClosed: () => null,
          props: {
            timeoutMs: -1
          }
        };
      }
      break;
    default:
      {
        args = {
          label: '❌' + typedErr.message,

          dismissButton: true,
          onDismiss: () => null,
          onClosed: () => null,
          props: {
            timeoutMs: -1
          }
        };
      }
      break;
  }
  new KitchenController().push(args);
}
