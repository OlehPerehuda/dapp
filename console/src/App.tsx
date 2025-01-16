import { Header } from "@/app/components/common/Header";
import { Notification } from "@/app/components/common/Notification";

import { AppContext } from "@/app/context/app";

import "./App.scss";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AppContext>
            <Notification />
            <Header />
        </AppContext>
    );
};

export default App;
