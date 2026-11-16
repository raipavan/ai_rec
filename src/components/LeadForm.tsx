import { useId, useState, type FormEvent } from 'react';

export interface LeadField {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  required?: boolean;
  options?: string[];
  autoComplete?: string;
  placeholder?: string;
  /** Span both columns of the form grid. */
  wide?: boolean;
}

interface LeadFormProps {
  fields: LeadField[];
  submitLabel: string;
  hint: string;
  recipient?: string;
  subject?: string;
}

export function LeadForm({ fields, submitLabel, hint, recipient = 'sales@talentpool365.com', subject = 'Website enquiry' }: LeadFormProps) {
  const [draft, setDraft] = useState('');
  const baseId = useId();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = fields.map((field) => `${field.label}: ${String(data.get(field.name) ?? '').trim()}`).join('\n\n');
    setDraft(`mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <form className="form-panel" onSubmit={onSubmit} onInput={() => setDraft('')}>
      <div className="form-grid">
        {fields.map((field) => {
          const id = `${baseId}-${field.name}`;
          const shared = { id, name: field.name, required: field.required };

          return (
            <div className={`field${field.wide ? ' field--wide' : ''}`} key={field.name}>
              <label htmlFor={id}>
                {field.label}
                {field.required ? (
                  <span className="req" aria-hidden="true">
                    {' '}
                    *
                  </span>
                ) : field.type !== 'select' ? (
                  <span className="opt"> (optional)</span>
                ) : null}
              </label>
              {field.type === 'select' ? (
                <select {...shared} defaultValue={field.options?.[0]}>
                  {field.options?.map((option) => <option key={option}>{option}</option>)}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea {...shared} placeholder={field.placeholder} />
              ) : (
                <input
                  {...shared}
                  type={field.type ?? 'text'}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          );
        })}
      </div>
      <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
        {submitLabel}
      </button>
      <p className="hint caption" style={{ marginTop: 14 }} role="status">
        {draft ? 'Your draft is ready. Open your email app to review and send it. Your request has not been sent yet.' : hint}
      </p>
      {draft ? <a className="btn btn-outline draft-link" href={draft}>Open email draft</a> : null}
      <p className="form-privacy">Please do not include sensitive candidate data. <a href="/legal#privacy-policy">Privacy information</a></p>
    </form>
  );
}
