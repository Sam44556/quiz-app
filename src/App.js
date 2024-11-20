

import { useProvider } from './context/provder';
import Header from "./components/Header";
import Loading from "./components/Loader";
import Error from "./components/Error";
import Quastion from "./components/Quastion";
import Read from "./components/R";
import Main from "./components/Main";
import Buttonn from "./components/Butn";
import Progress from "./components/Prog";
import Timer from "./components/Timer";
import Fin from "./components/Fin";



export default function App() {
  const { status,dispatch,index ,nq} = useProvider();
  return (
    <div className="App">
       
      <Header />
      <Main>
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "ready" && <Read />}
        {status === "active" && (
          <div>
            <Progress />
            {index >= nq ? (
              <>
                <Fin  />
                <button onClick={() => dispatch({ type: "restart" })}>
                  {" "}
                  restart{" "}
                </button>
              </>
            ) : (
              <>
                <Quastion />
                <Timer />
                <Buttonn />
              </>
            )}
          </div>
        )}
        {status === "finished" && (
          <>
            <Fin/>
            <button onClick={() => dispatch({ type: "restart" })}>
              Restart
            </button>
          </>
        )}
      </Main>
      
    </div>
  );
}
