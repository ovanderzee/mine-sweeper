import fs from 'fs'
import liveScores from '../src/__mocks__/scores.json' with { type: 'json' }

const sorted = liveScores.toSorted((a, b) => b.score.points - a.score.points)
sorted.forEach((n) => {delete n.rank})

const formatted = sorted.map((n, i) => (i < sorted.length-1) ? `  ${JSON.stringify(n)},` : `  ${JSON.stringify(n)}`)

const lines = [
  "[",
  ...formatted,
  "]"
]

const content = lines.join('\n')

fs.writeFile('src/__mocks__/scores.json', content, 'utf8', (err) => {
  if (err) {
    console.error('Error writing liveScores:', err);
    return;
  }
  console.log(`liveScores sorted; ${formatted.length} records written`)
});
