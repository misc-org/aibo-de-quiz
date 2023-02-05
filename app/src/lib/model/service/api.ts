import { assert, type valueOf } from '$lib/model/constants';

//
//
// Setting APIs

const getDevices = {
  apiId: 'get_devices',

  /**
   * [引数はありません]
   */
  args: () => null
} as const;

const getExecution = {
  apiId: 'get_execution',

  /**
   * ### Request Parameters
   * @param executionId 結果を取得した API の ID（UUID 形式）
   */
  args: (executionId: string) => executionId
} as const;

const setMode = {
  apiId: 'set_mode',

  /**
   * ### Request Parameters
   * @param modeName `Mode`から決定
   */
  args: (modeName: Mode) => {
    return { modeName };
  }
} as const;

const mode = {
  /** aibo が指示待ち中から戻ります。 */
  normal: 'NORMAL',
  /** aibo が指示待ち中になります。 */
  development: 'DEVELOPMENT'
} as const;
type Mode = valueOf<typeof mode>;

//
//
// Authorization APIs

const issueToken = {
  apiId: 'issue_token',

  /**
   * ### Request Parameters
   * @param code 認証情報の取得 で取得した client_id
   */
  args: (code: string) => code
} as const;

const refreshToken = {
  apiId: 'refresh_token',

  /**
   * [引数はありません]
   */
  args: () => null
} as const;

const revokeToken = {
  apiId: 'revoke_token',

  /**
   * [引数はありません]
   */
  args: () => null
} as const;

//
//
// Action APIs

const approachObject = {
  apiId: 'approach_object',

  /**
   * ### Request Parameters
   * @param targetType	aibo が近づくものを指定します。
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (targetType: TargetObject, enqueue = false) => {
    return { targetType, enqueue };
  }
} as const;
export const targetObject = {
  /** 旧型の AIBO（ERS-110 や ERS-7 など）と新型の aibo（ERS-1000） */
  aibo: 'aibo',
  /** aibo 専用アクセサリーのアイボーン */
  aibone: 'aibone',
  /** aibo 専用アクセサリーのサイコロ */
  dice: 'dice',
  /** aibo 専用アクセサリーのピンクボール  */
  pinkBall: 'pinkball'
} as const;
export type TargetObject = valueOf<typeof targetObject>;

const approachPerson = {
  apiId: 'approach_person',

  /**
   * ### Request Parameters
   * @param distanceFromTarget aibo が人にどれくらいの距離まで近づくのかを指定します。
   * 単位：メートル。約 0.4 メートルまで近づくことができます。
   * 最小値 : 0.4, 最大値 : 2
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (distanceFromTarget: number, enqueue = false) => {
    assert(distanceFromTarget >= 0.4 && distanceFromTarget <= 2);
    return { distanceFromTarget, enqueue };
  }
} as const;

const changePosture = {
  apiId: 'change_posture',

  /**
   * ### Request Parameters
   * @param finalPosture aibo がとる姿勢を指定します。
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (finalPosture: FinalPosture, enqueue = false) => {
    return { finalPosture, enqueue };
  }
} as const;

export const finalPosture = {
  /** おなかを見せる */
  back: 'back',
  /** しゃがむ */
  crouch: 'crouch',
  /** 伏せる */
  down: 'down',
  /** 寝転がる */
  downAndLengthenBehind: 'down_and_lengthen_behind',
  /** 足を曲げて寝転がる */
  downAndShortenBehind: 'down_and_shorten_behind',
  /** 両方の前足をあげる */
  sitAndRaiseBothHands: 'sit_and_raise_both_hands',
  /** すわる */
  sit: 'sit',
  /** 寝る姿勢になる */
  sleep: 'sleep',
  /** 立つ */
  stand: 'stand',
  /** まっすぐ立つ */
  standStraight: 'stand_straight'
} as const;
export type FinalPosture = (typeof finalPosture)[keyof typeof finalPosture];

const chaseObject = {
  apiId: 'chase_object',

  /**
   * ### Request Parameters
   * @param targetType 	aibo が見続けるものを指定します。
   * @param chasingDurationMsec 	aibo がどれくらいの時間、指定されたものを見続けるのかを指定します。
   * 単 位：ミリ秒。
   * 最小値 : 0, 最大値 : 360000
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (targetType: TargetObject, chasingDurationMsec: number, enqueue = false) => {
    assert(
      Number.isInteger(chasingDurationMsec) &&
        chasingDurationMsec >= 0 &&
        chasingDurationMsec <= 360000
    );
    return { targetType, chasingDurationMsec, enqueue };
  }
} as const;

const chasePerson = {
  apiId: 'chase_person',

  /**
   * ### Request Parameters
   * @param chasingDurationMsec aibo がどれくらいの時間、指定されたものを見続けるのかを指定します。
   * 単位：ミリ秒。
   * 最小値 : 0, 最大値 : 360000
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (chasingDurationMsec: number, enqueue = false) => {
    assert(
      Number.isInteger(chasingDurationMsec) &&
        chasingDurationMsec >= 0 &&
        chasingDurationMsec <= 360000
    );
    return { chasingDurationMsec, enqueue };
  }
} as const;

const explore = {
  apiId: 'explore',

  /**
   * ### Request Parameters
   * @param duration aibo がどれくらいの時間、歩き回るのかを指定します。
   * 歩き回る時間が長いほど、より精度の高い地図を作成することができます。
   * すでに地図を作成したことがある場所の場合、数十秒から数分歩き回ることで地図を思い出します。
   * 単位：秒。最小値 : 0, 最大値 : 360
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (duration: number, enqueue = false) => {
    assert(Number.isInteger(duration) && duration >= 0 && duration <= 360);
    return { duration, enqueue };
  }
} as const;

const findObject = {
  apiId: 'find_object',

  /**
   * ### Request Parameters
   * @param targetType 	aibo が探すものを指定します。
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (targetType: TargetObject, enqueue = false) => {
    return { targetType, enqueue };
  }
} as const;

const findPerson = {
  apiId: 'find_person',

  /**
   * ### Request Parameters
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (enqueue: boolean) => {
    return { enqueue };
  }
} as const;

const getCloseToObject = {
  apiId: 'get_close_to_object',

  /**
   * ### Request Parameters
   * @param targetType 	aibo が近づくものを指定します。
   * @param distance aibo がどの程度まで近づくのかを指定します。
   * 単位：メートル。0.1 メートルから約 0.3 メートルまで近づくことができます。
   * 最小値 : 0.1, 最大値 : 0.3
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (targetType: TargetCloseTo, distance: number, enqueue = false) => {
    assert(distance >= 0.1 && distance <= 0.3);
    return { targetType, distance, enqueue };
  }
} as const;

export const targetCloseTo = {
  /** 専用アクセサリーのアイボーン */
  aibone: 'aibone',
  /** 専用アクセサリーのサイコロ */
  dice: 'dice',
  /** 専用アクセサリーのピンクボール */
  pinkBall: 'pinkball'
} as const;
export type TargetCloseTo = valueOf<typeof targetCloseTo>;

