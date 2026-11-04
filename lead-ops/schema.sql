-- Visual Art AI Lead Ops / D1. PII: mantener bajo control de acceso, sin replicar en GitHub.
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  business TEXT NOT NULL,
  city TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT NOT NULL DEFAULT '',
  goal TEXT NOT NULL,
  consent_at TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  fingerprint TEXT NOT NULL UNIQUE,
  score INTEGER NOT NULL,
  stage TEXT NOT NULL DEFAULT 'new',
  notification_status TEXT NOT NULL DEFAULT 'pending',
  notification_attempts INTEGER NOT NULL DEFAULT 0,
  reminders_sent INTEGER NOT NULL DEFAULT 0,
  last_reminded_at TEXT,
  CHECK (stage IN ('new','qualified','diagnosis_ready','proposal_ready','proposal_sent','won','lost','delivering','completed'))
);
CREATE INDEX IF NOT EXISTS leads_created ON leads(created_at);
CREATE INDEX IF NOT EXISTS leads_stage ON leads(stage, updated_at);
CREATE INDEX IF NOT EXISTS leads_notify ON leads(notification_status, notification_attempts);
CREATE INDEX IF NOT EXISTS leads_rate ON leads(ip_hash, created_at);
CREATE TABLE IF NOT EXISTS lead_events (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL,
  at TEXT NOT NULL,
  event TEXT NOT NULL,
  detail TEXT NOT NULL DEFAULT '',
  FOREIGN KEY(lead_id) REFERENCES leads(id)
);
CREATE INDEX IF NOT EXISTS events_by_lead ON lead_events(lead_id, at);
