export default function StatusMessage({ children, action, onAction }) {
  return <div className="status-message"><p>{children}</p>{action && <button className="button button-primary" onClick={onAction}>{action}</button>}</div>;
}
