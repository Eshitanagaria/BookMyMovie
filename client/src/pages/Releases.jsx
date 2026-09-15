import { useEffect, useState } from "react";
import { CalendarDaysIcon, StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "../components/BlurCircle";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";

const Releases = () => {
    const { axios, image_base_url } = useAppContext();

    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUpcomingMovies = async () => {
        try {
            const { data } = await axios.get("/api/show/upcoming");

            if (data.success) {
                setMovies(data.movies);
            }
        } catch (error) {
            console.error("Error fetching upcoming movies:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUpcomingMovies();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="relative min-h-screen pt-32 pb-40 px-6 md:px-16 lg:px-40 overflow-hidden">
            <BlurCircle top="120px" left="-100px" />
            <BlurCircle bottom="100px" right="-100px" />

            <h1 className="text-3xl md:text-4xl font-semibold">
                Upcoming <span className="text-primary">Releases</span>
            </h1>

            <p className="text-gray-400 mt-3 max-w-xl">
                Discover movies coming soon to the big screen. Browse upcoming releases
                and find your next movie night.
            </p>

            {movies.length === 0 ? (
                <div className="flex justify-center items-center min-h-[40vh]">
                    <p className="text-gray-400">
                        No upcoming releases available.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="bg-gray-800 rounded-2xl overflow-hidden hover:-translate-y-1 transition duration-300"
                        >
                            <div className="relative">
                                <img
                                    src={image_base_url + movie.poster_path}
                                    alt={movie.title}
                                    className="w-full h-80 object-cover"
                                />

                                <div className="absolute top-3 left-3 bg-primary px-3 py-1 rounded-full text-xs font-medium">
                                    Coming Soon
                                </div>
                            </div>

                            <div className="p-4">
                                <h2 className="font-semibold text-lg truncate">
                                    {movie.title}
                                </h2>

                                <div className="flex items-center justify-between mt-3 text-sm">
                                    <p className="flex items-center gap-1 text-gray-400">
                                        <CalendarDaysIcon className="w-4 h-4 text-primary" />
                                        {movie.release_date
                                            ? new Date(movie.release_date).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )
                                            : "Release date TBA"}
                                    </p>

                                    <p className="flex items-center gap-1">
                                        <StarIcon className="w-4 h-4 text-primary fill-primary" />
                                        {movie.vote_average?.toFixed(1) || "N/A"}
                                    </p>
                                </div>

                                <button
                                    onClick={() => {
                                        navigate(`/movies/${movie.id}`);
                                        scrollTo(0, 0);
                                    }}
                                    className="w-full mt-5 py-2.5 bg-primary hover:bg-primary-dull rounded-full text-sm font-medium transition cursor-pointer"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Releases;