const kickObject = {
  apiId: 'kick_object',

  /**
   * ### Request Parameters
   * @param kickObject aibo が蹴ったりヘディングしたりするものを指定します。
   * @param kickMotion どのように蹴ったりヘディングしたりするかを指定します。
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (kickObject: KickObjectTo, kickMotion: KickMotion, enqueue = false) => {
    return { kickObject, kickMotion, enqueue };
  }
} as const;

export const kickMotion = {
  /** aibo が指定されたものを蹴ります。 */
  kick: 'kick',
  /** aibo が指定されたものをヘディングします。 */
  heading: 'heading'
} as const;
export type KickMotion = valueOf<typeof kickMotion>;

export const kickObjectTo = {
  /** aibo 専用アクセサリーのピンクボール */
  pickBall: 'pinkball'
} as const;
export type KickObjectTo = valueOf<typeof kickObjectTo>;

const moveAlongCircle = {
  apiId: 'move_along_circle',

  /**
   * ### Request Parameters
   * @param walkSpeed aibo が歩く速さを指定します。
   * 0 （遅い）から 2 （速い）の間で指定することができます。
   * 設定可能な値：0/1/2
   * @param radius aibo が歩く円弧の半径を指定します。
   * 単位：メートル。 0.5 メートルより大きな半径の円弧を歩くことができます。
   * 最小値 : 0.5, 最大値 : 3
   * @param movingAngle
   * @param moveDirection
   * @param enqueue
   */
  args: (
    walkSpeed: number,
    radius: number,
    movingAngle: number,
    moveDirection: Direction,
    enqueue = false
  ) => {
    assert(Number.isInteger(walkSpeed) && walkSpeed >= 0 && walkSpeed <= 2);
    assert(radius >= 0.5 && radius <= 3);
    assert(movingAngle >= 0 && movingAngle <= 1080);
    return {
      walkSpeed,
      radius,
      movingAngle,
      moveDirection,
      enqueue
    };
  }
} as const;

export const direction = {
  /** aibo が左回りで歩きます。 */
  left: 'left',
  /** aibo が右回りで歩きます。 */
  right: 'right'
} as const;
export type Direction = valueOf<typeof direction>;

const moveDirection = {
  apiId: 'move_direction',

  /**
   * ### Request Parameters
   * @param walkSpeed aibo が歩く速さを指定します。
   * 0 （遅い）から 2 （速い）の間で指定することができます。
   * 設定可能な値：0/1/2
   * @param targetDistance aibo が歩く距離を指定します。
   * 単位：メートル。 0.5 より小さい場合、 aibo が上手に歩けないことがあります。
   * 最小値 : 0, 最大値 : 6
   * @param targetAngle aibo が歩く向きを指定します。
   * 単位：度。 aibo のからだが向いている方向から反時計回りをプラスとして、 -180 度から 180 度まで指定できます。
   * 最小値 : -180, 最大値 : 180
   * @param enqueue
   */
  args: (walkSpeed: number, targetDistance: number, targetAngle: number, enqueue = false) => {
    assert(Number.isInteger(walkSpeed) && walkSpeed >= 0 && walkSpeed <= 2);
    assert(targetDistance >= 0 && targetDistance <= 6);
    assert(Math.abs(targetAngle) <= 180);
    return {
      walkSpeed,
      targetDistance,
      targetAngle,
      moveDirection,
      enqueue
    };
  }
} as const;

const moveForward = {
  apiId: 'move_forward',

  /**
   * ### Request Parameters
   * @param walkSpeed aibo が歩く速さを指定します。
   * 0 （遅い）から 2 （速い）の間で指定することができます。
   * 設定可能な値：0/1/2
   * @param walkDistance aibo が歩く距離を指定します。
   * 単位：メートル。マイナスの距離を指定すると、後ろ向きに歩きます。 指定する値が小さ過ぎると、ほとんど進まないことがあります。
   * 最小値 : -6, 最大値 : 6
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (walkSpeed: number, walkDistance: number, enqueue = false) => {
    assert(Number.isInteger(walkSpeed) && walkSpeed >= 0 && walkSpeed <= 2);
    assert(Math.abs(walkDistance) <= 6);
    return {
      walkSpeed,
      walkDistance,
      moveDirection,
      enqueue
    };
  }
} as const;

const moveHead = {
  apiId: 'move_head',

  /**
   * ### Request Parameters
   * @param azimuth aibo が顔を左右にどれだけ動かすかを指定します。
   * 単位：度。 aibo のからだが向いている方向から反時計回りをプラスとして、 -80 度から 80 度を指定できます。
   * 最小値 : -80, 最大値 : 80
   * @param elevation aibo が顔を上下にどれだけ動かすかを指定します。
   * 単位：度。顔の正面を 0 度として、上方向をプラス、下方向をマイナスに -80 度から 80 度を指定できます。
   * 最小値 : -40, 最大値 : 40
   * @param velocity 	aibo がどれだけ速く首を動かすのかを指定します。
   * 単位：角速度[deg/sec]
   * 最小値 : 10, 最大値 : 80
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (azimuth: number, elevation: number, velocity: number, enqueue = false) => {
    assert(Math.abs(azimuth) <= 80);
    assert(Math.abs(elevation) <= 40);
    assert(velocity <= 10 && velocity >= 80);
    return { azimuth, elevation, velocity, enqueue };
  }
} as const;

const moveSideways = {
  apiId: 'move_sideways',

  /**
   * ### Request Parameters
   * @param walkSpeed aibo が歩く速さを指定します。
   * 0 （遅い）から 2 （速い）の間で指定することができます。
   * 設定可能な値：0/1/2
   * @param walkDistance aibo が歩く距離を指定します。
   * 単位：メートル。プラスだと左へ、マイナスだと右へ歩きます。
   * 最小値 : -6, 最大値 : 6
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (walkSpeed: number, walkDistance: number, enqueue = false) => {
    assert(Number.isInteger(walkSpeed) && walkSpeed >= 0 && walkSpeed <= 2);
    assert(Math.abs(walkDistance) <= 6);
    return {
      walkSpeed,
      walkDistance,
      moveDirection,
      enqueue
    };
  }
} as const;

const moveToPosition = {
  apiId: 'move_to_position',

  /**
   * ### Request Parameters
   * @param targetType 	aibo が向かう場所を指定します。
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (targetType: TargetPosition, enqueue = false) => {
    return { targetType, enqueue };
  }
} as const;

export const targetPosition = {
  /** チャージステーションの場所 */
  chargingStation: 'charging_station',
  /** 教えたおむかえ場所 */
  greetingSpot: 'greeting_spot',
  /** 教えたトイレの場所 */
  toilet: 'toilet'
} as const;
export type TargetPosition = valueOf<typeof targetPosition>;

