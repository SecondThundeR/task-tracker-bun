/**
 * Entrypoint of Task Tracker CLI app
 */

import { extractDataFromCLI, handleCLIData } from "./src/utils";

await handleCLIData(extractDataFromCLI(process.argv));
