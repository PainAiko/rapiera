import LoadingComponent from "@widgets/loading/LoadingComponent";
import { useGetLog } from "./hooks/getLog";
import ListeLogFeature from "./ui/ListeLogFeature";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@app/hooks/App";
import { nextpage, setLog, setNextPage } from "@entities/backofficev2/logSlice";
import Error from "@shared/components/Error";

type Props = {};

export default function LogFeatures({}: Props) {
  const { response, error, isloading } = useGetLog();
  const { logs, next_page } = useAppSelector((state) => state.logSlice);
  const dispatch = useAppDispatch();
  const observerRef = useRef(null);
  useEffect(() => {
    if (response) {
      dispatch(setLog(response.data));
      response.next_page_url && dispatch(setNextPage(2));
    }
  }, [response?.data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Si l'élément observé est dans la vue, charge plus d'éléments
          next_page && dispatch(nextpage(next_page));
          //   fetchMoreItems();
        }
      },
      { threshold: 1 } // Déclenche l'intersection lorsque l'élément est entièrement visible
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef,next_page]);
  return (
    <>
      {error && <Error error={error} />}
      {isloading ? (
        <LoadingComponent />
      ) : (
        <ul className="wfx-list-collapse w-full h-full overflow-scroll">
          {logs.map((value, index) => {
            return <ListeLogFeature key={index} value={value.content} />;
          })}
          <div ref={observerRef}>
           {
            next_page && <LoadingComponent />
           } 
          </div>
        </ul>
      )}
    </>
  );
}
