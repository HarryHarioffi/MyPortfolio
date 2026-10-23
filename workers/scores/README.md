# Scores service

The portfolio is a static export, so it can't keep other people's scores. This Cloudflare Worker does: it stores one board per game and difficulty (for example Pen tool on Hard) in Workers KV. Until it is deployed and connected, `/play` works the same and each board keeps the scores played on that device, labelled "This device".

## What it does

| Call | Does |
|---|---|
| `GET /<game>/<difficulty>` | Returns the board, best first. |
| `POST /<game>/<difficulty>` | Takes `{ name, payload, ms }`. `payload` is what the player did: the curve they picked and which target it was for (Ease match), the anchors they drew and which shape it was (Pen tool), or the tracking they set and which target it was for (Tracking). The score is worked out here, with `lib/play-score.ts`, the same code the games run. One place per name, and it only improves. |
| `DELETE /<game>/<difficulty>/<at>` | Removes an entry. Needs the admin token. `at` is the entry's timestamp, which is unique on a board. |

Games are `ease-match`, `pen-tool` and `tracking`; difficulties are `easy`, `medium` and `hard`. Only the origins in `ALLOWED_ORIGINS` may post. Each IP gets 20 submissions an hour.

## Deploy

You need a Cloudflare account (the free plan is enough). From this folder:

```bash
npx wrangler kv namespace create SCORES   # prints an id: paste it into wrangler.toml
npx wrangler secret put ADMIN_TOKEN       # any long random string, for deleting entries
npx wrangler deploy                       # prints the Worker's URL
```

Then point the site at it and rebuild:

```bash
NEXT_PUBLIC_SCORES_URL=https://hh-scores.<your-subdomain>.workers.dev npm run build
```

Set the same variable wherever the site is built, and every board on `/play` becomes shared. If the site's address changes, update `ALLOWED_ORIGINS` and redeploy.

## Moderation

Open the board (for example `GET /ease-match/hard`), copy the `at` of the entry to remove, and:

```bash
curl -X DELETE -H "Authorization: Bearer $ADMIN_TOKEN" https://hh-scores.<your-subdomain>.workers.dev/ease-match/hard/<at>
```

## Limits to know

- Cloudflare's free plan allows 1,000 KV writes and 100,000 reads a day ([pricing](https://developers.cloudflare.com/kv/platform/pricing/)). A submission costs two writes, so about 500 a day. Past that, the Worker answers 503 and the site says the board didn't load.
- A new score can take a little while to show for other visitors (KV is eventually consistent). The person who submitted sees theirs at once.
- The time kept with each score (it only settles ties) is measured in the browser, so the service can't check it. It clamps it to between half a second and ten minutes.
- The hidden targets ship in the site's JavaScript, so someone determined can read them and submit a perfect run. The server stops typed-in scores, not that. For a portfolio game that is a fair trade; if it ever matters, delete the entry.
