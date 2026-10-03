export function ButtonSpinner({ className = '' }) {
  return <span aria-hidden="true" className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${className}`} />;
}

export function InlineErrorBanner({ title, message, className = '' }) {
  return <div role="alert" className={`rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 ${className}`}>
    <strong className="block">{title}</strong>
    <span>{message}</span>
  </div>;
}
