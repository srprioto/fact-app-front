import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./auth/AuthProvider";

function App() {

    return (
        <div className="App">
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </div>
    );
}

export default App;