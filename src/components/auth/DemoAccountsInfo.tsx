
import { Link } from "react-router-dom";

export const DemoAccountsInfo = () => {
  return (
    <div className="mt-8">
      <h3 className="mb-2 font-semibold">Demo Accounts:</h3>
      <div className="grid gap-1 text-sm text-muted-foreground">
        <p>Patient: patient@example.com (nutze Code-Login)</p>
        <p>Arzt: doctor@example.com / password</p>
        <p>Admin: admin@example.com / password</p>
      </div>
      <div className="mt-4 text-center">
        <Link to="/test-users" className="text-cannabis-green-600 hover:underline text-sm">
          Testbenutzer erstellen
        </Link>
      </div>
    </div>
  );
};