const playBone = {
  apiId: 'play_bone',

  /**
   * ### Request Parameters
   * @param category aibo がどのようにアイボーンで遊ぶかを指定します。
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (category: CategoryBone, enqueue = false) => {
    return { category, enqueue };
  }
} as const;

export const categoryBone = {
  /** アイボーンをくわえる。 */
  holdMouth: 'holdMouth'
} as const;
export type CategoryBone = valueOf<typeof categoryBone>;

const playDice = {
  apiId: 'play_dice',

  /**
   * ### Request Parameters
   * @param category aibo がどのようにサイコロで遊ぶかを指定します。
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (category: CategoryDice, enqueue = false) => {
    return { category, enqueue };
  }
} as const;

export const categoryDice = {
  /** サイコロをくわえます。 */
  holdMouthDice: 'holdMouthDice',
  /** サイコロを左に転がします。 */
  rollDiceLeft: 'rollDiceLeft',
  /** サイコロを右に転がします。 */
  rollDiceRight: 'rollDiceRight',
  /** サイコロを向こう側に転がします。 */
  rollDicePush: 'rollDicePush',
  /** サイコロを手前側に転がします。 */
  rollDicePull: 'rollDicePull',
  /** サイコロを別のサイコロの上に積み重ねます。サイコロをくわえている状態で行います。 */
  stackDice: 'stackDice'
};
export type CategoryDice = valueOf<typeof categoryDice>;

const playMotion = {
  apiId: 'play_motion',

  /**
   * ### Request Parameters
   * @param category aibo が行うふるまいを指定します。 & 	ふるまいのバリエーションを指定します。
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (category: CategoryMotion, enqueue = false) => {
    const categoryData = category.category;
    const modeData = category.mode;
    return { category: categoryData, mode: modeData, enqueue };
  }
} as const;

export const categoryMotion = {
  /** うなずく */
  agree: {
    category: 'agree',
    mode: 'NONE'
  },

  /** いやがる */
  bad: {
    category: 'bad',
    mode: 'NONE'
  },

  /** 全身で大きくほえる */
  bark: {
    category: 'bark',
    mode: 'NONE'
  },

  /** 左前足で手まねきする */
  beckon_bodyLeft: {
    category: 'beckon',
    mode: 'BODY_LEFT'
  },

  /** 右前足で手まねきする */
  beckon_bodyRight: {
    category: 'beckon',
    mode: 'BODY_RIGHT'
  },

  /** げっぷをする */
  belch: {
    category: 'belch',
    mode: 'NONE'
  },

  /** へっぴり腰になる */
  bentBack: {
    category: 'bentBack',
    mode: 'NONE'
  },

  /** はあはあと微かに呼吸する */
  breath: {
    category: 'breath',
    mode: 'NONE'
  },

  /** 興味のあるそぶりをする */
  curious: {
    category: 'curious',
    mode: 'NONE'
  },

  /** ダンスをする */
  dance: {
    category: 'dance',
    mode: 'NONE'
  },

  /** あごをひく */
  drawInOnesChin: {
    category: 'drawInOnesChin',
    mode: 'NONE'
  },

  /** 夢をみる */
  dreaming: {
    category: 'dreaming',
    mode: 'NONE'
  },

  /** うれしそうにする */
  friendly: {
    category: 'friendly',
    mode: 'NONE'
  },

  /** 遊ぼう、の仕草をする */
  friendlyPolite: {
    category: 'friendlyPolite',
    mode: 'NONE'
  },

  /** 口をパクパクする */
  gasp: {
    category: 'gasp',
    mode: 'NONE'
  },

  /** 寝ぼけた仕草をする */
  halfAsleep: {
    category: 'halfAsleep',
    mode: 'NONE'
  },

  /** 両前足をあげる */
  handsUp: {
    category: 'handsUp',
    mode: 'NONE'
  },

  /** 興奮した仕草をする */
  happyOrHot: {
    category: 'happyOrHot',
    mode: 'NONE'
  },

  /** ヘディングする */
  heading: {
    category: 'heading',
    mode: 'NONE'
  },

  /** 左にヘディングする */
  heading_spaceLeft: {
    category: 'heading',
    mode: 'SPACE_LEFT'
  },

  /** 右にヘディングする */
  heading_spaceRight: {
    category: 'heading',
    mode: 'SPACE_RIGHT'
  },

  /** うれしそうにする */
  helloIloveYou: {
    category: 'helloIloveYou',
    mode: 'NONE'
  },

  /** ハイタッチする */
  highFive: {
    category: 'highFive',
    mode: 'NONE'
  },

  /** 左前足でハイタッチする */
  highFive_bodyLeft: {
    category: 'highFive',
    mode: 'BODY_LEFT'
  },

  /** 右前足でハイタッチする */
  highFive_bodyRight: {
    category: 'highFive',
    mode: 'BODY_RIGHT'
  },

  /** 遊びたそうにする */
  imFriendly: {
    category: 'imFriendly',
    mode: 'NONE'
  },

  /** ブルッと震える */
  jiggle: {
    category: 'jiggle',
    mode: 'NONE'
  },

  /** キスする */
  kiss: {
    category: 'kiss',
    mode: 'NONE'
  },

  /** 左前足を毛づくろいする */
  lickBody_bodyLeft: {
    category: 'lickBody',
    mode: 'BODY_LEFT'
  },

  /** 右前足を毛づくろいする */
  lickBody_bodyRight: {
    category: 'lickBody',
    mode: 'BODY_RIGHT'
  },

  /** 左右をすこし見る */
  lookAroundHead: {
    category: 'lookAroundHead',
    mode: 'NONE'
  },

  /** のぞき込む */
  lookOver: {
    category: 'lookOver',
    mode: 'NONE'
  },

  /** おしっこをする（男の子） */
  markingBoy: {
    category: 'marking',
    mode: 'BOY'
  },

  /** おしっこをする（女の子） */
  markingGirl: {
    category: 'marking',
    mode: 'GIRL'
  },

  /** 大きく２回うなずく */
  nodHead: {
    category: 'nodHead',
    mode: 'NONE'
  },

  /** 口を少し開け閉めする */
  openMouth: {
    category: 'openMouth',
    mode: 'NONE'
  },

  /** とっても喜ぶ */
  overJoyed: {
    category: 'overJoyed',
    mode: 'NONE'
  },

  /** 左前足でお手をする */
  paw_bodyLeft: {
    category: 'paw',
    mode: 'BODY_LEFT'
  },

  /** 右前足でお手をする */
  paw_bodyRight: {
    category: 'paw',
    mode: 'BODY_RIGHT'
  },

  /** すねて左を向く */
  peace_spaceLeft: {
    category: 'peace',
    mode: 'SPACE_LEFT'
  },

  /** すねて右を向く */
  peace_spaceRight: {
    category: 'peace',
    mode: 'SPACE_RIGHT'
  },
  /** はっとする */
  perceive: {
    category: 'perceive',
    mode: 'NONE'
  },

  /** 甘噛みする */
  playBiting: {
    category: 'playBiting',
    mode: 'NONE'
  },

  /** 上目遣いする */
  prettyPlease: {
    category: 'prettyPlease',
    mode: 'NONE'
  },

  /** 待ちきれなそうにする */
  ready: {
    category: 'ready',
    mode: 'NONE'
  },

  /** 仰向けになる */
  relax: {
    category: 'relax',
    mode: 'NONE'
  },

  /** そわそわする */
  restless: {
    category: 'restless',
    mode: 'NONE'
  },

  /** 背中を地面に擦り付ける */
  rubBack: {
    category: 'rubBack',
    mode: 'NONE'
  },

  /** 地面を掘る */
  scratchFloor: {
    category: 'scratchFloor',
    mode: 'NONE'
  },

  /** 左後足で頭をかく */
  scratchHead_hindLeft: {
    category: 'scratchHead',
    mode: 'HIND_LEFT'
  },

  /** 右後足で頭をかく */
  scratchHead_hindRight: {
    category: 'scratchHead',
    mode: 'HIND_RIGHT'
  },

  /** かなしそうにする */
  shakeHead: {
    category: 'shakeHead',
    mode: 'NONE'
  },

  /** お尻を振る */
  shakeHipsBehind: {
    category: 'shakeHipsBehind',
    mode: 'NONE'
  },

  /** 細かく震える */
  shudder: {
    category: 'shudder',
    mode: 'NONE'
  },

  /** 左前足で横に蹴る */
  sideKick_frontLeft: {
    category: 'sideKick',
    mode: 'FRONT_LEFT'
  },

  /** 右前足で横に蹴る */
  sideKick_frontRight: {
    category: 'sideKick',
    mode: 'FRONT_RIGHT'
  },

  /** おなかを見せて左に転がる */
  sideUp_bodyLeft: {
    category: 'sideUp',
    mode: 'BODY_LEFT'
  },

  /** おなかを見せて右に転がる */
  sideUp_bodyRight: {
    category: 'sideUp',
    mode: 'BODY_RIGHT'
  },

  /** 歌う */
  sing: {
    category: 'sing',
    mode: 'NONE'
  },

  /** ねごとを言う */
  sleepTalking: {
    category: 'sleepTalking',
    mode: 'NONE'
  },

  /** くしゃみをする */
  sneeze: {
    category: 'sneeze',
    mode: 'NONE'
  },

  /** 目の前を嗅ぐ */
  sniff: {
    category: 'sniff',
    mode: 'NONE'
  },

  /** 下の方を左右に嗅ぐ */
  sniffDown: {
    category: 'sniffDown',
    mode: 'NONE'
  },

  /** 上の方を嗅ぐ */
  sniffUp: {
    category: 'sniffUp',
    mode: 'NONE'
  },

  /** 驚く */
  startled: {
    category: 'startled',
    mode: 'NONE'
  },

  /** 少し驚く */
  startledLittle: {
    category: 'startledLittle',
    mode: 'NONE'
  },

  /** のびをする */
  stretch: {
    category: 'stretch',
    mode: 'NONE'
  },

  /** 左右に体を揺らす */
  swing: {
    category: 'swing',
    mode: 'NONE'
  },

  /** 口を開けて耳を開く */
  touched: {
    category: 'touched',
    mode: 'SPACE_CENTER'
  },

  /** 退屈そうにする */
  waiting: {
    category: 'waiting',
    mode: 'NONE'
  },

  /** 顔を洗う仕草をする */
  washFace: {
    category: 'washFace',
    mode: 'NONE'
  },

  /** 悲しくうつむいてキュンキュン鳴く */
  whine: {
    category: 'whine',
    mode: 'NONE'
  },

  /** 耳をぴくっと動かす */
  wiggleEar: {
    category: 'wiggleEar',
    mode: 'BODY_BOTH'
  },

  /** 前傾してうなる、警戒する */
  woof: {
    category: 'woof',
    mode: 'NONE'
  },

  /** 高くキャンキャンッ！と鳴く */
  yap: {
    category: 'yap',
    mode: 'NONE'
  },

  /**	おおきくあくびをする */
  yawn: {
    category: 'yawn',
    mode: 'NONE'
  }
} as const;
export type CategoryMotion = valueOf<typeof categoryMotion>;

