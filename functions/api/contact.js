export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    const type = data.type || 'contact';

    // Basic required fields per type
    if (type === 'contact') {
      if (!data.fullName || !data.email || !data.message) {
        return json({ ok: false, error: 'Missing required contact fields.' }, 400);
      }
    } else if (type === 'quote') {
      if (!data.fullName || !data.workEmail || !data.problem) {
        return json({ ok: false, error: 'Missing required quote fields.' }, 400);
      }
    } else if (type === 'lead') {
      if (!data.name || !data.email || !data.service || !data.message) {
        return json({ ok: false, error: 'Missing required lead fields.' }, 400);
      }
    }

    const toEmail = 'info@sitelyhub.com';
    const subject = buildSubject(type, data);
    const text = buildBody(type, data);

    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      return json({ ok: false, error: 'Email service not configured.' }, 500);
    }

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Sitely <no-reply@sitelyhub.com>',
        to: [toEmail],
        subject,
        text,
        reply_to: data.email || data.workEmail || undefined
      })
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return json({ ok: false, error: 'Failed to send email', details: errText }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: 'Unexpected error', details: String(err) }, 500);
  }
}

function buildSubject(type, d) {
  if (type === 'quote') return `Quote request: ${d.packageType || d.package || 'unspecified'} - ${d.fullName}`;
  if (type === 'lead') return `Homepage lead: ${d.service}`;
  return `Contact: ${d.topic || 'project'} - ${d.fullName}`;
}

function buildBody(type, d) {
  if (type === 'quote') {
    return [
      `Name: ${d.fullName}`,
      `Email: ${d.workEmail}`,
      `Company: ${d.company || ''}`,
      `Website: ${d.website || ''}`,
      `Package: ${d.packageType || d.package || 'unspecified'}`,
      `Timeline: ${d.timeline || ''}`,
      `Budget: ${d.budget || ''}`,
      '',
      'Problem / Goals:',
      d.problem || ''
    ].join('\n');
  }
  if (type === 'lead') {
    return [
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Service: ${d.service}`,
      '',
      'Message:',
      d.message
    ].join('\n');
  }
  return [
    `Name: ${d.fullName}`,
    `Email: ${d.email}`,
    `Company: ${d.company || ''}`,
    `Phone: ${d.phone || ''}`,
    `Topic: ${d.topic || 'project'}`,
    '',
    'Message:',
    d.message || ''
  ].join('\n');
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}


