export default async function handler(req, res) {
  try {
    // We expect the body to be a string (the raw envelope)
    // If Vercel parsed it as JSON, we need it back as a string, but typically
    // Sentry envelopes are plain text/newline-delimited JSON.
    const envelope =
      typeof req.body === 'string' ? req.body : req.body.toString();
    const header = JSON.parse(envelope.split('\n')[0]);

    if (!header.dsn) {
      return res.status(400).json({ error: 'No DSN in envelope header' });
    }

    const dsn = new URL(header.dsn);
    const projectId = dsn.pathname.replace('/', '');

    // Validate that the request is for our Sentry project to prevent abuse
    if (projectId !== '4509940389707776') {
      return res.status(401).json({ error: 'Invalid Project ID' });
    }

    const sentryIngestUrl = `https://${dsn.hostname}/api/${projectId}/envelope/`;

    const response = await fetch(sentryIngestUrl, {
      method: 'POST',
      body: envelope,
      headers: {
        'Content-Type': 'application/x-sentry-envelope',
      },
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (e) {
    console.error('Sentry tunnel error:', e);
    res.status(500).json({ status: 'error', error: e.message });
  }
}
