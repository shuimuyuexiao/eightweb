"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/config/site";

type FormCopy = {
  name: string;
  email: string;
  company: string;
  service: string;
  servicePlaceholder: string;
  services: readonly string[];
  message: string;
  consent: string;
  submit: string;
  sending: string;
  required: string;
  success: string;
  mailto: string;
  error: string;
};

type Status = { type: "idle" | "success" | "error"; message: string };

export function ContactForm({ copy }: { copy: FormCopy }) {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus({ type: "error", message: copy.required });
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const email = String(data.email ?? "");
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ type: "error", message: copy.required });
      return;
    }

    setSending(true);
    setStatus({ type: "idle", message: "" });

    try {
      const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Contact endpoint rejected request");
        form.reset();
        setStatus({ type: "success", message: copy.success });
      } else {
        const subject = encodeURIComponent(
          `Project enquiry from ${String(data.name ?? "website visitor")}`,
        );
        const body = encodeURIComponent(
          [
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Company: ${data.company || "—"}`,
            `Area of interest: ${data.service}`,
            "",
            String(data.message ?? ""),
          ].join("\n"),
        );
        window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
        setStatus({ type: "success", message: copy.mailto });
      }
    } catch {
      setStatus({ type: "error", message: copy.error });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label>
          <span>{copy.name} *</span>
          <input name="name" autoComplete="name" required minLength={2} />
        </label>
        <label>
          <span>{copy.email} *</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <div className="form-grid">
        <label>
          <span>{copy.company}</span>
          <input name="company" autoComplete="organization" />
        </label>
        <label>
          <span>{copy.service} *</span>
          <select name="service" required defaultValue="">
            <option value="" disabled>
              {copy.servicePlaceholder}
            </option>
            {copy.services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        <span>{copy.message} *</span>
        <textarea name="message" rows={7} required minLength={20} />
      </label>
      <label className="consent-row">
        <input name="consent" type="checkbox" value="accepted" required />
        <span>{copy.consent}</span>
      </label>
      <div className="form-actions">
        <button className="button button-dark" type="submit" disabled={sending}>
          {sending ? copy.sending : copy.submit}
          <span aria-hidden="true">↗</span>
        </button>
        {status.type !== "idle" && (
          <p className={`form-status ${status.type}`} role="status">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
