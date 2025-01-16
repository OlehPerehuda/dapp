import { Header } from "@/app/components/common/Header";
import { AppContext } from "@/app/context/app";

import "./App.scss";

function App() {
    return (
        <AppContext>
            <Header />
        </AppContext>
    );
};

export default App;
