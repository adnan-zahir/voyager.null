// declare module 'discord.js' {
//   export interface Client {
//     commands: Collection<unknown, any>;
//   }
// }

import { Message } from 'discord.js';

declare module 'discord.js' {
  export interface Client {
    commands: Collection<unknown, Command>;
  }
}

export {};
