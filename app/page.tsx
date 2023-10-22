import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";

export default async function Home({ searchParams }: { searchParams: any }) {
    const allCars = await fetchCars({
        manufacturer: searchParams.manufacturer || "",
        model: searchParams.model || "",
        year: searchParams.year || 2023,
        fuel: searchParams.fuel || "",
        limit: searchParams.limit || 10,
    });

    // const allCars = [
    //     {
    //         city_mpg: 15,
    //         class: "two seater",
    //         combination_mpg: 17,
    //         cylinders: 6,
    //         displacement: 3.6,
    //         drive: "rwd",
    //         fuel_type: "gas",
    //         highway_mpg: 22,
    //         make: "porsche",
    //         model: "911 carrera 4/2",
    //         transmission: "a",
    //         year: 1994,
    //     },
    //     {
    //         city_mpg: 15,
    //         class: "two seater",
    //         combination_mpg: 18,
    //         cylinders: 6,
    //         displacement: 3.6,
    //         drive: "rwd",
    //         fuel_type: "gas",
    //         highway_mpg: 23,
    //         make: "porsche",
    //         model: "911 carrera 4/2",
    //         transmission: "m",
    //         year: 1994,
    //     },
    //     {
    //         city_mpg: 14,
    //         class: "two seater",
    //         combination_mpg: 16,
    //         cylinders: 6,
    //         displacement: 3.6,
    //         drive: "awd",
    //         fuel_type: "gas",
    //         highway_mpg: 21,
    //         make: "porsche",
    //         model: "911 carrera 4/2",
    //         transmission: "m",
    //         year: 1994,
    //     },
    //     {
    //         city_mpg: 15,
    //         class: "minicompact car",
    //         combination_mpg: 17,
    //         cylinders: 6,
    //         displacement: 3.6,
    //         drive: "rwd",
    //         fuel_type: "gas",
    //         highway_mpg: 22,
    //         make: "porsche",
    //         model: "911 carrera 4/2",
    //         transmission: "a",
    //         year: 1994,
    //     },
    //     {
    //         city_mpg: 14,
    //         class: "minicompact car",
    //         combination_mpg: 16,
    //         cylinders: 6,
    //         displacement: 3.6,
    //         drive: "awd",
    //         fuel_type: "gas",
    //         highway_mpg: 21,
    //         make: "porsche",
    //         model: "911 carrera 4/2",
    //         transmission: "m",
    //         year: 1994,
    //     },
    // ];

    const isDataEmpty = !Array.isArray(allCars) || !allCars || !allCars.length;

    return (
        <main className="overflow-hidden">
            <Hero />

            <div className="mt-12 padding-x padding-y max-width" id="discover">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
                    <p>Explore the cars you might like</p>
                </div>
                <div className="home__filters">
                    <SearchBar />

                    <div className="home__filter-container">
                        <CustomFilter title="fuel" options={fuels} />
                        <CustomFilter
                            title="year"
                            options={yearsOfProduction}
                        />
                    </div>
                </div>

                {!isDataEmpty ? (
                    <section>
                        <div className="home__cars-wrapper">
                            {allCars.map((car) => (
                                <CarCard car={car} />
                            ))}
                        </div>
                        <ShowMore
                            pageNumber={(searchParams.limit || 10) / 10}
                            isNext={(searchParams.limit || 10) < allCars.length}
                        />
                    </section>
                ) : (
                    <div className="home__error-container">
                        <h2 className="text-black text-xl font-bold">
                            Oops, no results
                        </h2>
                        <p>Try adjusting your search filters</p>
                    </div>
                )}
            </div>
        </main>
    );
}
