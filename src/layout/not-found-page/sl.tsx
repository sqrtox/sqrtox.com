import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import { useState } from "react";
import styles from "./sl.module.scss";

const SMOKE_1 = `\
                      (  ) (@@) ( ) (@) ()   @   0   @   0    @     0     @     0
                 (@@@)
             (    )
          (@@@@)

        (   )
`;
const SMOKE_2 = `\
                      (@@) (  ) (@) ( ) @@   0   @   0   @    0     @     0     @
                 (   )
             (@@@@)
          (    )

        (@@@)
`;
const SMOKES = [SMOKE_1, SMOKE_2];

const D51 = `\
      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|__\
`;

const D51_WHEEL_1 = `\
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__
 |/-=|___|=    ||    ||    ||    |_____/~\\___/
  \\_/      \\O=====O=====O=====O_/      \\_/           \
`;
const D51_WHEEL_2 = `\
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__
 |/-=|___|=O=====O=====O=====O   |_____/~\\___/
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/           \
`;
const D51_WHEEL_3 = `\
__/ =| o |=-O=====O=====O=====O \\ ____Y___________|__
 |/-=|___|=    ||    ||    ||    |_____/~\\___/
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/           \
`;
const D51_WHEEL_4 = `\
__/ =| o |=-~O=====O=====O=====O\\ ____Y___________|__
 |/-=|___|=    ||    ||    ||    |_____/~\\___/
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/           \
`;
const D51_WHEEL_5 = `\
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__
 |/-=|___|=   O=====O=====O=====O|_____/~\\___/
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/           \
`;
const D51_WHEEL_6 = `\
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__
 |/-=|___|=    ||    ||    ||    |_____/~\\___/
  \\_/      \\_O=====O=====O=====O/      \\_/           \
`;

export const D51_WHEELS = [
  D51_WHEEL_1,
  D51_WHEEL_2,
  D51_WHEEL_3,
  D51_WHEEL_4,
  D51_WHEEL_5,
  D51_WHEEL_6,
];

const COAL = `\


    _________________
   _|                \\_____A
 =|                        |
 -|                        |
__|________________________|_
|__________________________|_
   |_D__D__D_|  |_D__D__D_|
    \\_/   \\_/    \\_/   \\_/    \
`;

const runTrain = (): Promise<void> => {
  const { promise, resolve } = Promise.withResolvers<void>();

  const smoke = (() => {
    const elem = document.createElement("pre");

    elem.innerText = SMOKES[0] ?? "";

    return elem;
  })();
  const d51 = (() => {
    const elem = document.createElement("pre");

    elem.innerText = `${D51}\n${D51_WHEELS[0]}`;

    return elem;
  })();
  const coal = (() => {
    const elem = document.createElement("pre");

    elem.innerText = COAL;

    return elem;
  })();
  const puffer = (() => {
    const puffer = document.createElement("div");

    puffer.classList.add(styles.puffer as string);
    puffer.append(d51, coal);

    return puffer;
  })();
  const train = (() => {
    const elem = document.createElement("div");

    elem.classList.add(
      styles.train as string,
      styles.trainUnknownSize as string,
    );
    elem.style.setProperty("--trainHeight", "0px");
    elem.append(smoke, puffer);

    return elem;
  })();

  document.body.append(train);
  train.style.setProperty("--trainWidth", `${train.offsetWidth}px`);
  train.style.setProperty("--trainHeight", `${train.offsetHeight}px`);
  train.classList.remove(styles.trainUnknownSize as string);
  train.classList.add(styles.runningTrain as string);

  const controller = new AbortController();

  let wheel = 0;
  let smokes = 0;
  let wheelPrev = 0;
  let smokePrev = 0;

  const frame = (): void => {
    if (Date.now() - wheelPrev > 50) {
      d51.innerText = `${D51}\n${D51_WHEELS[wheel++]}`;
      wheelPrev = Date.now();

      if (wheel >= D51_WHEELS.length) {
        wheel = 0;
      }
    }

    if (Date.now() - smokePrev > 150) {
      smoke.innerText = SMOKES[smokes++] as string;
      smokePrev = Date.now();

      if (smokes >= SMOKES.length) {
        smokes = 0;
      }
    }

    if (!controller.signal.aborted) {
      requestAnimationFrame(frame);
    }
  };

  train.addEventListener(
    "animationend",
    (ev) => {
      if (ev.animationName !== styles.trainRunAnim) return;

      controller.abort();
      train.remove();
      resolve();
    },
    {
      signal: controller.signal,
    },
  );
  requestAnimationFrame(frame);

  return promise;
};

export interface SlButtonProps {
  containerEl: HTMLElement;
}

export function SlButton(_props: SlButtonProps) {
  const [running, setRunning] = useState(false);

  return (
    <Box>
      <MuiLink
        disabled={running}
        fontSize="large"
        className={running ? styles.running : styles.idle}
        color={running ? "textDisabled" : "textSecondary"}
        component="button"
        whiteSpace="nowrap"
        fontFamily="var(--code-font)"
        onClick={async () => {
          setRunning(true);
          await runTrain();
          setRunning(false);
        }}
      >
        $ /usr/bin/sl
      </MuiLink>
    </Box>
  );
}
