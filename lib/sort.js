import fs from 'fs'
import liveScores from '../src/__mocks__/scores.json' with { type: 'json' }

const leadingLines = [
  "// live registered scores",
  "["
]

const trailingLines = [
  "]",
  "",
  "// Paste new records anywhere between the existing records;",
  "// mind the commas between the records to make a valid array",
  "// Use .lib/sort.sh to sort and write record to this file.",
  ""
]

const sorted = liveScores.toSorted((a, b) => b.score.points - a.score.points)
sorted.forEach((n) => {delete n.rank})

const formatted = sorted.map((n, i) => (i < sorted.length-1) ? `  ${JSON.stringify(n)},` : `  ${JSON.stringify(n)}`)

const lines = [
  ...leadingLines,
  ...formatted,
  ...trailingLines
]

const content = lines.join('\n')

fs.writeFile('src/__mocks__/scores.json', content, 'utf8', (err) => {
  if (err) {
    console.error('Error writing liveScores:', err);
    return;
  }
  console.log(`liveScores sorted; ${formatted.length} records written`)
});
