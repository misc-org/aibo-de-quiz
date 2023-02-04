import type { valueOf } from '$lib/model/constants';

type AiboWebAPIFailedReason = {
  key: string;
  id: string;
  status?: string;
  message: string;
};

const cannotReachLambda: AiboWebAPIFailedReason = {
  key: 'cannotReachLambda',
  id: 'A0',
  message:
    'エンドポイントへ接続できませんでした。ネットワークに接続されているかを確認してください。'
};

const deviceHashNotRegistered: AiboWebAPIFailedReason = {
  key: 'deviceHashNotRegistered',
  id: 'A1',
  message: '現在、このアプリに連携情報が登録されていません。'
};

const internalLambdaError: AiboWebAPIFailedReason = {
  key: 'internalLambdaError',
  id: 'B0',
  message: 'こちらのミスで、エンドポイントにてエラーが発生しました。そのまま続行してください。'
};

const deviceHashNotFound: AiboWebAPIFailedReason = {
  key: 'deviceHashNotFound',
  id: 'B1',
  message: '連携情報に問題があるようです。連携を再度行ってください。'
};

const tooManyRequests: AiboWebAPIFailedReason = {
  key: 'tooManyRequests',
  id: 'B2',
  message: 'サーバーにアクセスできません。しばらく時間をおいてから試してください。'
};

const syntaxNotAcceptable: AiboWebAPIFailedReason = {
  key: 'syntaxNotAcceptable',
  id: 'C0',
  message: 'こちらのミスで、aiboにお願いができませんでした。そのまま続行してください。'
};

const aiboAPITimeout: AiboWebAPIFailedReason = {
  key: 'aiboAPITimeout',
  id: 'C1',
  message:
    'aiboにお願いしましたが、応答がないようです。aiboの電源が付いていて、aiboがネットワークに接続されているかを確認してください。'
};

const aiboAPIReturnsBusy: AiboWebAPIFailedReason = {
  key: 'aiboAPIReturnsBusy',
  id: 'C2',
  message:
    'aiboにお願いしましたが、忙しいようです。今お願いしていることをaiboが終えたら、もう一度実行してください。'
};

const aiboAPIReturnsFailedE100: AiboWebAPIFailedReason = {
  key: 'aiboAPIReturnsFailedE100',
  id: 'D0',
  status: 'E-100',
  message:
    'aiboにお願いできました。しかし問題が発生し上手くいきませんでした。aiboの電源が付いていて、aiboがネットワークに接続されているかを確認してください。'
};

const aiboAPIReturnsFailedE200: AiboWebAPIFailedReason = {
  key: 'aiboAPIReturnsFailedE200',
  id: 'D1',
  status: 'E-200',
  message:
    'aiboにお願いできました。しかし、力が抜けているか眠っているなどで上手くいかなかったようです。aiboのお腹が空いていないか、aiboが無理な姿勢になっていないかを確認してください。'
};

const aiboAPIReturnsFailedE300: AiboWebAPIFailedReason = {
  key: 'aiboAPIReturnsFailedE300',
  id: 'D2',
  status: 'E-300',
  message:
    'aiboにお願いできました。しかし、こちらのミスで上手くいかなかったようです。そのまま続行してください。'
};
const aiboAPIReturnsFailedR400: AiboWebAPIFailedReason = {
  key: 'aiboAPIReturnsFailedR400',
  id: 'D3',
  status: 'R-400',
  message:
    'aiboにお願いできました。しかし、こちらのミスで上手くいかなかったようです。そのまま続行してください。'
};

const aiboAPIReturnsFailedR401: AiboWebAPIFailedReason = {
  key: 'aiboAPIReturnsFailedR401',
  id: 'D4',
  status: 'R-401',
  message:
    'aiboにお願いできました。しかし、こちらのミスで上手くいかなかったようです。そのまま続行してください。'
};
const aiboAPIReturnsFailedR403: AiboWebAPIFailedReason = {
  key: 'aiboAPIReturnsFailedR403',
  id: 'D5',
  status: 'R-403',
  message:
    'aiboにお願いできました。しかし、こちらのミスで上手くいかなかったようです。そのまま続行してください。'
};
const aiboAPIReturnsFailedR404: AiboWebAPIFailedReason = {
  key: 'aiboAPIReturnsFailedR404',
  id: 'D6',
  status: 'R-404',
  message:
    'aiboのバージョンが、この振る舞いに対応していません。aiboのアップデートをおすすめします。'
};
const aiboAPIReturnsFailedR409: AiboWebAPIFailedReason = {
  key: 'aiboAPIReturnsFailedR409',
  id: 'D7',
  status: 'R-409',
  message:
    'アプリ連携を行えないアカウントです。連携アプリの上限に達していないかどうかや、アカウントに連携アプリを利用できる aibo が紐づいていることを確認してください。'
};
const aiboAPIReturnsFailedR429: AiboWebAPIFailedReason = {
  key: 'aiboAPIReturnsFailedR429',
  id: 'D8',
  status: 'R-429',
  message: '1時間に実行できる回数を超えました。しばらく時間をおいてから試してください。'
};
const aiboAPIReturnsFailedR500: AiboWebAPIFailedReason = {
  key: 'aiboAPIReturnsFailedR500',
  id: 'D9',
  status: 'R-500',
  message:
    'aiboにお願いできました。しかし、こちらのミスで上手くいかなかったようです。そのまま続行してください。'
};
const aiboAPIReturnsFailedR503: AiboWebAPIFailedReason = {
  key: 'aiboAPIReturnsFailedR503',
  id: 'D10',
  status: 'R-503',
  message: 'サーバーにアクセスできません。しばらく時間をおいてから試してください。'
};

const cannotDetectReason: AiboWebAPIFailedReason = {
  key: 'cannotDetectReason',
  id: 'Z0',
  message: 'こちらの想定外のエラーが発生して、原因が分かりませんでした。そのまま続行してください。'
};

export const AiboWebAPIFailedReasonData = {
  cannotReachLambda,
  deviceHashNotRegistered,
  internalLambdaError,
  deviceHashNotFound,
  tooManyRequests,
  syntaxNotAcceptable,
  aiboAPITimeout,
  aiboAPIReturnsBusy,
  aiboAPIReturnsFailedE100,
  aiboAPIReturnsFailedE200,
  aiboAPIReturnsFailedE300,
  aiboAPIReturnsFailedR400,
  aiboAPIReturnsFailedR401,
  aiboAPIReturnsFailedR403,
  aiboAPIReturnsFailedR404,
  aiboAPIReturnsFailedR409,
  aiboAPIReturnsFailedR429,
  aiboAPIReturnsFailedR500,
  aiboAPIReturnsFailedR503,
  cannotDetectReason
} as const;

export type AiboWebAPIFailedReasonData = valueOf<typeof AiboWebAPIFailedReasonData>;
