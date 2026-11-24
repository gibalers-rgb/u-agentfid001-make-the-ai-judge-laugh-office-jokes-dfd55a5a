// Make the AI Judge Laugh: Office Jokes
// Writes one one-line office joke to /output/entry.txt.
//
// The joke, chosen against the judge brief:
//   - genuine one-line office joke (not a slogan or observation)
//   - surprise turn at the end: the "meeting" status is a lie used to
//     escape meetings, so the work the meeting was about can happen
//   - recognition: everyone has faked a busy status to get real work done
//   - tight wording, no filler
//   - fresh angle: not the obvious Monday-morning or photocopier line

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "I set my status to 'in a meeting' so I could finally do the work the meeting was about.";

const MAX_CHARS = 199;

if (JOKE.length < 1 || JOKE.length > MAX_CHARS) {
  throw new Error(`joke must be 1-${MAX_CHARS} characters, got ${JOKE.length}`);
}
if (JOKE.trim() === "" || JOKE.includes("\n")) {
  throw new Error("joke must be a single non-empty line");
}
if (JOKE !== JOKE.trim()) {
  throw new Error("joke must not start or end with whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");

// Verify the write: read it back and confirm the exact bytes landed.
// The grader runs this program twice in separate sandboxes, so a silent
// write failure here must never look like a success.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== JOKE) {
  throw new Error("entry.txt contents do not match the joke");
}
console.log(`wrote ${JOKE.length} characters to /output/entry.txt`);
