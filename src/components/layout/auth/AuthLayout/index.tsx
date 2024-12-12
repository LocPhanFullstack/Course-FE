export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="auth-layout">
      <main className="auth-layout__main">{children}</main>
    </div>
  );
};
