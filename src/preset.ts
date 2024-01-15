import { Channel } from "@storybook/channels";
import { Options } from "@storybook/types";
import { WebSocketServer } from "ws";
import EVENTS from "@storybook/core-events";

export type ReactNativeServerOptions = {
  host?: string;
  port?: number;
};

export async function experimental_serverChannel(
  channel: Channel,
  { configType, presets, loglevel }: Options,
) {
  if (configType === "DEVELOPMENT") {
    const options = await presets.apply<ReactNativeServerOptions>(
      "reactNativeServerOptions",
    );

    if (options) {
      const port = options.port ?? 7007;

      const host = options.host ?? "localhost";

      const wss = new WebSocketServer({ port, host });

      wss.on("connection", function connection(ws) {
        console.log("websocket connection established");

        ws.on("error", console.error);

        ws.on("message", function message(data) {
          try {
            const json = JSON.parse(data.toString());

            if (loglevel === "debug") {
              console.log("Websocket message received from client:");
              console.log("type: ", json.type);
              console.log("args: ", json.args[0]);
            }

            if (json.args.length > 0) {
              channel.emit?.(json.type, json.args[0]);
            } else {
              channel.emit?.(json.type);
            }
          } catch (error) {
            console.error(error);
          }
        });
      });

      [
        ...Object.values(EVENTS),
        "storybook-addon-background:set",
        "storybook-addon-background:unset",
        "storybook-addon-background:update",
        "storybook/actions/action-event",
        "storybook/actions/action-clear",
      ].forEach((curEvent) => {
        channel.on(curEvent, async (data) => {
          try {
            if (
              curEvent === "storybook/actions/action-event" &&
              data?.data?.args?.target
            ) {
              // fixes self referencing object error for json stringify
              data.data.args.nativeEvent = null;
              data.data.args.target = null;
              data.data.args.currentTarget = null;
              data.data.args.view = null;
            }

            const toSend = JSON.stringify({ type: curEvent, args: [data] });

            if (loglevel === "debug") {
              console.log("message received on the storybook channel");
              console.log("type: ", curEvent);
              console.log("data: ", data);
            }

            wss.clients.forEach((ws) => ws.send(toSend));
          } catch (error) {
            console.error({ event: curEvent, error });
          }
        });
      });
    }
  }

  return channel;
}
