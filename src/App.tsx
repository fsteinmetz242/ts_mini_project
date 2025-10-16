import "./App.css";
import { useEffect, useState } from "react";
import type { ArtworkType, ArtworkPageType } from "./types/types";
import type { ArtResponseType } from "./types/types";
import { getArtworkById, getPageOfArtwork } from "./utils/DataHandler";

function App() {
  const ArtWorkById = () => {
    const [dataArtWork, setArtWorkData] = useState<ArtworkType | undefined>();
    useEffect(() => {
      async function getData() {
        const ArtWorkData = await getArtworkById(3503); //129884
        const data = ArtWorkData?.data;
        setArtWorkData(data);
      }
      getData();
    }, []);

    return (
      <div>
        {/** Card */}

        <div className="card bg-base-100 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">{dataArtWork?.title}</h2>
            {dataArtWork?.description}
          </div>
          <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img
                className="w-96 h-96 object-cover"
                src={dataArtWork?.thumbnail?.lqip}
                alt=""
              />
            </figure>
          </div>
        </div>

        {/** Ende Card */}
      </div>
    );
  };

  const ArtworkByPage = () => {
    const [statePage, setPageState] = useState(1);
    const [dataPage, setArtWorkData] = useState<ArtworkPageType | undefined>();

    console.log("ArtworkByPage statePage: ", statePage);

    useEffect(() => {
      async function getPage() {
        const ArtWorkData = await getPageOfArtwork(statePage); //129884
        const data = ArtWorkData;
        setArtWorkData(data);
      }
      getPage();
    }, [statePage]);

    return (
      <div>
        <nav>
          <div className="flex gap-2">
            <h1>{statePage}</h1>
            <button
              className="border-4 rounded-2xl bg-cyan-100 border-blue-400 px-5 py-2"
              onClick={() => setPageState(() => 1)}
            >
              First
            </button>
            <button
              className="border-4 rounded-2xl bg-cyan-100 border-blue-400 px-5 py-2"
              onClick={() =>
                setPageState((prev) => (prev < 10000 ? prev + 1 : prev))
              }
            >
              &#x21D0;Next
            </button>
            <button
              className="border-4 rounded-2xl bg-cyan-100 border-blue-400 px-5 py-2"
              onClick={() => setPageState((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              Prev&#x21D2;
            </button>
            <button
              className="border-4 rounded-2xl bg-cyan-100 border-blue-400 px-5 py-2"
              onClick={() => setPageState(() => 10000)}
            >
              Last
            </button>
          </div>
        </nav>

        <main>
          <p className="text-center"> CurrentPage: {statePage}</p>
          <div className="grid grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1  place-items-center my-5 ">
            {dataPage?.data?.map((artwork) => (
              <div key={artwork.id} className="card bg-base-100 w-96 shadow-sm">
                <figure>
                  <img
                    src={
                      artwork.thumbnail?.lqip
                        ? artwork.thumbnail?.lqip
                        : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    }
                    alt={
                      artwork.thumbnail?.alt_text
                        ? artwork.thumbnail?.alt_text
                        : "future expansion"
                    }
                    className="border-2 border-blue-200 w-full aspect-video"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{artwork.title}</h2>
                  <span>
                    {artwork.artist_display ? artwork.artist_display : null}
                  </span>

                  <span>
                    {artwork.date_display ? artwork.date_display : null}
                  </span>

                  {artwork.description}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  };

  return (
    <>
      <div>
        <header>
          <h1>Gallery Explorer</h1>
        </header>

        {/**
         *         <ArtWorkById />
         */}
        <ArtworkByPage />
      </div>
    </>
  );
}

export default App;