const playTrick = {
  apiId: 'play_trick',

  /**
   * ### Request Parameters
   * @param trickName aibo が行うふるまいを指定します。
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (trickName: TrickName, enqueue = false) => {
    return { trickName, enqueue };
  }
};

export const trickName = {
  /** ## スクワットしよう
   * aibo が意気込んでスクワットを始めます。
   */
  aiboSquat: 'aiboSquat',
  /** ## ハッピーバースデー
   *  aibo が心をこめてバースデーソングを歌ってくれます。
   */
  happyBirthday: 'happyBirthday',

  /** ## 幸せなら手をたたこう
   *  aibo が「幸せなら手をたたこう」の曲に合わせてダンスを披露してくれます。
   */
  ifYoureHappyAndYouKnowIt: 'ifYoureHappyAndYouKnowIt',

  /** ## ロンドン橋落ちた
   *  aibo が「ロンドン橋落ちた」の歌をイメージした楽しげなダンスを披露してくれます。
   */
  londonBridgeIsFallingDown: 'londonBridgeIsFallingDown',

  /** ## ラジオ体操第一
   *  aibo がラジオ体操の音楽に合わせたダンスを披露してくれます。
   */
  radioExerciseNo1: 'radioExerciseNo1',

  /** ## とってもかわいいaibo
   *  aibo がとっても素敵なオリジナルソングにのせて、ダンスを披露してくれます。
   */
  veryLovelyAibo: 'veryLovelyAibo',

  /** ## 花のワルツ
   *  aibo がバレエのような優雅なダンスを披露してくれます。
   */
  waltzOfTheFlowers: 'waltzOfTheFlowers',

  /** ## aibo3分タイマー
   *  aibo が1分、2分、3分間経過をお知らせしてくれます。やめるときには「おしまい」と声をかけてあげてください。
   */
  treeMinuteTimer: '3minuteTimer'
} as const;
export type TrickName = valueOf<typeof trickName>;

