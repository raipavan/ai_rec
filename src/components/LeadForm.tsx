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
  /** Shown under the button before sending. */
  hint: string;
  /** Replaces the hint once the form has been sent. */
  success: string;
}

/**
 * Enquiry form used on the pricing, partners and careers pages. Like the home
 * page contact form it has no backend yet: wire `onSubmit` to your form
 * endpoint or CRM before launch.
 */
export function LeadForm({ fields, submitLabel, hint, success }: LeadFormProps) {
  const [sent, setSent] = useState(false);
  const baseId = useId();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <form className="form-panel" onSubmit={onSubmit} onInput={() => setSent(false)}>
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
      <p className={`hint caption${sent ? ' is-sent' : ''}`} style={{ marginTop: 14 }} role="status">
        {sent ? success : hint}
      </p>
    </form>
  );
}
