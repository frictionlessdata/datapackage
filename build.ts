import { execa } from "execa"

const root = execa({ preferLocal: true, stdout: ["inherit"] })

// Build website

await root`astro build`
