import Layout from "../layout/app/page";
import "../../../styles/backend/dashboard/index.css";

export default function DashboardPage() {
    return (
        <Layout>
            <div className="dashboard-container">
                <h1 className="dashboard-title">
                    Welcome to your Dashboard!
                </h1>
                <p className="dashboard-desc">
                    You are successfully logged in. Here you can manage your account and view your activity.
                </p>
                <div className="dashboard-widgets">
                    <div className="dashboard-widget">
                        <h3>👤 Profile</h3>
                        <p>View and edit your profile information.</p>
                    </div>
                    <div className="dashboard-widget">
                        <h3>📊 Reports</h3>
                        <p>Check your recent activity and reports.</p>
                    </div>
                    <div className="dashboard-widget">
                        <h3>⚙️ Settings</h3>
                        <p>Manage your account settings and preferences.</p>
                    </div>
                    <div className="dashboard-widget">
                        <h3>💬 Support</h3>
                        <p>Contact support for help and feedback.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}