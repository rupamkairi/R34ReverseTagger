# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# Architecture
- Deploy this SvelteKit app to Cloudflare Workers (with Static Assets), not Pages. Confidence: 0.70
- Use native `fetch` instead of axios for server-side HTTP calls, because axios's Node `http` adapter is incompatible with the Cloudflare Workers runtime. Confidence: 0.80

# Workflow
- Consult official Cloudflare/SvelteKit docs before recommending framework or deployment decisions. Confidence: 0.70
