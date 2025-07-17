import Header from "../header/page";
import Sidebar from "../sidebar/page";
import "../../../../styles/backend/layout/header.css";
import "../../../../styles/backend/layout/sidebar.css";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Sidebar />
            <Header />
            <main style={{
                marginLeft: 250,
                marginTop: 68,
                padding: 32,
                background: "#f6f8fa",
                minHeight: "calc(100vh - 68px)"
            }}>
                {children}
            </main>
        </>
    );
}