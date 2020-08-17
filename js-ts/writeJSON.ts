/**
 * Write a string to a tmp file for introspection.
 * @param data an object of any type 
 */
export async function writeJSON(str: any): Promise<void> {
  await fs.writeFile('tmp.json', JSON.stringify(str), (err: Error) => {
    if (err) throw err
    console.log("Wrote tmp.json")
  })
}

