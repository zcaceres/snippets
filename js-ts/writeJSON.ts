/**
 * Write a string to a tmp file for introspection.
 * @param str
 */
export async function writeJSON(str: string): Promise<void> {
  await fs.writeFile('tmp.json', JSON.stringify(str), (err: Error) => {
    if (err) throw err
    console.log("Wrote tmp.json")
  })
}

