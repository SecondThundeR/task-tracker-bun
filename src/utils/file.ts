/**
 * Returns JSON data from file
 *
 * @description If file doesn't exist, returns default value. Otherwise will try to read
 * JSON contents of file. If `json()` will throw an error, it will be propagated
 * to the callee of the function to handle it correctly
 *
 * @param fileName Name of file to create
 * @param options Function options
 * @returns File data or default value
 */
export async function getJSONFromFile<T>(
  fileName: string,
  options?: {
    /** Control whether function should throw or catch `json()` error */
    throwError?: boolean;
    /** Value that will be returned if there is no file or incorrect JSON in file */
    defaultValue?: T;
  }
) {
  const { throwError = true, defaultValue } = { ...options };

  const file = Bun.file(fileName);

  try {
    if (await file.exists()) {
      return (await file.json()) as T;
    }
  } catch (e) {
    if (throwError) throw e;
  }

  return defaultValue;
}