const releaseObject = {
  apiId: 'release_object',

  /**
   * ### Request Parameters
   * @param targetType aibo が口から離すものを指定します。
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (targetType: TargetReleaseObject, enqueue = false) => {
    return { targetType, enqueue };
  }
} as const;

export const targetReleaseObject = {
  /** aibo 専用アクセサリーのアイボーン */
  aibone: 'aibone',
  /** aibo 専用アクセサリーのサイコロ */
  dice: 'dice'
};
export type TargetReleaseObject = valueOf<typeof targetReleaseObject>;

const stay = {
  apiId: 'stay',

  /**
   * ### Request Parameters
   * @param duration aibo が待機する時間を指定します。
   * 単位：秒。
   * 最小値 : 0, 最大値 : 360
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (duration: number, enqueue = false) => {
    assert(Number.isInteger(duration) && duration >= 0 && duration <= 360);
    return { duration, enqueue };
  }
} as const;

const turnAround = {
  apiId: 'turn_around',

  /**
   * ### Request Parameters
   * @param turnSpeed aibo が回る速さを指定します。
   * 0 （遅い）から 2 （速い）の間で指定することができます。
   * 設定可能な値：0/1/2
   * @param turnAngle aibo がどれだけ回るかを指定します。
   * 単位：度。 aibo のからだが向いている方向から反時計回りをプラスとして指定します。
   * 最小値 : -180, 最大値 : 180
   * @param enqueue Queueing する場合は true を設定します。
   */
  args: (turnSpeed: number, turnAngle: number, enqueue = false) => {
    assert(Number.isInteger(turnAngle) && turnAngle >= 0 && turnAngle <= 2);
    assert(Math.abs(turnAngle) <= 180);
    return { turnSpeed, turnAngle, enqueue };
  }
} as const;

//
//
// Cognition APIs

//
const bitingStatus = {
  apiId: 'biting_status',
  result: (obj: object) => (obj as bitingStatusResult).biting_status
} as const;

interface bitingStatusResult {
  /** 認識結果 */
  biting_status: {
    /** くわえていたかどうか */
    biting: boolean;
  };
}

//
const bodyTouchedStatus = {
  apiId: 'body_touched_status',
  result: (obj: object) => {
    if (JSON.stringify(obj) === '[]') return { body_part: bodyPart.None };
    return (obj as bodyTouchedStatusResult).body_touched_status;
  }
} as const;

interface bodyTouchedStatusResult {
  /** 認識結果 */
  body_touched_status: {
    /** aibo が触られている場所 */
    body_part: BodyPart;
  };
}

export const bodyPart = {
  /** 触れていない場合 */
  None: 'None',
  /** おなか */
  belly: 'belly',
  /** せなか */
  body: 'body',
  /** あご */
  chin: 'chin',
  /** あたま */
  head: 'head'
} as const;
export type BodyPart = valueOf<typeof bodyPart>;

//
const foundObjectsStatus = {
  apiId: 'found_objects_status',
  result: (obj: object) => (obj as foundObjectsStatusResult).found_objects_status
} as const;

interface foundObjectsStatusResult {
  /** 認識結果 */
  found_objects_status: {
    /** aibo が見ていた／見ている対象物の種類 */
    name: FoundObjectName;
    /** 対象物が見えているかどうか */
    visible: boolean;
    /** aibo から対象物までの距離 */
    distance: FoundObjectDistance;
    /** aibo から対象物への方角 */
    direction: FoundObjectDirection;
  };
}
export const foundObjectName = {
  /**	旧型の AIBO（ERS-110 や ERS-7 など）と新型の aibo（ERS-1000） */
  aibo: 'aibo',
  /**	aibo 専用アクセサリーのアイボーン */
  aibone: 'aibone',
  /**	チャージステーション */
  chargeStation: 'charge_station',
  /**	aibo 専用アクセサリーのサイコロ */
  dice: 'dice',
  /**	人 */
  person: 'person',
  /**	aibo 専用アクセサリーのピンクボール */
  pinkball: 'pinkball'
} as const;
export type FoundObjectName = valueOf<typeof foundObjectName>;

export const foundObjectDistance = {
  /** ### 近距離
   * 距離が近距離となるには、FoundObjectsStatus を実行する前に FindObject や FindPerson で対象物を探しておく必要があります。
   */
  near: 'near',

  /** ### 中距離
   * 対象物までの距離が正確に取得できない場合も middle になることがあります。
   */
  middle: 'middle',

  /** ### 遠距離 */
  far: 'far'
} as const;
export type FoundObjectDistance = valueOf<typeof foundObjectDistance>;

export const foundObjectDirection = {
  /** 前方 */
  front: 'front',
  /** 右前方 */
  rightFront: 'right_front',
  /** 右 */
  right: 'right',
  /** 右後方 */
  rightBack: 'right_back',
  /** 左前方 */
  leftFront: 'left_front',
  /** 左 */
  left: 'left',
  /** 左後方 */
  leftBack: 'left_back',
  /** 後方 */
  back: 'back'
} as const;
export type FoundObjectDirection = valueOf<typeof foundObjectDirection>;

//
const hungryStatus = {
  apiId: 'hungry_status',
  result: (obj: object) => (obj as hungryStatusResult).hungry_status
} as const;

interface hungryStatusResult {
  /** 認識結果 */
  hungry_status: {
    /** バッテリー残量 */
    energy: HungryEnergy;
  };
}

export const hungryEnergy = {
  /** チャージステーションの上で、十分に充電されている */
  satisfied: 'satisfied',
  /** チャージステーションの上で充電中 */
  eating: 'eating',
  /** チャージステーションの上におらず、十分に移動可能なほど充電されている */
  enough: 'enough',
  /** チャージステーションの上におらず、移動はできるが充電が必要 */
  hungry: 'hungry',
  /** チャージステーションの上におらず、移動もできないほどバッテリー残量が少ない */
  famished: 'famished'
} as const;
export type HungryEnergy = valueOf<typeof hungryEnergy>;

//
const nameCalledStatus = {
  apiId: 'name_called_status',
  result: (obj: object) => (obj as nameCalledStatusResult).name_called_status
} as const;

interface nameCalledStatusResult {
  /** 認識結果 */
  name_called_status: {
    /** 名前を呼ばれたかどうか。 */
    called: boolean;
    /** ### 名前を呼ばれた方向。
     * 単位：度。
     * aibo のからだが向いている方向から反時計回りをプラスとして、 -180 度から 180 度までの値が取得されます。
     * */
    voiceAngle: number;
    /** 名前を呼ばれた方角。 */
    voiceDirection: NameCalledDirection;
  };
}

export const nameCalledDirection = {
  /** 前方 */
  front: 'front',
  /** 右前方 */
  rightFront: 'right_front',
  /** 右 */
  right: 'right',
  /** 右後方 */
  rightBack: 'right_back',
  /** 左前方 */
  leftFront: 'left_front',
  /** 左 */
  left: 'left',
  /** 左後方 */
  leftBack: 'left_back',
  /** 後方 */
  back: 'back'
} as const;
export type NameCalledDirection = valueOf<typeof nameCalledDirection>;

