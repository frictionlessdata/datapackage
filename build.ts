import { execa } from "execa"

const root = execa({ preferLocal: true, stdout: ["inherit"] })

// Build website

await root`npx astro build`

// Copy profiles

await root`cp -r profiles/target build/profiles`
