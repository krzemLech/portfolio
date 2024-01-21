// Generated by Xata Codegen 0.28.3. Please do not edit.
import { buildClient } from "@xata.io/client";
/** @typedef { import('./types').SchemaTables } SchemaTables */
/** @type { SchemaTables } */
const tables = [
  {
    name: "messages",
    columns: [
      { name: "author", type: "text" },
      { name: "email", type: "email" },
      { name: "subject", type: "text" },
      { name: "text", type: "text" },
      { name: "day", type: "string" },
    ],
  },
];
/** @type { import('@xata.io/client').ClientConstructor<{}> } */
const DatabaseClient = buildClient();
const defaultOptions = {
  databaseURL:
    "https://krzem-s-workspace-hascij.eu-central-1.xata.sh/db/portfolio-db",
};
/** @typedef { import('./types').DatabaseSchema } DatabaseSchema */
/** @extends DatabaseClient<DatabaseSchema> */
export class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}
let instance = undefined;
/** @type { () => XataClient } */
export const getXataClient = () => {
  if (instance) return instance;
  instance = new XataClient();
  return instance;
};