//
const pawPadsStatus = {
  apiId: 'paw_pads_status',
  result: (obj: object) => (obj as PawPadsStatusResult).paw_pads_status
} as const;

interface PawPadsStatusResult {
  /** 認識結果 */
  paw_pads_status: {
    /** 右後足の肉球が押され始めてどれだけ経過したか。単位：秒。 */
    back_right_pressed_sec: number;
    /** 右後足の肉球が押されているかどうか */
    back_left_pressed: boolean;
    /** 左前足の肉球が押されているかどうか */
    front_left_pressed: boolean;
    /** 右前足の肉球が押されているかどうか */
    front_right_pressed: boolean;
    /** 左後足の肉球が押され始めてどれだけ経過したか。単位：秒。 */
    back_left_pressed_sec: number;
    /** 右前足の肉球が押され始めてどれだけ経過したか。単位：秒。 */
    front_right_pressed_sec: number;
    /** 右後足の肉球が押されているかどうか */
    back_right_pressed: boolean;
    /** 左前足の肉球が押され始めてどれだけ経過したか。単位：秒。 */
    front_left_pressed_sec: number;
  };
}

//
const postureStatus = {
  apiId: 'posture_status',
  result: (obj: object) => (obj as PostureStatusResult).posture_status
} as const;

interface PostureStatusResult {
  /** 認識結果 */
  posture_status: {
    /** aibo の姿勢 */
    body: PostureBody;
  };
}

export const postureBody = {
  /**	充電中 */
  charge: 'charge',
  /**	ふせ */
  down: 'down',
  /**	抱き上げられている */
  lifting_up: 'lifting_up',
  /**	抱き上げられ始めた */
  Liftup: 'Liftup',
  /**	全身を使って動作中 */
  playing: 'playing',
  /**	脱力状態 */
  relaxed: 'relaxed',
  /**	おすわり */
  sit: 'sit',
  /**	睡眠中 */
  sleep: 'sleep',
  /**	立っている */
  stand: 'stand',
  /**	不明 */
  unknown: 'unknown',
  /**	歩行中 */
  walking: 'walking'
} as const;
export type PostureBody = valueOf<typeof postureBody>;

//
const sleepyStatus = {
  apiId: 'sleepy_status',
  result: (obj: object) => (obj as SleepyStatusResult).sleepy_status
} as const;

interface SleepyStatusResult {
  /** 認識結果 */
  sleepy_status: {
    /** aibo の眠さ */
    status: SleepyStatus;
  };
}

export const sleepyAiboStatus = {
  /** まったく眠くなく、元気に活動中 */
  noSleepy: 'no_sleepy',
  /** 刺激がなく、退屈な状態 */
  boring: 'boring',
  /** 眠くなってきた状態 */
  sleepy: 'sleepy',
  /** かなり眠く、もう少しで寝そうな状態 */
  verySleepy: 'very_sleepy'
} as const;
export type SleepyStatus = valueOf<typeof sleepyStatus>;

//
const voiceCommandStatus = {
  apiId: 'voice_command_status',
  result: (obj: object) => (obj as VoiceCommandStatusResult).voice_command_status
} as const;

interface VoiceCommandStatusResult {
  /** 認識結果 */
  voice_command_status: {
    voiceAngle: number;
    command: VoiceCommand;
    voiceDirection: VoiceCommandDirection;
  };
}

export const voiceCommand = {
  /** あっちいって */
  away: 'away',
  /** どいて */
  awaySoft: 'awaysoft',
  /** しずかにして */
  beQuiet: 'bequiet',
  /** おじぎして */
  bowing: 'bowing',
  /** ほねとってきて */
  bringTheBone: 'bringthebone',
  /** ばいばい */
  bye: 'bye',
  /** おいで */
  come: 'come',
  /** おどって */
  dance: 'dance',
  /** おすわり */
  down: 'down',
  /** ついてきて */
  followMe: 'followme',
  /** こんばんは */
  goodEvening: 'goodevening',
  /** おはよう */
  goodMorning: 'goodmorning',
  /** おやすみ */
  goodnight: 'goodnight',
  /** はじめまして */
  gtsy: 'gtsy',
  /** おて */
  hand: 'hand',
  /** てあげて */
  handSup: 'handsup',
  /** こんにちは */
  hello: 'hello',
  /** はいたっち */
  highFive: 'highfive',
  /** ただいま */
  imHome: 'imhome',
  /** ぼーるけって */
  kickTheBall: 'kicktheball',
  /** ふせ */
  lieLow: 'lielow',
  /** まーきんぐ */
  marking: 'marking',
  /** ばっく */
  moveBackward: 'movebackward',
  /** くちあけて */
  openYourMouth: 'openyourmouth',
  /** はなして */
  out: 'out',
  /** ぴんくぼーる */
  pinkball: 'pinkball',
  /** あそぼう */
  play: 'play',
  /** ぼーるであそんで */
  playWithBall: 'playwithball',
  /** はしって */
  run: 'run',
  /** ぶるぶるして */
  shakeFullBody: 'shakefullbody',
  /** こっちむいて */
  showYourFace: 'showyourface',
  /** うたって */
  sing: 'sing',
  /** おきて */
  standup: 'standup',
  /** まて */
  stay: 'stay',
  /** おかわり */
  theOtherHand: 'theotherhand',
  /** まわって */
  turn: 'turn',
  /** 認識ワード で音声コマンドの usercommand1に登録された認識ワード */
  userCommand1: 'usercommand1',
  /** 認識ワード で音声コマンドの usercommand2に登録された認識ワード */
  userCommand2: 'usercommand2',
  /** 認識ワード で音声コマンドの usercommand3に登録された認識ワード */
  userCommand3: 'usercommand3',
  /** 作成した連携アプリ の認識ワードで音声コマンドの appcommand1_${client_id}に登録された認識ワード */
  appCommand1: 'appcommand1',
  /** 作成した連携アプリ の認識ワードで音声コマンドの appcommand2_${client_id}に登録された認識ワード */
  appCommand2: 'appcommand2',
  /** 作成した連携アプリ の認識ワードで音声コマンドの appcommand3_${client_id}に登録された認識ワード */
  appCommand3: 'appcommand3',
  /** あるいて */
  walk: 'walk'
} as const;
export type VoiceCommand = valueOf<typeof voiceCommand>;

export const voiceCommandDirection = {
  /** 前方 */
  front: 'front',
  /** 右前方 */
  rightFront: 'right_front',
  /** 右 */
  right: 'right',
  /** 右後方 */
  rightBack: 'right_back',
  /** 左前方 */
  leftFront: 'left_front',
  /** 左 */
  left: 'left',
  /** 左後方 */
  leftBack: 'left_back',
  /** 後方 */
  back: 'back'
} as const;
export type VoiceCommandDirection = valueOf<typeof voiceCommandDirection>;

