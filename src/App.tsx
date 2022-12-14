import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./auth/AuthProvider";
import { ToastProvider } from "./hooks/useContext/toast/ToastProvider";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <ToastProvider>
                    <AppRoutes />
                </ToastProvider>
            </AuthProvider>
        </div>
    );
}

export default App;