const settingAPIs = {
  /**
   * ## GetDevices
   * ### 所有している aibo の一覧を取得します。
   */
  getDevices,

  /**
   * ## GetExecution
   * ### API の実行結果を取得します。
   *
   *  - API の実行結果を取得するために、Responseの `status` が `SUCCEEDED` か `FAILED` になるまで繰り返し,
   *    HTTP リクエストを行ってください。
   *  - status が `ACCEPTED` や `IN_PROGRESS` からずっと変化しない場合は、aibo が脱力状態で API をうまく実行できなかったり、
   *    aibo のネットワーク接続が切断したりしていることが考えられます。
   *    この場合は、API の実行が失敗したものとして扱うことをおすすめします。
   *    そのため、API の実行結果を取得する HTTP リクエストの繰り返しには、タイムアウトを設けてください。
   *    適切なタイムアウトの時間は、API の種類や設定するパラメーターの値によって変化します。
   */
  getExecution,

  /**
   * ## SetMode
   * ### aibo が指示待ち中になるかどうかを指定します。
   * 指示待ち中の aibo は、動き回ることはありませんが、しっぽを動かしたり、感情が変化したりします。
   */
  setMode
} as const;

const authorizationAPIs = {
  /**
   * ## IssueToken
   * ### アクセストークン・リフレッシュトークンを取得するための API です。
   */
  issueToken,

  /**
   * ## RefreshToken
   * ### 連携アプリが保持しているリフレッシュトークンを元にアクセストークンを再取得するための API です。
   * @deprecated `lambda`で自動処理されるため
   */
  refreshToken,

  /**
   * ## RevokeToken
   * ### 連携アプリが保持しているアクセストークンとリフレッシュトークンを破棄するための API です。
   * @deprecated `lambda`で自動処理できるため
   */
  revokeToken
} as const;

const actionAPIs = {
  /** ## ApproachObject
   * ### aibo が指定されたものに近づきます。
   * 実行すると、aibo は指定されたものを探します。指定されたものを見つけると、 aibo がそれに向かって近づいていきます。
   */
  approachObject,

  /**
   * ## ApproachPerson
   * ### aibo が人に指定された距離まで近づきます。
   * 実行すると、aibo は人を探します。人を見つけると、aibo が人に向かって近づいていきます。
   */
  approachPerson,

  /**
   * ## ChangePosture
   * ### aibo が指定された姿勢をとります。すでにその姿勢のときは、何もせずに終了します。
   */
  changePosture,

  /**
   * ## ChaseObject
   * ### aibo が指定されたものを見続けます。
   * 実行すると、aibo は指定されたものを探します。指定されたものを見つけると、 aibo がそれを見続けます。
   */
  chaseObject,

  /**
   * ## ChasePerson
   * ### aibo が人を見続けます。
   * 実行すると、aibo は人を探します。見つけた人の中で、 aibo が見続けたい人を見続けます。
   */
  chasePerson,

  /**
   * ## Explore
   * ### aibo が指定された時間歩き回ります。
   * aibo は歩き回りながら周囲の風景を撮影することで、今いる場所の地図を作成します。
   * もし、すでに地図を作成したことがある場所の場合、数十秒から数分歩き回ると
   * 作成済みの地図を思い出します。その後、思い出した地図を更新し続けます。
   */
  explore,

  /**
   * ## FindObject
   * ### aibo が指定されたものを探します。
   */
  findObject,

  /**
   * ## FindPerson
   * ### aibo が人を探します。
   */
  findPerson,

  /**
   * ## GetCloseToObject
   * ### aibo が近くにある指定されたものに対して、かなりそばまで近づきます。
   * ApproachObject で近づいたあとに使用してください。
   */
  getCloseToObject,

  /**
   * ## KickObject
   * ### aibo が指定されたものを蹴ったりヘディングしたりします。
   * 実行すると、 aibo は指定されたものを探します。指定されたものを見つけると、
   * aibo がそれに近づき、十分近づくと指定した動作を行います。
   * ApproachObject で近づいた後に使用してください。
   */
  kickObject,

  /**
   * ## MoveAlongCircle
   * ### aibo が円弧を描きながら歩きます。
   * 円弧の大きさやどれぐらいの距離（角度）を歩くのかを指定することができます。
   */
  moveAlongCircle,

  /**
   * ## MoveDirection
   * ### aibo が指定された方向へ指定された距離を歩きます。
   */
  moveDirection,

  /**
   * ## MoveForward
   * ### aibo が指定された距離を前後に歩きます。
   */
  moveForward,

  /**
   * ## MoveHead
   * ### aibo が指定された向きへ、指定された速さで首と顔を動かします。
   */
  moveHead,

  /**
   * ## MoveSideways
   * ### aibo が指定された距離を左右に横歩きします。
   */
  moveSideways,

  /**
   * ## MoveToPosition
   * ### aibo が指定された場所へ向かいます。
   * aibo がそのとき認識している地図に指定された場所が存在している場合、aibo がその場所へ向かいます。
   * もしも aibo が地図を忘れている場合（MoveToPosition の結果取得の Response における status は
   * SUCCEEDED で move_to_position Element の achieved が false の場合） は、
   * Explore を実行して aibo に地図を思い出させてから使用してください。
   */
  moveToPosition,

  /**
   * ## PlayBone
   * ### aibo が専用アクセサリーのアイボーンを使って遊びます。
   * 実行すると、 aibo はアイボーンを探します。アイボーンが近くにある場合、アイボーンに近づいて遊びます。
   * ApproachObject で近づいた後に使用してください。
   */
  playBone,

  /**
   * ## PlayDice
   * ### aibo が専用アクセサリーのサイコロを使い、指定された遊びを行います。
   * 実行すると、 aibo はサイコロを探します。サイコロが近くにある場合、サイコロに近づいて遊びます。
   * ApproachObject で近づいた後に使用してください。
   */
  playDice,

  /**
   * ## PlayMotion
   * ### aibo が指定されたふるまいを行います。
   */
  playMotion,

  /**
   * ## PlayTrick
   * ### aibo が指定されたふるまい（ひと続きの動作）を行います。
   * aibo 本体のシステムソフトウェアが Ver.4.30 以降で、指定されたふるまいを aibo が覚えていた場合、実行できます。
   */
  playTrick,

  /**
   * ## ReleaseObject
   * ### aibo がくわえているものを離します。
   * 実行すると、指定したものにあわせて aibo がくわえているものを口から離します。
   * くわえているものと指定したものが異なる場合、正しく離すことができない場合があります。
   */
  releaseObject,

  /**
   * ## Stay
   * ### aibo が指定された時間、待機します。
   */
  stay,

  /**
   * ## TurnAround
   * ### aibo が指定された角度だけその場で回ります。
   */
  turnAround
};

const cognitionAPIs = {
  /**
   * ## BitingStatus
   * ### aibo がものをくわえているかどうかを取得します。
   */
  bitingStatus,

  /**
   * ## BodyTouchedStatus
   * ### aibo が体のどの部分を触られているのかを取得します。
   */
  bodyTouchedStatus,

  /**
   * ## FoundObjectsStatus
   * ### aibo が認識している人やものについて取得します。
   */
  foundObjectsStatus,

  /**
   * ## HungryStatus
   * ### aibo のバッテリー残量を取得します。
   */
  hungryStatus,

  /**
   * ## NameCalledStatus
   * ### aibo が自分の名前を呼ばれたかどうかを取得します。
   * 名前を呼ばれていた場合、呼ばれた方向も合わせて取得します。
   */
  nameCalledStatus,

  /**
   * ## PawPadsStatus
   * ### aibo の肉球が押されているかどうかを取得します。
   */
  pawPadsStatus,

  /**
   * ## PostureStatus
   * ### aibo がとっている姿勢を取得します。
   */
  postureStatus,

  /**
   * ## SleepyStatus
   * ### aibo の眠さを取得します。
   */
  sleepyStatus,

  /**
   * ## VoiceCommandStatus
   * ### aibo が反応した言葉を取得します。
   * 同じ認識ワードが複数の音声コマンドに登録されている場合、
   * aibo が反応した言葉として取得できるのは、いずれか１つのみです。
   */
  voiceCommandStatus
};

const aiboAPIs = {
  SettingAPIs: settingAPIs,
  ActionAPIs: actionAPIs,
  CognitionAPIs: cognitionAPIs
};

//
//
// ExecutionReturn
interface AiboFuncExecutionResponse {
  executionId: string;
  status: 'ACCEPTED' | 'FAILED';
  result: ExecutionStatusFailed;
}

//
//
// ExecutionStatus
interface AiboFuncStatusResponse {
  executionId: string;
  status: ExecutionStatusList;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any;
}

const executionStatusList = {
  /** 初期値 */
  none: 'NONE',
  /** サーバーへリクエストした */
  requested: 'REQUESTED',
  /** タイムアウト */
  timeout: 'TIMEOUT',
  /** サーバーが API 実行を受け付けた */
  accepted: 'ACCEPTED',
  /** aibo が API 実行を受け付けた */
  inProgress: 'IN_PROGRESS',
  /** aibo が API 実行を完了した */
  succeeded: 'SUCCEEDED',
  /** aibo が API 実行に失敗した */
  failed: 'FAILED'
} as const;

type ExecutionStatusList = valueOf<typeof executionStatusList>;

//
//
// ExecutionStatusFailed
interface ExecutionStatusFailed {
  failedResult: ExecutionStatusFailedResultList;
  detail: ExecutionStatusFailedDetailList;
}

const executionStatusFailedResultList = {
  /** aibo が API 実行を開始できなかった */
  cannotStart: 'CANNOTSTART',
  /** aibo が API 実行を途中で止めた */
  interrupt: 'INTERRUPT',
  /** aibo が API を実行できなかった */
  abort: 'ABORT'
} as const;

type ExecutionStatusFailedResultList = valueOf<typeof executionStatusFailedResultList>;

const executionStatusFailedDetailList = {
  /** ### エラーの原因を特定できなかった。
   * aibo がネットワークに繋がっていることなどを確認し、aibo が API を実行できる状態であることを確認してください。 */
  E100: 'E-100',
  /** ### aibo が脱力中や睡眠中などの API を実行できない状態だった。
   * 電池の残量が十分であることや aibo が無理な姿勢でないことなど、Action API を実行できる状況であることを確認してください。 */
  E200: 'E-200',
  /** ### Action Queueing 関係の問題が生じた。
   * Queue の上限に達していないかや Action API の実行方法に問題がないかなどを確認してください。}; */
  E300: 'E-300',

  // original

  /** ### HTTP リクエストのボディに問題があります。
   * API のパラメーターに問題がないかを確認してください。 */
  R400: 'R-400',
  /** ### アクセストークンの記載形式に問題があります。 */
  R401: 'R-401',
  /** ### 存在しない、または許可されていないパスにアクセスしようとしています。 */
  R403: 'R-403',
  /** ### 存在しない、または許可されていないリソースにアクセスしようとしています。
   * API 名と deviceId が正しいことを確認してください。または aibo 本体のシステムソフトウェアが API に対応した Ver. であることを確認してください。 */
  R404: 'R-404',
  /** ### アプリ連携を行えないアカウントです。連携アプリの上限に達していないかどうかや、アカウントに連携アプリを利用できる aibo が紐づいていることを確認してください。 アクセストークンやリフレッシュトークンが有効な場合、連携アプリとの連携が一時無効化されています。 */
  R409: 'R-409',
  /** ### API のレート制限を超過しました。アクセストークンを生成し直すか、しばらく時間をおいてから試してください。 */
  R429: 'R-429',
  /** ### サーバーの内部エラーです。 */
  R500: 'R-500',
  /** ### サーバーにアクセスできません。しばらく時間をおいてから試してください。 */
  R503: 'R-503'
} as const;

type ExecutionStatusFailedDetailList = valueOf<typeof executionStatusFailedDetailList>;

type SettingAPIs = valueOf<typeof settingAPIs>;
type AuthorizationAPIs = valueOf<typeof authorizationAPIs>;
type ActionAPIs = valueOf<typeof actionAPIs>;
type CognitionAPIs = valueOf<typeof cognitionAPIs>;

type CognitionAPIsResultType = bitingStatusResult &
  bodyTouchedStatusResult &
  foundObjectsStatusResult &
  hungryStatusResult &
  nameCalledStatusResult &
  PawPadsStatusResult &
  PostureStatusResult &
  SleepyStatusResult &
  VoiceCommandStatusResult;

type AiboAPIs = SettingAPIs | AuthorizationAPIs | ActionAPIs | CognitionAPIs;

export {
  settingAPIs,
  authorizationAPIs,
  actionAPIs,
  cognitionAPIs,
  aiboAPIs,
  executionStatusList,
  executionStatusFailedResultList,
  executionStatusFailedDetailList
};
export type {
  CognitionAPIsResultType,
  AiboFuncExecutionResponse,
  AiboFuncStatusResponse,
  ExecutionStatusFailed,
  AiboAPIs,
  ActionAPIs,
  CognitionAPIs,
  SettingAPIs,
  AuthorizationAPIs,
  ExecutionStatusList,
  ExecutionStatusFailedResultList,
  ExecutionStatusFailedDetailList
};
